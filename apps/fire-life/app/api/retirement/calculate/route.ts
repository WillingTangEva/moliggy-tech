import { NextRequest, NextResponse } from 'next/server';
import { Tables } from '../../utils/types';
import { createClient } from '../../../utils/supabase/server';
import { calculateForecast } from '../../utils/calculations';

/**
 * 获取单个财务规划详情
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

  // 分数计算：如果提前达到目标则100分，否则基于接近程度计算
  let readinessScore = 100;
  if (actualAge > targetAge) {
    // 每晚5年扣10分，最低0分
    readinessScore = Math.max(0, 100 - Math.floor((actualAge - targetAge) / 5) * 10);
  }

  // 4. 返回结果
  return {
    targetRetirementAge: plan.target_retirement_age,
    actualRetirementAge: forecast.retirement_age,
    retirementAssets: forecast.retirement_assets,
    monthlyRetirementIncome: plan.retirement_income / 12,
    yearlyDetails: details,
    readinessScore,
  };
}

// POST /api/retirement/calculate - 计算退休结果（不保存）
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planId, currentAssets } = await request.json();

    if (!planId) {
      return NextResponse.json({ error: '缺少必要参数planId' }, { status: 400 });
    }

    // 获取计划
    const plan = await getPlanById(planId);

    if (!plan) {
      return NextResponse.json({ error: '计划不存在' }, { status: 404 });
    }

    // 确保只能访问自己的计划
    if (plan.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 计算退休结果
    const result = await calculateRetirement(user.id, planId, currentAssets || 0);

    return NextResponse.json(result);
  } catch (error) {
    console.error('计算退休结果失败:', error);
    return NextResponse.json({ error: '计算退休结果失败' }, { status: 500 });
  }
}
