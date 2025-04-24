import { NextRequest, NextResponse } from 'next/server';
import { forecastService } from '../../lib/services/forecast-service';
import { createClient } from '../../utils/supabase/server';

// GET /api/forecasts - 获取用户预测列表
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

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

    const { planId, currentAssets } = await request.json();
    
    if (!planId) {
      return NextResponse.json(
        { error: '缺少必要参数planId' },
        { status: 400 }
      );
    }
    
    const forecast = await forecastService.createForecast(
      user.id, 
      planId, 
      currentAssets || 0
    );
    
    if (!forecast) {
      return NextResponse.json(
        { error: '创建预测失败' },
        { status: 400 }
      );
    }
    
    // 获取预测详情
    const details = await forecastService.getForecastDetails(forecast.id);
    
    return NextResponse.json({
      forecast,
      details
    });
  } catch (error) {
    console.error('创建预测失败:', error);
    return NextResponse.json(
      { error: '创建预测失败' },
      { status: 500 }
    );
  }
} 