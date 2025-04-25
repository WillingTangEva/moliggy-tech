import { createClient } from '@/app/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { Tables, GoalType, GoalStatus, GoalTypeValues, GoalStatusValues } from '../../utils/types';

// 获取单个目标
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = resolvedParams;
    const { data, error } = await supabase.from(Tables.Goals).select('*').eq('id', id).eq('user_id', user.id).single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error in GET /api/goals/[id]:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// 更新目标
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = resolvedParams;
    const body = await request.json();

    // 验证目标类型和状态（如果提供）
    if (body.type && !GoalTypeValues.includes(body.type as GoalType)) {
      return NextResponse.json({ error: 'Invalid goal type' }, { status: 400 });
    }

    if (body.status && !GoalStatusValues.includes(body.status as GoalStatus)) {
      return NextResponse.json({ error: 'Invalid goal status' }, { status: 400 });
    }

    // 确保用户有权限修改这个目标
    const { data: existingGoal, error: fetchError } = await supabase
      .from(Tables.Goals)
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingGoal) {
      return NextResponse.json({ error: 'Goal not found or unauthorized' }, { status: 404 });
    }

    const updates = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from(Tables.Goals).update(updates).eq('id', id).select().single();

    if (error) {
      console.error('Error updating goal:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error in PUT /api/goals/[id]:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// 删除目标
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = resolvedParams;

    // 确保用户有权限删除这个目标
    const { data: existingGoal, error: fetchError } = await supabase
      .from(Tables.Goals)
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingGoal) {
      return NextResponse.json({ error: 'Goal not found or unauthorized' }, { status: 404 });
    }

    const { error } = await supabase.from(Tables.Goals).delete().eq('id', id).eq('user_id', user.id);

    if (error) {
      console.error('Error deleting goal:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error in DELETE /api/goals/[id]:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
