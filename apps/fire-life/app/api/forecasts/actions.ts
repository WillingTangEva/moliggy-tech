'use server';

import { createClient } from '@/app/utils/supabase/server';
import { Forecast, ForecastDetail, RetirementResult, Tables } from '../utils/types';
import { revalidatePath } from 'next/cache';
import { calculateForecast } from '../utils/calculations';

/**
 * 获取用户所有预测结果
 */
export async function getForecasts(): Promise<Forecast[]> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log('用户未认证，返回示例预测数据');
      // 如果用户未登录，返回一些测试数据用于演示
      return [
        {
          id: 'test-forecast-1',
          user_id: 'test-user-123',
          plan_id: 'test-plan-1',
          retirement_age: 60,
          retirement_year: 2045,
          retirement_assets: 5000000,
          initial_assets: 300000,
          final_assets: 5000000,
          years_forecasted: 30,
          monthly_income: 20000,
          readiness_score: 80,
          created_at: new Date().toISOString(),
        },
      ];
    }

    const { data, error } = await supabase
      .from(Tables.Forecasts)
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching forecasts:', error);
      return [];
    }

    return data as Forecast[];
  } catch (error) {
    console.error('获取预测列表失败:', error);
    return [];
  }
}

/**
 * 获取单个预测详情
 */
export async function getForecast(id: string): Promise<{ forecast: Forecast | null; details: ForecastDetail[] }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { forecast: null, details: [] };
    }

    // 获取预测主记录
    const { data, error } = await supabase
      .from(Tables.Forecasts)
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching forecast:', error);
      return { forecast: null, details: [] };
    }

    const forecast = data as Forecast;

    // 获取预测详情
    const { data: detailsData, error: detailsError } = await supabase
      .from(Tables.ForecastDetails)
      .select('*')
      .eq('forecast_id', id)
      .order('year', { ascending: true });

    if (detailsError) {
      console.error('Error fetching forecast details:', detailsError);
      return { forecast, details: [] };
    }

    return { forecast, details: detailsData as ForecastDetail[] };
  } catch (error) {
    console.error('获取预测详情失败:', error);
    return { forecast: null, details: [] };
  }
}

/**
 * 获取单个规划
 */
async function getPlanById(planId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from(Tables.FinancialPlans).select('*').eq('id', planId).single();

  if (error) {
    console.error('Error fetching plan:', error);
    return null;
  }

  return data;
}

/**
 * 获取用户资产
 */
async function getUserAssets(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(Tables.Assets)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching assets:', error);
    return [];
  }

  return data;
}

/**
 * 创建新预测记录
 */
async function saveForecast(
  forecast: Omit<Forecast, 'id' | 'created_at'>,
  details: Omit<ForecastDetail, 'id' | 'forecast_id'>[]
): Promise<Forecast | null> {
  const supabase = await createClient();

  // 1. 创建预测主记录
  const { data, error } = await supabase
    .from(Tables.Forecasts)
    .insert({
      ...forecast,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating forecast:', error);
    return null;
  }

  const createdForecast = data as Forecast;

  // 2. 创建预测详情记录
  const forecastDetails = details.map((detail) => ({
    ...detail,
    forecast_id: createdForecast.id,
  }));

  const { error: detailsError } = await supabase.from(Tables.ForecastDetails).insert(forecastDetails);

  if (detailsError) {
    console.error('Error creating forecast details:', detailsError);
    // 考虑回滚主记录
    await supabase.from(Tables.Forecasts).delete().eq('id', createdForecast.id);
    return null;
  }

  return createdForecast;
}

/**
 * 创建新预测
 */
export async function createForecast(
  planId: string,
  currentAssets: number
): Promise<{ forecast: Forecast | null; details: ForecastDetail[] }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { forecast: null, details: [] };
    }

    // 获取计划详情并验证所有权
    const plan = await getPlanById(planId);
    if (!plan) {
      console.error('计划不存在');
      return { forecast: null, details: [] };
    }

    if (plan.user_id !== user.id) {
      console.error('无权访问此计划');
      return { forecast: null, details: [] };
    }

    // 使用当前资产或获取用户资产总和
    let totalAssets = currentAssets;
    if (totalAssets <= 0) {
      const assets = await getUserAssets(user.id);
      totalAssets = assets.reduce((sum: number, asset: any) => sum + asset.value, 0);
    }

    // 执行计算
    const { forecast, details } = calculateForecast(plan, totalAssets);

    // 存储结果
    const createdForecast = await saveForecast(
      {
        ...forecast,
        user_id: user.id,
        plan_id: planId,
      },
      details
    );

    // 重新验证预测数据的页面
    revalidatePath('/dashboard');
    revalidatePath('/forecast');

    if (createdForecast) {
      revalidatePath(`/forecast/${createdForecast.id}`);
    }

    return {
      forecast: createdForecast,
      details: createdForecast ? details : [],
    };
  } catch (error) {
    console.error('创建预测失败:', error);
    return { forecast: null, details: [] };
  }
}

/**
 * 计算退休结果（不保存）
 */
export async function calculateRetirement(planId: string, currentAssets: number): Promise<RetirementResult | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    // 获取计划详情并验证所有权
    const plan = await getPlanById(planId);
    if (!plan) {
      console.error('计划不存在');
      return null;
    }

    if (plan.user_id !== user.id) {
      console.error('无权访问此计划');
      return null;
    }

    // 使用当前资产或获取用户资产总和
    let totalAssets = currentAssets;
    if (totalAssets <= 0) {
      const assets = await getUserAssets(user.id);
      totalAssets = assets.reduce((sum: number, asset: any) => sum + asset.value, 0);
    }

    // 执行计算
    const { forecast, details } = calculateForecast(plan, totalAssets);

    // 构建结果对象，但不保存到数据库
    const result: RetirementResult = {
      targetRetirementAge: plan.target_retirement_age,
      actualRetirementAge: forecast.retirement_age,
      retirementAssets: forecast.retirement_assets,
      monthlyRetirementIncome: forecast.monthly_income || 0,
      yearlyDetails: details,
      readinessScore: forecast.readiness_score || 0,
    };

    return result;
  } catch (error) {
    console.error('计算退休结果失败:', error);
    return null;
  }
}
