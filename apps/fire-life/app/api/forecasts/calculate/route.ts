import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../utils/supabase/server';
import * as forecastService from '../../../lib/services/forecast-service';

// POST /api/forecasts/calculate - 计算预测但不保存
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
    
    const { planId, initialAssets = 0 } = await request.json();
    
    if (!planId) {
      return NextResponse.json(
        { error: '请提供计划ID' },
        { status: 400 }
      );
    }

    // 使用 forecastService 计算但不保存预测结果
    const result = await forecastService.calculateRetirement(
      user.id,
      planId,
      initialAssets
    );
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('计算预测失败:', error);
    return NextResponse.json(
      { error: '计算预测失败' },
      { status: 500 }
    );
  }
} 