import { NextRequest, NextResponse } from 'next/server';
import { planService } from '../../../lib/services/plan-service';
import { createClient } from '../../../utils/supabase/server';

// GET /api/plans/:id - 获取单个财务计划
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const plan = await planService.getPlanById(params.id);

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
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 验证计划存在并属于当前用户
    const existingPlan = await planService.getPlanById(params.id);
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

    const updateData = await request.json();
    const updatedPlan = await planService.updatePlan(params.id, updateData);

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
      { error: '更新财务计划失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/plans/:id - 删除财务计划
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 验证计划存在并属于当前用户
    const existingPlan = await planService.getPlanById(params.id);
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

    const success = await planService.deletePlan(params.id);

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
      { error: '删除财务计划失败' },
      { status: 500 }
    );
  }
} 