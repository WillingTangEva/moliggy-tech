import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/app/lib/services/base-service';
import { planService } from '@/app/lib/services/plan-service';

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

    // 获取用户财务计划
    const plans = await planService.getUserPlans(session.user.id);
    
    return NextResponse.json(plans);
  } catch (error) {
    console.error('获取财务计划API错误:', error);
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
    const planData = await request.json();
    
    // 添加用户ID
    planData.user_id = session.user.id;
    
    // 创建财务计划
    const newPlan = await planService.createPlan(planData);
    
    if (!newPlan) {
      return NextResponse.json(
        { error: '创建财务计划失败' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(newPlan, { status: 201 });
  } catch (error) {
    console.error('创建财务计划API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
} 