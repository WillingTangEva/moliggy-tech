import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../utils/supabase/server';
import * as forecastService from '../../lib/services/forecast-service';
import { getPlanById } from '../../lib/services/plan-service';

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

    // 使用 forecastService 获取用户的预测列表
    const forecasts = await forecastService.getUserForecasts(user.id);
    return NextResponse.json(forecasts);
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

    // 获取计划详情并验证所有权
    const plan = await getPlanById(planId);
    if (!plan) {
      return NextResponse.json(
        { error: '计划不存在' },
        { status: 404 }
      );
    }
    
    if (plan.user_id !== user.id) {
      return NextResponse.json(
        { error: '无权访问此计划' },
        { status: 403 }
      );
    }

    // 使用 forecastService 生成预测
    const forecast = await forecastService.generateForecast(user.id, planId);
    
    if (!forecast) {
      return NextResponse.json(
        { error: '创建预测失败' },
        { status: 500 }
      );
    }
    
    // 获取完整的预测信息（包含详情）
    const fullForecast = await forecastService.getFullForecast(forecast.id);
    
    return NextResponse.json(fullForecast);
  } catch (error) {
    console.error('创建预测失败:', error);
    return NextResponse.json(
      { error: '创建预测失败' },
      { status: 500 }
    );
  }
} 