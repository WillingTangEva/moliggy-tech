'use server';

import { createClient } from '@/app/utils/supabase/server';
import { Asset, AssetType, Tables } from '../utils/types';
import { revalidatePath } from 'next/cache';

/**
 * 获取用户所有资产
 */
export async function getAssets(): Promise<Asset[]> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.log('用户未认证，返回测试资产数据');
      // 如果用户未登录，返回一些测试数据用于演示
      return [
        {
          id: 'test-asset-1',
          user_id: 'test-user-123',
          name: '银行存款',
          type: 'cash',
          value: 100000,
          currency: 'CNY',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 'test-asset-2',
          user_id: 'test-user-123',
          name: '股票投资',
          type: 'stock',
          value: 200000,
          currency: 'CNY',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 'test-asset-3',
          user_id: 'test-user-123',
          name: '房产',
          type: 'property',
          value: 2000000,
          currency: 'CNY',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
    }

    const { data, error } = await supabase
      .from(Tables.Assets)
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching assets:', error);
      return [];
    }

    return data as Asset[];
  } catch (error) {
    console.error('获取资产列表失败:', error);
    return [];
  }
}

/**
 * 按类型获取用户资产
 */
export async function getAssetsByType(type: AssetType): Promise<Asset[]> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from(Tables.Assets)
      .select('*')
      .eq('user_id', user.id)
      .eq('type', type)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching assets by type:', error);
      return [];
    }

    return data as Asset[];
  } catch (error) {
    console.error('获取资产列表失败:', error);
    return [];
  }
}

/**
 * 获取资产分布（按类型）
 */
export async function getAssetDistribution(): Promise<Record<AssetType, number>> {
  try {
    const assets = await getAssets();

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
  } catch (error) {
    console.error('获取资产分布失败:', error);
    return {
      cash: 0,
      stock: 0,
      bond: 0,
      property: 0,
      insurance: 0,
      other: 0,
    };
  }
}

/**
 * 创建新资产
 */
export async function createAsset(asset: Omit<Asset, 'id' | 'created_at' | 'updated_at'>): Promise<Asset | null> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    // 确保user_id是当前登录用户
    asset.user_id = user.id;

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

    // 重新验证资产数据的页面
    revalidatePath('/dashboard');
    revalidatePath('/assets');

    return data as Asset;
  } catch (error) {
    console.error('创建资产失败:', error);
    return null;
  }
}

/**
 * 更新资产
 */
export async function updateAsset(id: string, updates: Partial<Omit<Asset, 'id' | 'user_id' | 'created_at'>>): Promise<Asset | null> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    // 确保只能修改自己的资产
    const { data: existingAsset, error: fetchError } = await supabase
      .from(Tables.Assets)
      .select()
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingAsset) {
      console.error('无法找到要更新的资产或无权访问:', fetchError);
      return null;
    }

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

    // 重新验证资产数据的页面
    revalidatePath('/dashboard');
    revalidatePath('/assets');

    return data as Asset;
  } catch (error) {
    console.error('更新资产失败:', error);
    return null;
  }
}

/**
 * 删除资产
 */
export async function deleteAsset(id: string): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    // 确保只能删除自己的资产
    const { data: existingAsset, error: fetchError } = await supabase
      .from(Tables.Assets)
      .select()
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingAsset) {
      console.error('无法找到要删除的资产或无权访问:', fetchError);
      return false;
    }

    const { error } = await supabase
      .from(Tables.Assets)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting asset:', error);
      return false;
    }

    // 重新验证资产数据的页面
    revalidatePath('/dashboard');
    revalidatePath('/assets');

    return true;
  } catch (error) {
    console.error('删除资产失败:', error);
    return false;
  }
} 