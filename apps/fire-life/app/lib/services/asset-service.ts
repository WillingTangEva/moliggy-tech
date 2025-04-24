'use server';

import { Asset, Tables, AssetType, Currency } from '../types';
import { createClient } from '../../utils/supabase/server';

export const assetService = {
    /**
     * 获取用户所有资产
     */
    async getUserAssets(userId: string): Promise<Asset[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from(Tables.Assets)
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching assets:', error);
            return [];
        }

        return data as Asset[];
    },

    /**
     * 按类型获取用户资产
     */
    async getUserAssetsByType(
        userId: string,
        type: AssetType
    ): Promise<Asset[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from(Tables.Assets)
            .select('*')
            .eq('user_id', userId)
            .eq('type', type)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching assets by type:', error);
            return [];
        }

        return data as Asset[];
    },

    /**
     * 创建新资产
     */
    async createAsset(
        asset: Omit<Asset, 'id' | 'created_at' | 'updated_at'>
    ): Promise<Asset | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from(Tables.Assets)
            .insert({
                ...asset,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating asset:', error);
            return null;
        }

        return data as Asset;
    },

    /**
     * 更新资产
     */
    async updateAsset(
        id: string,
        updates: Partial<Omit<Asset, 'id' | 'user_id' | 'created_at'>>
    ): Promise<Asset | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from(Tables.Assets)
            .update({
                ...updates,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating asset:', error);
            return null;
        }

        return data as Asset;
    },

    /**
     * 删除资产
     */
    async deleteAsset(id: string): Promise<boolean> {
        const supabase = await createClient();
        const { error } = await supabase
            .from(Tables.Assets)
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting asset:', error);
            return false;
        }

        return true;
    },

    /**
     * 获取用户资产总值
     */
    async getUserTotalAssetValue(
        userId: string,
        currency: Currency = 'CNY'
    ): Promise<number> {
        const assets = await this.getUserAssets(userId);

        // 这里简化处理，实际应用中需要添加汇率转换
        // 暂时假设所有货币单位相同
        return assets.reduce((total, asset) => total + asset.value, 0);
    },

    /**
     * 获取资产分布（按类型）
     */
    async getAssetDistribution(
        userId: string
    ): Promise<Record<AssetType, number>> {
        const assets = await this.getUserAssets(userId);

        const distribution: Record<AssetType, number> = {
            cash: 0,
            stock: 0,
            bond: 0,
            property: 0,
            insurance: 0,
            other: 0,
        };

        assets.forEach((asset) => {
            distribution[asset.type] += asset.value;
        });

        return distribution;
    },
};

// 服务器端操作
export const serverAssetService = {
    /**
     * 管理员获取所有用户资产（仅在服务器端使用）
     */
    async getAllAssets(): Promise<Asset[]> {
        // 管理员操作应该在受保护的API路由中实现
        // 这里使用普通的客户端，依赖于RLS策略进行权限控制
        const supabase = await createClient();
        
        const { data, error } = await supabase
            .from(Tables.Assets)
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching all assets:', error);
            return [];
        }

        return data as Asset[];
    },
};
