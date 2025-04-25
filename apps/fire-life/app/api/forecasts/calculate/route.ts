import { NextRequest, NextResponse } from 'next/server';
import { Tables } from '../../utils/types';
import { createClient } from '../../../utils/supabase/server';
import { calculateForecast } from '../../utils/calculations';

/**
 * 获取规划信息
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
 * 计算退休时间和财务自由
 */
async function calculateRetirement(userId: string, planId: string, currentAssets: number) {
  // 1. 获取规划数据
  const plan = await getPlanById(planId);
  if (!plan || plan.user_id !== userId) {
    throw new Error('计划未找到或不属于当前用户');
  }

  // 2. 执行计算
  const { forecast, details } = calculateForecast(plan, currentAssets);

  // 3. 计算退休准备度分数
  const targetAge = plan.target_retirement_age;
  const actualAge = forecast.retirement_age;
  const readinessScore = Math.min(100, Math.max(0, 100 - Math.max(0, actualAge - targetAge) * 5));

  return {
    targetRetirementAge: targetAge,
    actualRetirementAge: actualAge,
    retirementAssets: forecast.retirement_assets,
    monthlyRetirementIncome: forecast.monthly_income,
    yearlyDetails: details.map((d) => ({
      year: d.year,
      age: d.age,
      income: d.income,
      expenses: d.expenses,
      savings: d.savings,
      investment_return: d.investment_return,
      total_assets: d.total_assets,
    })),
    readinessScore,
  };
}

// POST /api/forecasts/calculate - 计算预测但不保存
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planId, initialAssets = 0 } = await request.json();

    if (!planId) {
      return NextResponse.json({ error: '请提供计划ID' }, { status: 400 });
    }

    // 计算但不保存预测结果
    const result = await calculateRetirement(user.id, planId, initialAssets);

    return NextResponse.json(result);
  } catch (error) {
    console.error('计算预测失败:', error);
    return NextResponse.json({ error: '计算预测失败' }, { status: 500 });
  }
}
