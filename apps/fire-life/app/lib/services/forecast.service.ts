import { db } from '@/lib/db';
import { tables } from '@/lib/db/schema';
import { calculateForecast } from '@/lib/calculations';
import { Forecast, ForecastDetail, FinancialPlan, RetirementResult } from '@/lib/types';
import { nanoid } from '@/lib/utils';

export async function createForecast(
  userId: string,
  planId: string,
  currentAssets: number
): Promise<{ forecast: Forecast; details: ForecastDetail[] }> {
  // 获取财务计划
  const plan = await db.query.financialPlans.findFirst({
    where: (plans, { eq, and }) => and(eq(plans.id, planId), eq(plans.user_id, userId)),
  });

  if (!plan) {
    throw new Error('找不到财务计划');
  }

  // 计算预测结果
  const { forecast: forecastData, details: detailsData } = calculateForecast(plan, currentAssets);

  // 创建预测记录
  const forecastId = nanoid();
  const now = new Date().toISOString();

  const forecast: Forecast = {
    id: forecastId,
    user_id: userId,
    plan_id: planId,
    created_at: now,
    ...forecastData,
  };

  // 保存预测和详情
  await db.insert(tables.forecasts).values(forecast);

  // 为每个年度预测创建唯一ID并关联到预测ID
  const details: ForecastDetail[] = detailsData.map(detail => ({
    id: nanoid(),
    forecast_id: forecastId,
    ...detail,
  }));

  if (details.length > 0) {
    await db.insert(tables.forecastDetails).values(details);
  }

  return { forecast, details };
}

export async function getForecastsByUser(userId: string): Promise<Forecast[]> {
  return db.query.forecasts.findMany({
    where: (forecasts, { eq }) => eq(forecasts.user_id, userId),
    orderBy: (forecasts, { desc }) => desc(forecasts.created_at),
  });
}

export async function getForecastById(
  forecastId: string,
  userId: string
): Promise<{ forecast: Forecast; details: ForecastDetail[] } | null> {
  const forecast = await db.query.forecasts.findFirst({
    where: (forecasts, { eq, and }) => and(eq(forecasts.id, forecastId), eq(forecasts.user_id, userId)),
  });

  if (!forecast) {
    return null;
  }

  const details = await db.query.forecastDetails.findMany({
    where: (details, { eq }) => eq(details.forecast_id, forecastId),
    orderBy: (details, { asc }) => asc(details.year),
  });

  return { forecast, details };
}

export async function getRetirementResult(
  userId: string,
  planId: string,
  currentAssets: number
): Promise<RetirementResult> {
  // 获取财务计划
  const plan = await db.query.financialPlans.findFirst({
    where: (plans, { eq, and }) => and(eq(plans.id, planId), eq(plans.user_id, userId)),
  });

  if (!plan) {
    throw new Error('找不到财务计划');
  }

  // 计算预测结果
  const { forecast, details } = calculateForecast(plan, currentAssets);

  // 转换为RetirementResult格式
  const result: RetirementResult = {
    targetRetirementAge: plan.target_retirement_age,
    actualRetirementAge: forecast.retirement_age,
    retirementAssets: forecast.retirement_assets,
    monthlyRetirementIncome: forecast.monthly_income,
    yearlyDetails: details.map(detail => ({
      id: nanoid(),
      forecast_id: '',  // 这个会在保存时设置
      ...detail
    })),
    readinessScore: forecast.readiness_score
  };

  return result;
} 