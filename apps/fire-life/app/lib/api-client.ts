/**
 * API客户端工具
 * 用于处理与后端API的交互
 */

import {
    Asset,
    FinancialPlan,
    Forecast,
    ForecastDetail,
    RetirementResult,
} from './types';
import { redirect } from 'next/navigation';
import { supabase, getSession, refreshSession } from './supabase';

/**
 * 检查用户会话状态
 * @returns 返回用户ID或null
 */
export async function checkSession() {
    try {
        const session = await getSession();

        if (!session) {
            console.log('没有有效会话');
            return null;
        }

        return session.user.id;
    } catch (error) {
        console.error('检查会话时出错:', error);
        return null;
    }
}

/**
 * API请求客户端
 * @param endpoint API端点
 * @param options 请求选项
 * @returns 响应数据
 */
export async function fetchAPI<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    try {
        // 确保包含凭据
        options.credentials = 'include';

        // 添加必要的headers
        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json',
        };

        // 执行请求
        const response = await fetch(`/api/${endpoint}`, options);

        // 检查是否未授权
        if (response.status === 401) {
            console.log('请求未授权，检查会话状态');

            // 检查是否已登录但会话可能需要刷新
            const userId = await checkSession();

            if (userId) {
                // 用户已登录但会话可能需要刷新，尝试刷新会话
                const session = await refreshSession();

                if (session) {
                    console.log('会话已刷新，重试请求');
                    // 重试请求
                    return fetchAPI<T>(endpoint, options);
                }
            }

            // 重定向到登录页面，附带当前URL作为返回URL
            const currentUrl =
                typeof window !== 'undefined'
                    ? window.location.pathname + window.location.search
                    : '/';
            console.log(`用户未登录，重定向到登录页面，返回URL: ${currentUrl}`);

            if (typeof window !== 'undefined') {
                window.location.href = `/login?returnUrl=${encodeURIComponent(currentUrl)}`;
            }

            throw new Error(`未授权访问 (${response.status})`);
        }

        // 检查其他错误
        if (!response.ok) {
            throw new Error(
                `API请求失败: ${response.status} ${response.statusText}`
            );
        }

        return (await response.json()) as T;
    } catch (error) {
        console.error('API请求出错:', error);
        throw error;
    }
}

// 资产相关接口
export const assetAPI = {
    // 获取用户资产列表
    getAssets: () => fetchAPI<Asset[]>('/assets'),

    // 创建新资产
    createAsset: (asset: Omit<Asset, 'id' | 'created_at' | 'updated_at'>) =>
        fetchAPI<Asset>('/assets', {
            method: 'POST',
            body: JSON.stringify(asset),
        }),

    // 更新资产
    updateAsset: (
        id: string,
        updates: Partial<Omit<Asset, 'id' | 'user_id' | 'created_at'>>
    ) =>
        fetchAPI<Asset>(`/assets/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        }),

    // 删除资产
    deleteAsset: (id: string) =>
        fetchAPI<{ success: boolean }>(`/assets/${id}`, {
            method: 'DELETE',
        }),
};

// 财务计划相关接口
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

// 预测相关接口
export const forecastAPI = {
    // 获取用户所有预测
    getForecasts: () => fetchAPI<Forecast[]>('/forecasts'),

    // 获取单个预测详情
    getForecast: (id: string) =>
        fetchAPI<{ forecast: Forecast; details: ForecastDetail[] }>(
            `/forecasts/${id}`
        ),

    // 创建新预测
    createForecast: (planId: string, currentAssets: number) =>
        fetchAPI<{ forecast: Forecast; details: ForecastDetail[] }>(
            '/forecasts',
            {
                method: 'POST',
                body: JSON.stringify({ planId, currentAssets }),
            }
        ),

    // 计算退休结果（不保存）
    calculateRetirement: (planId: string, currentAssets: number) =>
        fetchAPI<RetirementResult>('/retirement/calculate', {
            method: 'POST',
            body: JSON.stringify({ planId, currentAssets }),
        }),
};
