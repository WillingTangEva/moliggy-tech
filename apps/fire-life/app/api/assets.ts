'use client';

import { Asset } from '../lib/types';
import { fetchAPI } from './fetch';

/**
 * 资产相关接口
 */
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
