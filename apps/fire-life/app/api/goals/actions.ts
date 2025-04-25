'use server';

import { createClient } from '@/app/utils/supabase/server';
import { Goal, Tables } from '../utils/types';
import { revalidatePath } from 'next/cache';

/**
 * 获取用户所有财务目标
 */
export async function getGoals(): Promise<Goal[]> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.log('用户未登录，返回测试目标数据');
      // 为未登录用户提供测试数据
      return [
        {
          id: 'test-goal-1',
          user_id: 'test-user-123',
          name: '紧急备用金',
          description: '建立6个月的生活费用作为紧急备用金',
          type: 'emergency',
          status: 'active',
          target_amount: 100000,
          current_amount: 30000,
          target_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
          priority: 8,
          currency: 'CNY',
          created_at: new Date().toISOString(),
        },
        {
          id: 'test-goal-2',
          user_id: 'test-user-123',
          name: '教育基金',
          description: '为孩子准备大学教育基金',
          type: 'education',
          status: 'active',
          target_amount: 500000,
          current_amount: 100000,
          target_date: new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString(),
          priority: 7,
          currency: 'CNY',
          created_at: new Date().toISOString(),
        },
      ];
    }

    const { data, error } = await supabase
      .from(Tables.Goals)
      .select('*')
      .eq('user_id', user.id)
      .order('priority', { ascending: false });

    if (error) {
      console.error('Error fetching goals:', error);
      return [];
    }

    return data as Goal[];
  } catch (error) {
    console.error('获取财务目标列表失败:', error);
    return [];
  }
}

/**
 * 获取计划相关的财务目标
 */
export async function getGoalsByPlanId(planId: string): Promise<Goal[]> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.log('用户未登录');
      return [];
    }

    const { data, error } = await supabase
      .from(Tables.Goals)
      .select('*')
      .eq('user_id', user.id)
      .eq('plan_id', planId)
      .order('priority', { ascending: false });

    if (error) {
      console.error('Error fetching goals by plan ID:', error);
      return [];
    }

    return data as Goal[];
  } catch (error) {
    console.error('获取计划相关财务目标失败:', error);
    return [];
  }
}

/**
 * 获取单个目标详情
 */
export async function getGoal(id: string): Promise<Goal | null> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const { data, error } = await supabase
      .from(Tables.Goals)
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching goal:', error);
      return null;
    }

    return data as Goal;
  } catch (error) {
    console.error('获取财务目标详情失败:', error);
    return null;
  }
}

/**
 * 创建新财务目标
 */
export async function createGoal(goal: Omit<Goal, 'id' | 'created_at' | 'updated_at'>): Promise<Goal | null> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // 如果用户未登录，为了演示使用测试用户ID
      goal.user_id = 'test-user-123';
    } else {
      // 确保user_id是当前登录用户
      goal.user_id = user.id;
    }

    // 确保所有必填字段都存在
    if (!goal.user_id) {
      console.error('缺少必填字段 user_id');
      return null;
    }

    if (typeof goal.target_amount !== 'number') {
      console.error('target_amount 不是有效的数字');
      return null;
    }

    if (typeof goal.current_amount !== 'number') {
      console.error('current_amount 不是有效的数字');
      return null;
    }

    if (typeof goal.priority !== 'number') {
      console.error('priority 不是有效的数字');
      return null;
    }

    const { data, error } = await supabase
      .from(Tables.Goals)
      .insert({
        ...goal,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating goal:', error);
      return null;
    }

    // 重新验证目标数据的页面
    revalidatePath('/dashboard');
    revalidatePath('/goals');
    if (goal.plan_id) {
      revalidatePath(`/plan/${goal.plan_id}`);
    }

    return data as Goal;
  } catch (error) {
    console.error('创建财务目标失败:', error);
    return null;
  }
}

/**
 * 更新财务目标
 */
export async function updateGoal(id: string, updates: Partial<Omit<Goal, 'id' | 'user_id' | 'created_at'>>): Promise<Goal | null> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    // 确保只能修改自己的目标
    const { data: existingGoal, error: fetchError } = await supabase
      .from(Tables.Goals)
      .select()
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingGoal) {
      console.error('无法找到要更新的目标或无权访问:', fetchError);
      return null;
    }

    const { data, error } = await supabase
      .from(Tables.Goals)
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating goal:', error);
      return null;
    }

    // 重新验证目标数据的页面
    revalidatePath('/dashboard');
    revalidatePath('/goals');
    if (existingGoal.plan_id) {
      revalidatePath(`/plan/${existingGoal.plan_id}`);
    }

    return data as Goal;
  } catch (error) {
    console.error('更新财务目标失败:', error);
    return null;
  }
}

/**
 * 删除财务目标
 */
export async function deleteGoal(id: string): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    // 确保只能删除自己的目标
    const { data: existingGoal, error: fetchError } = await supabase
      .from(Tables.Goals)
      .select('plan_id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError) {
      console.error('无法找到要删除的目标或无权访问:', fetchError);
      return false;
    }

    const { error } = await supabase
      .from(Tables.Goals)
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting goal:', error);
      return false;
    }

    // 重新验证目标数据的页面
    revalidatePath('/dashboard');
    revalidatePath('/goals');
    if (existingGoal && existingGoal.plan_id) {
      revalidatePath(`/plan/${existingGoal.plan_id}`);
    }

    return true;
  } catch (error) {
    console.error('删除财务目标失败:', error);
    return false;
  }
} 