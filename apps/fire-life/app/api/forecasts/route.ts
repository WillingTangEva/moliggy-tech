import { createForecast, getForecastsByUser } from '@/lib/services/forecast.service';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const body = await request.json();
    const { planId, currentAssets } = body;

    if (!planId) {
      return NextResponse.json({ error: '缺少必要参数: planId' }, { status: 400 });
    }

    if (currentAssets === undefined || typeof currentAssets !== 'number') {
      return NextResponse.json({ error: '缺少必要参数: currentAssets 或格式不正确' }, { status: 400 });
    }

    const result = await createForecast(userId, planId, currentAssets);
    return NextResponse.json(result);
  } catch (error) {
    console.error('创建预测失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '创建预测失败' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const forecasts = await getForecastsByUser(userId);
    return NextResponse.json(forecasts);
  } catch (error) {
    console.error('获取预测失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '获取预测失败' },
      { status: 500 }
    );
  }
} 