'use client';

import { FinancialPlan } from '../lib/types';
import { fetchAPI } from './fetch';

/**
 * 财务计划相关接口
 */
export const planAPI = {
  // 获取用户所有计划
  getPlans: () => fetchAPI<FinancialPlan[]>('/plans'),

  // 获取单个计划详情
  getPlan: (id: string) => fetchAPI<FinancialPlan>(`/plans/${id}`),

  // 创建新计划
  createPlan: (
    plan: Omit<FinancialPlan, 'id' | 'created_at' | 'updated_at'>
  ) =>
    fetchAPI<FinancialPlan>('/plans', {
      method: 'POST',
      body: JSON.stringify(plan),
    }),

  // 更新计划
  updatePlan: (
    id: string,
    updates: Partial<Omit<FinancialPlan, 'id' | 'user_id' | 'created_at'>>
  ) =>
    fetchAPI<FinancialPlan>(`/plans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  // 删除计划
  deletePlan: (id: string) =>
    fetchAPI<{ success: boolean }>(`/plans/${id}`, {
      method: 'DELETE',
    }),
}; 