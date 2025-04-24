import { NextRequest, NextResponse } from 'next/server';
import { forecastService } from '../../../lib/services/forecast-service';
import { planService } from '../../../lib/services/plan-service';
import { createClient } from '../../../utils/supabase/server';

// POST /api/retirement/calculate - 计算退休结果（不保存）
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
    
    // 获取计划
    const plan = await planService.getPlanById(planId);
    
    if (!plan) {
      return NextResponse.json(
        { error: '计划不存在' },
        { status: 404 }
      );
    }
    
    // 确保只能访问自己的计划
    if (plan.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    // 计算退休结果
    const result = await forecastService.calculateRetirement(
      plan,
      currentAssets || 0
    );
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('计算退休结果失败:', error);
    return NextResponse.json(
      { error: '计算退休结果失败' },
      { status: 500 }
    );
  }
} 