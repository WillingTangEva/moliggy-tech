import { NextRequest, NextResponse } from 'next/server';
import { getPlanById, updatePlan, deletePlan } from '../../../lib/services/plan-service';
import { createClient } from '../../../utils/supabase/server';

// GET /api/plans/:id - 获取单个财务计划
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // 确保params.id是有效的
    const id = context.params.id;
    if (!id) {
      return NextResponse.json(
        { error: '无效的计划ID' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const plan = await getPlanById(id);

    if (!plan) {
      return NextResponse.json(
        { error: '财务计划不存在' },
        { status: 404 }
      );
    }

    // 确保只能访问自己的财务计划
    if (plan.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error('获取财务计划详情失败:', error);
    return NextResponse.json(
      { error: '获取财务计划详情失败' },
      { status: 500 }
    );
  }
}

// PUT /api/plans/:id - 更新财务计划
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // 确保params.id是有效的
    const id = context.params.id;
    if (!id) {
      return NextResponse.json(
        { error: '无效的计划ID' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 验证计划存在并属于当前用户
    const existingPlan = await getPlanById(id);
    if (!existingPlan) {
      return NextResponse.json(
        { error: '财务计划不存在' },
        { status: 404 }
      );
    }

    if (existingPlan.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // 获取更新数据
    const updateData = await request.json();
    
    // 确保user_id是当前登录用户的ID
    updateData.user_id = user.id;
    
    const updatedPlan = await updatePlan(id, updateData);

    if (!updatedPlan) {
      return NextResponse.json(
        { error: '更新财务计划失败' },
        { status: 400 }
      );
    }

    return NextResponse.json(updatedPlan);
  } catch (error) {
    console.error('更新财务计划失败:', error);
    return NextResponse.json(
      { error: '更新财务计划失败: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

// DELETE /api/plans/:id - 删除财务计划
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // 确保params.id是有效的
    const id = context.params.id;
    if (!id) {
      return NextResponse.json(
        { error: '无效的计划ID' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 验证计划存在并属于当前用户
    const existingPlan = await getPlanById(id);
    if (!existingPlan) {
      return NextResponse.json(
        { error: '财务计划不存在' },
        { status: 404 }
      );
    }

    if (existingPlan.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const success = await deletePlan(id);

    if (!success) {
      return NextResponse.json(
        { error: '删除财务计划失败' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除财务计划失败:', error);
    return NextResponse.json(
      { error: '删除财务计划失败: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
} 