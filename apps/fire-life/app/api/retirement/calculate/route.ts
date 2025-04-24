import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/app/lib/services/base-service';
import { planService } from '@/app/lib/services/plan-service';
import { calculateForecast } from '@/app/lib/calculations';

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
    
    if (typeof currentAssets !== 'number' || currentAssets < 0) {
      return NextResponse.json(
        { error: '当前资产值必须是非负数' },
        { status: 400 }
      );
    }
    
    // 获取财务计划
    const plan = await planService.getPlanById(planId);
    
    if (!plan || plan.user_id !== session.user.id) {
      return NextResponse.json(
        { error: '财务计划不存在或无权访问' },
        { status: 404 }
      );
    }
    
    // 执行计算
    const { forecast, details } = calculateForecast(plan, currentAssets);
    
    // 计算是否达到退休目标的年数
    const yearsToRetirement = details.findIndex(d => 
      d.total_assets >= (plan.retirement_target_amount || 0)
    );
    
    const retirementAge = yearsToRetirement === -1 
      ? null 
      : plan.current_age + yearsToRetirement;
    
    return NextResponse.json({
      success: true,
      retirementAge,
      retirementYear: retirementAge 
        ? new Date().getFullYear() + yearsToRetirement
        : null,
      targetAmount: plan.retirement_target_amount || 0,
      yearsToRetirement: yearsToRetirement === -1 ? null : yearsToRetirement,
      currentAssets,
      forecastSummary: forecast,
      details: details.slice(0, 20) // 只返回前20年的详情
    });
    
  } catch (error) {
    console.error('退休计算API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
} 