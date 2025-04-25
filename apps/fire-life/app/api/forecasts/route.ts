import { NextRequest, NextResponse } from 'next/server';
import { Forecast, ForecastDetail, Tables } from '../utils/types';
import { createClient } from '../../utils/supabase/server';
import { calculateForecast } from '../utils/calculations';

/**
 * 获取用户所有预测结果
 */
async function getUserForecasts(userId: string): Promise<Forecast[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(Tables.Forecasts)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching forecasts:', error);
    return [];
  }

  return data as Forecast[];
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
 * 创建新预测
 */
async function createForecast(
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
 * 生成财务预测（基于规划和资产数据）
 */
async function generateForecast(userId: string, planId: string): Promise<Forecast | null> {
  // 1. 获取规划数据
  const plan = await getPlanById(planId);
  if (!plan || plan.user_id !== userId) {
    console.error('Plan not found or not owned by user');
    return null;
  }

  // 2. 获取用户资产
  const assets = await getUserAssets(userId);
  const totalAssets = assets.reduce((sum: number, asset: any) => sum + asset.value, 0);

  // 3. 执行计算
  const { forecast, details } = calculateForecast(plan, totalAssets);

  // 4. 存储结果
  return createForecast(
    {
      ...forecast,
      user_id: userId,
      plan_id: planId,
    },
    details
  );
}

/**
 * 获取预测及其详情
 */
async function getForecastDetails(forecastId: string): Promise<ForecastDetail[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(Tables.ForecastDetails)
    .select('*')
    .eq('forecast_id', forecastId)
    .order('year', { ascending: true });

  if (error) {
    console.error('Error fetching forecast details:', error);
    return [];
  }

  return data as ForecastDetail[];
}

/**
 * 获取预测完整信息（包括主记录和详情）
 */
async function getFullForecast(forecastId: string): Promise<{
  forecast: Forecast | null;
  details: ForecastDetail[];
}> {
  const supabase = await createClient();
  const { data, error } = await supabase.from(Tables.Forecasts).select('*').eq('id', forecastId).single();

  const forecast = error ? null : (data as Forecast);
  if (!forecast) {
    return { forecast: null, details: [] };
  }

  const details = await getForecastDetails(forecastId);
  return { forecast, details };
}

// GET /api/forecasts - 获取用户的预测列表
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log('用户未认证，返回示例预测数据');
      // 如果用户未登录，返回一些测试数据用于演示
      return NextResponse.json([
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
      ]);
    }

    // 获取用户的预测列表
    const forecasts = await getUserForecasts(user.id);
    return NextResponse.json(forecasts);
  } catch (error) {
    console.error('获取预测列表失败:', error);
    return NextResponse.json({ error: '获取预测列表失败' }, { status: 500 });
  }
}

// POST /api/forecasts - 创建新预测
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planId, initialAssets } = await request.json();

    if (!planId) {
      return NextResponse.json({ error: '请提供计划ID' }, { status: 400 });
    }

    // 获取计划详情并验证所有权
    const plan = await getPlanById(planId);
    if (!plan) {
      return NextResponse.json({ error: '计划不存在' }, { status: 404 });
    }

    if (plan.user_id !== user.id) {
      return NextResponse.json({ error: '无权访问此计划' }, { status: 403 });
    }

    // 生成预测
    const forecast = await generateForecast(user.id, planId);

    if (!forecast) {
      return NextResponse.json({ error: '创建预测失败' }, { status: 500 });
    }

    // 获取完整的预测信息（包含详情）
    const fullForecast = await getFullForecast(forecast.id);

    return NextResponse.json(fullForecast);
  } catch (error) {
    console.error('创建预测失败:', error);
    return NextResponse.json({ error: '创建预测失败' }, { status: 500 });
  }
}
