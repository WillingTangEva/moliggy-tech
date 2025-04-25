import { NextRequest, NextResponse } from 'next/server';
import { FinancialPlan, Tables } from '../../utils/types';
import { createClient } from '../../../utils/supabase/server';

/**
 * 获取单个财务规划详情
 */
async function getPlanById(planId: string): Promise<FinancialPlan | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from(Tables.FinancialPlans).select('*').eq('id', planId).single();

  if (error) {
    console.error('Error fetching plan:', error);
    return null;
  }

  return data as FinancialPlan;
}

/**
 * 更新财务规划
 */
async function updatePlan(
  id: string,
  updates: Partial<Omit<FinancialPlan, 'id' | 'user_id' | 'created_at'>>
): Promise<FinancialPlan | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(Tables.FinancialPlans)
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating plan:', error);
    return null;
  }

  return data as FinancialPlan;
}

/**
 * 删除财务规划
 */
async function deletePlan(id: string): Promise<boolean> {
  const supabase = await createClient();
  // 1. 删除相关的预测结果
  const deleteForecasts = await supabase.from(Tables.Forecasts).delete().eq('plan_id', id);

  if (deleteForecasts.error) {
    console.error('Error deleting related forecasts:', deleteForecasts.error);
  }

  // 2. 删除规划本身
  const { error } = await supabase.from(Tables.FinancialPlans).delete().eq('id', id);

  if (error) {
    console.error('Error deleting plan:', error);
    return false;
  }

  return true;
}

// GET /api/plans/:id - 获取单个财务计划
export async function GET(request: Request, params: { params: Promise<{ id: string }> }) {
  try {
    // 确保params.id是有效的
    const { id } = await params.params;
    if (!id) {
      return NextResponse.json({ error: '无效的计划ID' }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const plan = await getPlanById(id);

    if (!plan) {
      return NextResponse.json({ error: '财务计划不存在' }, { status: 404 });
    }

    // 确保只能访问自己的财务计划
    if (plan.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error('获取财务计划详情失败:', error);
    return NextResponse.json({ error: '获取财务计划详情失败' }, { status: 500 });
  }
}

// PUT /api/plans/:id - 更新财务计划
export async function PUT(request: Request, params: { params: Promise<{ id: string }> }) {
  try {
    // 确保params.id是有效的
    const { id } = await params.params;
    if (!id) {
      return NextResponse.json({ error: '无效的计划ID' }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 验证计划存在并属于当前用户
    const existingPlan = await getPlanById(id);
    if (!existingPlan) {
      return NextResponse.json({ error: '财务计划不存在' }, { status: 404 });
    }

    if (existingPlan.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 获取更新数据
    const updateData = await request.json();

    // 确保user_id是当前登录用户的ID
    updateData.user_id = user.id;

    const updatedPlan = await updatePlan(id, updateData);

    if (!updatedPlan) {
      return NextResponse.json({ error: '更新财务计划失败' }, { status: 400 });
    }

    return NextResponse.json(updatedPlan);
  } catch (error) {
    console.error('更新财务计划失败:', error);
    return NextResponse.json(
      {
        error: '更新财务计划失败: ' + (error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}

// DELETE /api/plans/:id - 删除财务计划
export async function DELETE(request: Request, params: { params: Promise<{ id: string }> }) {
  try {
    // 确保params.id是有效的
    const { id } = await params.params;
    if (!id) {
      return NextResponse.json({ error: '无效的计划ID' }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 验证计划存在并属于当前用户
    const existingPlan = await getPlanById(id);
    if (!existingPlan) {
      return NextResponse.json({ error: '财务计划不存在' }, { status: 404 });
    }

    if (existingPlan.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const success = await deletePlan(id);

    if (!success) {
      return NextResponse.json({ error: '删除财务计划失败' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除财务计划失败:', error);
    return NextResponse.json(
      {
        error: '删除财务计划失败: ' + (error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}
