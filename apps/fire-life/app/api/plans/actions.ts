'use server';

import { createClient } from '@/app/utils/supabase/server';
import { FinancialPlan, Tables } from '../utils/types';
import { revalidatePath } from 'next/cache';

/**
 * 获取用户所有财务规划
 */
export async function getPlans(): Promise<FinancialPlan[]> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.log('用户未登录，返回测试计划数据');
      // 为未登录用户提供测试数据
      return [
        {
          id: 'test-plan-1',
          user_id: 'test-user-123',
          name: '标准退休计划',
          description: '基于标准退休方案的财务规划',
          current_age: 30,
          target_retirement_age: 55,
          annual_income: 240000,
          annual_expenses: 180000,
          retirement_income: 120000,
          retirement_expenses: 120000,
          expected_return_rate: 0.07,
          inflation_rate: 0.03,
          risk_tolerance: 6,
          created_at: new Date().toISOString(),
        },
      ];
    }

    const { data, error } = await supabase
      .from(Tables.FinancialPlans)
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching plans:', error);
      return [];
    }

    return data as FinancialPlan[];
  } catch (error) {
    console.error('获取财务计划列表失败:', error);
    return [];
  }
}

/**
 * 获取单个计划详情
 */
export async function getPlan(id: string): Promise<FinancialPlan | null> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const { data, error } = await supabase
      .from(Tables.FinancialPlans)
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching plan:', error);
      return null;
    }

    return data as FinancialPlan;
  } catch (error) {
    console.error('获取财务计划详情失败:', error);
    return null;
  }
}

/**
 * 创建新财务规划
 */
export async function createPlan(plan: Omit<FinancialPlan, 'id' | 'created_at' | 'updated_at'>): Promise<FinancialPlan | null> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // 如果用户未登录，为了演示使用测试用户ID
      plan.user_id = 'test-user-123';
    } else {
      // 确保user_id是当前登录用户
      plan.user_id = user.id;
    }

    // 确保所有必填字段都存在
    if (!plan.user_id) {
      console.error('缺少必填字段 user_id');
      return null;
    }

    if (typeof plan.current_age !== 'number') {
      console.error('current_age 不是有效的数字');
      return null;
    }

    if (typeof plan.target_retirement_age !== 'number') {
      console.error('target_retirement_age 不是有效的数字');
      return null;
    }

    if (typeof plan.annual_income !== 'number') {
      console.error('annual_income 不是有效的数字');
      return null;
    }

    if (typeof plan.annual_expenses !== 'number') {
      console.error('annual_expenses 不是有效的数字');
      return null;
    }

    const { data, error } = await supabase
      .from(Tables.FinancialPlans)
      .insert({
        ...plan,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating plan:', error);
      return null;
    }

    // 重新验证计划数据的页面
    revalidatePath('/dashboard');
    revalidatePath('/plan');

    return data as FinancialPlan;
  } catch (error) {
    console.error('创建财务计划失败:', error);
    return null;
  }
}

/**
 * 更新财务规划
 */
export async function updatePlan(id: string, updates: Partial<Omit<FinancialPlan, 'id' | 'user_id' | 'created_at'>>): Promise<FinancialPlan | null> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    // 确保只能修改自己的计划
    const { data: existingPlan, error: fetchError } = await supabase
      .from(Tables.FinancialPlans)
      .select()
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingPlan) {
      console.error('无法找到要更新的计划或无权访问:', fetchError);
      return null;
    }

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

    // 重新验证计划数据的页面
    revalidatePath('/dashboard');
    revalidatePath('/plan');
    revalidatePath(`/plan/${id}`);

    return data as FinancialPlan;
  } catch (error) {
    console.error('更新财务计划失败:', error);
    return null;
  }
}

/**
 * 删除财务规划
 */
export async function deletePlan(id: string): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    // 确保只能删除自己的计划
    const { data: existingPlan, error: fetchError } = await supabase
      .from(Tables.FinancialPlans)
      .select()
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingPlan) {
      console.error('无法找到要删除的计划或无权访问:', fetchError);
      return false;
    }

    const { error } = await supabase
      .from(Tables.FinancialPlans)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting plan:', error);
      return false;
    }

    // 重新验证计划数据的页面
    revalidatePath('/dashboard');
    revalidatePath('/plan');

    return true;
  } catch (error) {
    console.error('删除财务计划失败:', error);
    return false;
  }
} 