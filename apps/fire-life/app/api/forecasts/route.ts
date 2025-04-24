import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../utils/supabase/server';
import { planAPI } from '../plans';
import { ForecastDetail, RetirementResult, FinancialPlan } from '../../lib/types';

// GET /api/forecasts - 获取用户的预测列表
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.log('用户未认证，返回示例预测数据');
      // 如果用户未登录，返回一些测试数据用于演示
      return NextResponse.json([
        {
          id: "test-forecast-1",
          user_id: "test-user-123",
          plan_id: "test-plan-1",
          retirement_age: 60,
          retirement_year: 2045,
          retirement_assets: 5000000,
          initial_assets: 300000,
          final_assets: 5000000,
          years_forecasted: 30,
          monthly_income: 20000,
          readiness_score: 80,
          created_at: new Date().toISOString()
        }
      ]);
    }

    // 查询用户的预测列表
    const { data, error } = await supabase
      .from('forecasts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('获取预测列表失败:', error);
      return NextResponse.json(
        { error: '获取预测列表失败' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('获取预测列表失败:', error);
    return NextResponse.json(
      { error: '获取预测列表失败' },
      { status: 500 }
    );
  }
}

// POST /api/forecasts - 创建新预测
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { planId, initialAssets } = await request.json();
    
    if (!planId) {
      return NextResponse.json(
        { error: '请提供计划ID' },
        { status: 400 }
      );
    }

    // 获取计划详情
    const plan = await planAPI.getPlan(planId);
    if (!plan) {
      return NextResponse.json(
        { error: '计划不存在' },
        { status: 404 }
      );
    }

    // 计算预测数据
    const forecastData = calculateForecast(plan, initialAssets || 0);
    
    // 保存预测记录
    const { data: forecastRecord, error: forecastError } = await supabase
      .from('forecasts')
      .insert({
        user_id: user.id,
        plan_id: planId,
        retirement_age: forecastData.actualRetirementAge,
        retirement_year: new Date().getFullYear() + (forecastData.actualRetirementAge - plan.current_age),
        retirement_assets: forecastData.retirementAssets,
        initial_assets: initialAssets || 0,
        final_assets: forecastData.retirementAssets,
        years_forecasted: plan.target_retirement_age - plan.current_age,
        monthly_income: forecastData.monthlyRetirementIncome,
        readiness_score: forecastData.readinessScore,
      })
      .select()
      .single();
    
    if (forecastError) {
      console.error('创建预测记录失败:', forecastError);
      return NextResponse.json(
        { error: '创建预测记录失败' },
        { status: 500 }
      );
    }
    
    // 保存预测详情
    const detailsToInsert = forecastData.yearlyDetails.map(detail => ({
      forecast_id: forecastRecord.id,
      year: detail.year,
      age: detail.age,
      income: detail.income,
      expenses: detail.expenses,
      savings: detail.savings,
      investment_return: detail.investment_return,
      total_assets: detail.total_assets
    }));
    
    const { error: detailsError } = await supabase
      .from('forecast_details')
      .insert(detailsToInsert);
      
    if (detailsError) {
      console.error('保存预测详情失败:', detailsError);
      // 不返回错误，因为主要预测记录已保存成功
    }
    
    return NextResponse.json({
      forecast: forecastRecord,
      details: forecastData.yearlyDetails
    });
  } catch (error) {
    console.error('创建预测失败:', error);
    return NextResponse.json(
      { error: '创建预测失败' },
      { status: 500 }
    );
  }
}

// POST /api/forecasts/calculate - 计算预测但不保存
export async function CALCULATE(request: NextRequest, { params }: { params: { calculate: string } }) {
  if (params.calculate !== 'calculate') return NextResponse.json({ error: 'Not found' }, { status: 404 });
  
  try {
    const { planId, initialAssets } = await request.json();
    
    if (!planId) {
      return NextResponse.json(
        { error: '请提供计划ID' },
        { status: 400 }
      );
    }

    // 获取计划详情
    const plan = await planAPI.getPlan(planId);
    if (!plan) {
      return NextResponse.json(
        { error: '计划不存在' },
        { status: 404 }
      );
    }

    // 计算预测数据但不保存
    const forecastData = calculateForecast(plan, initialAssets || 0);
    
    return NextResponse.json(forecastData);
  } catch (error) {
    console.error('计算预测失败:', error);
    return NextResponse.json(
      { error: '计算预测失败' },
      { status: 500 }
    );
  }
}

// 计算退休预测的函数
function calculateForecast(plan: FinancialPlan, initialAssets: number): RetirementResult {
  const currentAge = plan.current_age;
  const targetRetirementAge = plan.target_retirement_age;
  const years = Math.max(targetRetirementAge - currentAge, 0);
  const inflationRate = plan.inflation_rate;
  const returnRate = plan.expected_return_rate;
  
  // 计算年度详情
  const yearlyDetails: ForecastDetail[] = [];
  let totalAssets = initialAssets;
  let currentYear = new Date().getFullYear();
  let age = currentAge;
  
  // 年收入和年支出，根据通胀率逐年增加
  let yearlyIncome = plan.annual_income;
  let yearlyExpenses = plan.annual_expenses;
  
  // 计算每年的财务状况
  for (let i = 0; i <= years + 40; i++) {
    const isRetired = age >= targetRetirementAge;
    
    // 退休后使用退休收入和支出
    const income = isRetired ? plan.retirement_income : yearlyIncome;
    const expenses = isRetired ? plan.retirement_expenses : yearlyExpenses;
    
    // 计算当年储蓄
    const savings = income - expenses;
    
    // 投资回报
    const investmentReturn = totalAssets * returnRate;
    
    // 资产增长 = 储蓄 + 投资回报
    totalAssets += savings + investmentReturn;
    
    // 记录本年度详情
    yearlyDetails.push({
      id: `forecast-detail-${i}`,
      forecast_id: 'temp',
      year: currentYear,
      age,
      income,
      expenses,
      savings,
      investment_return: investmentReturn,
      total_assets: totalAssets
    });
    
    // 如果已退休且资产用完，记录财务耗尽的时间点
    if (isRetired && totalAssets <= 0) {
      break;
    }
    
    // 为下一年更新数据
    currentYear++;
    age++;
    
    // 根据通胀调整收入和支出
    yearlyIncome *= (1 + inflationRate);
    yearlyExpenses *= (1 + inflationRate);
  }
  
  // 计算实际财务独立(FIRE)年龄
  // FIRE条件: 当总资产 >= 25 * 年支出时，视为实现财务独立
  const fireMultiplier = 25;
  let actualRetirementAge = targetRetirementAge;
  
  for (const detail of yearlyDetails) {
    const annualExpenses = isNaN(detail.expenses) ? plan.annual_expenses : detail.expenses;
    if (detail.total_assets >= fireMultiplier * annualExpenses && detail.age < actualRetirementAge) {
      actualRetirementAge = detail.age;
      break;
    }
  }
  
  // 计算退休准备程度 (0-100%)
  const readinessScore = Math.min(100, Math.round((initialAssets / (25 * plan.annual_expenses)) * 100));
  
  // 计算月退休收入 (基于4%提取率)
  const monthlyRetirementIncome = (initialAssets * 0.04) / 12;
  
  return {
    targetRetirementAge,
    actualRetirementAge,
    retirementAssets: totalAssets,
    monthlyRetirementIncome,
    yearlyDetails,
    readinessScore
  };
} 