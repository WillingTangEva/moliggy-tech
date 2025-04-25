import { createClient } from '@/app/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { Tables, Goal, GoalType, GoalStatus, GoalTypeValues, GoalStatusValues } from '../utils/types';

/**
 * 获取用户的所有目标
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 检查是否有planId查询参数
    const url = new URL(request.url);
    const planId = url.searchParams.get('planId');

    let query = supabase.from(Tables.Goals).select('*').eq('user_id', user.id);

    // 如果提供了planId，则按planId筛选
    if (planId) {
      query = query.eq('plan_id', planId);
    }

    const { data, error } = await query.order('priority', { ascending: false });

    if (error) {
      console.error('Error fetching goals:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/goals:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * 创建新目标
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // 基本验证
    if (!body.name || !body.type || !body.status || body.target_amount === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 验证目标类型和状态
    if (!GoalTypeValues.includes(body.type as GoalType)) {
      return NextResponse.json({ error: 'Invalid goal type' }, { status: 400 });
    }

    if (!GoalStatusValues.includes(body.status as GoalStatus)) {
      return NextResponse.json({ error: 'Invalid goal status' }, { status: 400 });
    }

    const newGoal: Omit<Goal, 'id' | 'created_at'> = {
      ...body,
      user_id: user.id,
      current_amount: body.current_amount || 0,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from(Tables.Goals).insert(newGoal).select().single();

    if (error) {
      console.error('Error creating goal:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/goals:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
