import { NextRequest, NextResponse } from 'next/server';
import { Asset, Tables, AssetType, AssetTypeValues, Currency } from '../utils/types';
import { createClient } from '../../utils/supabase/server';

/**
 * 获取用户所有资产
 */
async function getUserAssets(userId: string): Promise<Asset[]> {
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
}

/**
 * 按类型获取用户资产
 */
async function getUserAssetsByType(userId: string, type: AssetType): Promise<Asset[]> {
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
}

/**
 * 创建新资产
 */
async function createAsset(asset: Omit<Asset, 'id' | 'created_at' | 'updated_at'>): Promise<Asset | null> {
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
}

/**
 * 获取用户资产总值
 */
async function getUserTotalAssetValue(userId: string, currency: Currency = 'CNY'): Promise<number> {
  const assets = await getUserAssets(userId);

  // 这里简化处理，实际应用中需要添加汇率转换
  // 暂时假设所有货币单位相同
  return assets.reduce((total, asset) => total + asset.value, 0);
}

/**
 * 获取资产分布（按类型）
 */
async function getAssetDistribution(userId: string): Promise<Record<AssetType, number>> {
  const assets = await getUserAssets(userId);

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
}

// GET /api/assets - 获取用户资产列表
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 检查是否请求特定类型的资产
    const url = new URL(request.url);
    const type = url.searchParams.get('type') as AssetType | null;
    const distribution = url.searchParams.get('distribution');

    if (!user) {
      console.log('用户未认证，返回测试资产数据');
      // 如果用户未登录，返回一些测试数据用于演示
      return NextResponse.json([
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
      ]);
    }

    // 如果请求资产分布
    if (distribution === 'true') {
      const result = await getAssetDistribution(user.id);
      return NextResponse.json(result);
    }

    // 如果请求特定类型的资产
    if (type && AssetTypeValues.includes(type as AssetType)) {
      const assets = await getUserAssetsByType(user.id, type as AssetType);
      return NextResponse.json(assets);
    }

    // 否则返回所有资产
    const assets = await getUserAssets(user.id);
    return NextResponse.json(assets);
  } catch (error) {
    console.error('获取资产列表失败:', error);
    return NextResponse.json({ error: '获取资产列表失败' }, { status: 500 });
  }
}

// POST /api/assets - 创建新资产
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const assetData = await request.json();

    // 确保user_id是当前登录用户
    assetData.user_id = user.id;

    const newAsset = await createAsset(assetData);

    if (!newAsset) {
      return NextResponse.json({ error: '创建资产失败' }, { status: 400 });
    }

    return NextResponse.json(newAsset);
  } catch (error) {
    console.error('创建资产失败:', error);
    return NextResponse.json({ error: '创建资产失败' }, { status: 500 });
  }
}
