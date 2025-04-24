import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/app/lib/services/base-service';
import { forecastService } from '@/app/lib/services/forecast-service';

export async function GET() {
  try {
    // 获取当前会话
    const supabase = await getServerSupabaseClient();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: '未授权访问', message: '请先登录' },
        { status: 401 }
      );
    }

    // 获取用户预测
    const forecasts = await forecastService.getUserForecasts(session.user.id);
    
    return NextResponse.json(forecasts);
  } catch (error) {
    console.error('获取预测API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // 获取当前会话
    const supabase = await getServerSupabaseClient();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: '未授权访问', message: '请先登录' },
        { status: 401 }
      );
    }

    // 获取请求体
    const { planId, currentAssets } = await request.json();
    
    if (!planId) {
      return NextResponse.json(
        { error: '缺少必要参数: planId' },
        { status: 400 }
      );
    }
    
    // 生成预测
    const forecast = await forecastService.generateForecast(
      session.user.id,
      planId
    );
    
    if (!forecast) {
      return NextResponse.json(
        { error: '生成预测失败' },
        { status: 400 }
      );
    }
    
    // 获取预测详情
    const details = await forecastService.getForecastDetails(forecast.id);
    
    return NextResponse.json(
      { forecast, details },
      { status: 201 }
    );
  } catch (error) {
    console.error('创建预测API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
} 