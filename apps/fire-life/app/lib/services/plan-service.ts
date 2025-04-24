import { supabase } from '../supabase';
import { FinancialPlan, Tables } from '../types';

export const planService = {
    /**
     * 获取用户所有财务规划
     */
    async getUserPlans(userId: string): Promise<FinancialPlan[]> {
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
    },

    /**
     * 获取单个财务规划详情
     */
    async getPlanById(planId: string): Promise<FinancialPlan | null> {
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
    },

    /**
     * 创建新财务规划
     */
    async createPlan(
        plan: Omit<FinancialPlan, 'id' | 'created_at' | 'updated_at'>
    ): Promise<FinancialPlan | null> {
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

        return data as FinancialPlan;
    },

    /**
     * 更新财务规划
     */
    async updatePlan(
        id: string,
        updates: Partial<Omit<FinancialPlan, 'id' | 'user_id' | 'created_at'>>
    ): Promise<FinancialPlan | null> {
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
    },

    /**
     * 删除财务规划
     */
    async deletePlan(id: string): Promise<boolean> {
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
    },

    /**
     * 获取用户最新的财务规划
     */
    async getLatestPlan(userId: string): Promise<FinancialPlan | null> {
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
    },
};
