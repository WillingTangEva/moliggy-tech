import { FinancialPlan, Tables } from '../types';
import { createClient } from '../../utils/supabase/server';

/**
 * 获取用户所有财务规划
 */
export async function getUserPlans(userId: string): Promise<FinancialPlan[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from(Tables.FinancialPlans)
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching plans:', error);
        return [];
    }

    return data as FinancialPlan[];
}

/**
 * 获取单个财务规划详情
 */
export async function getPlanById(planId: string): Promise<FinancialPlan | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from(Tables.FinancialPlans)
        .select('*')
        .eq('id', planId)
        .single();

    if (error) {
        console.error('Error fetching plan:', error);
        return null;
    }

    return data as FinancialPlan;
}

/**
 * 创建新财务规划
 */
export async function createPlan(
    plan: Omit<FinancialPlan, 'id' | 'created_at' | 'updated_at'>
): Promise<FinancialPlan | null> {
    const supabase = await createClient();
    
    console.log('接收到计划数据:', plan);
    
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

    console.log('Plan created successfully:', data);
    return data as FinancialPlan;
}

/**
 * 更新财务规划
 */
export async function updatePlan(
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
export async function deletePlan(id: string): Promise<boolean> {
    const supabase = await createClient();
    // 1. 删除相关的预测结果
    const deleteForecasts = await supabase
        .from(Tables.Forecasts)
        .delete()
        .eq('plan_id', id);

    if (deleteForecasts.error) {
        console.error(
            'Error deleting related forecasts:',
            deleteForecasts.error
        );
    }

    // 2. 删除规划本身
    const { error } = await supabase
        .from(Tables.FinancialPlans)
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting plan:', error);
        return false;
    }

    return true;
}

/**
 * 获取用户最新的财务规划
 */
export async function getLatestPlan(userId: string): Promise<FinancialPlan | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from(Tables.FinancialPlans)
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error) {
        console.error('Error fetching latest plan:', error);
        return null;
    }

    return data as FinancialPlan;
}
