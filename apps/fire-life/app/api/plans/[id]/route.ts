import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/app/lib/services/base-service';
import { planService } from '@/app/lib/services/plan-service';

// 通用辅助函数：检查用户会话
async function checkSession() {
  const supabase = await getServerSupabaseClient();
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    return { error: '未授权访问', userId: null };
  }

  return { error: null, userId: session.user.id };
}

// 获取单个财务计划
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error, userId } = await checkSession();
    if (error) {
      return NextResponse.json({ error }, { status: 401 });
    }

    // 获取财务计划
    const plan = await planService.getPlanById(params.id);

    if (!plan || plan.user_id !== userId) {
      return NextResponse.json(
        { error: '财务计划不存在或无权访问' },
        { status: 404 }
      );
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error('获取财务计划详情API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

// 更新财务计划
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error, userId } = await checkSession();
    if (error) {
      return NextResponse.json({ error }, { status: 401 });
    }

    // 获取请求体
    const updateData = await request.json();
    
    // 确保财务计划属于当前用户
    const plan = await planService.getPlanById(params.id);
    
    if (!plan || plan.user_id !== userId) {
      return NextResponse.json(
        { error: '财务计划不存在或无权访问' },
        { status: 404 }
      );
    }
    
    // 执行更新
    const updatedPlan = await planService.updatePlan(params.id, updateData);
    
    if (!updatedPlan) {
      return NextResponse.json(
        { error: '更新财务计划失败' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(updatedPlan);
  } catch (error) {
    console.error('更新财务计划API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

// 删除财务计划
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error, userId } = await checkSession();
    if (error) {
      return NextResponse.json({ error }, { status: 401 });
    }

    // 确保财务计划属于当前用户
    const plan = await planService.getPlanById(params.id);
    
    if (!plan || plan.user_id !== userId) {
      return NextResponse.json(
        { error: '财务计划不存在或无权访问' },
        { status: 404 }
      );
    }
    
    // 执行删除
    const success = await planService.deletePlan(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: '删除财务计划失败' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除财务计划API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
} 