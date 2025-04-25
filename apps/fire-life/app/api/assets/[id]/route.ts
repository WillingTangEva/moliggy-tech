import { NextRequest, NextResponse } from 'next/server';
import { Asset } from '../../utils/types';
import { createClient } from '../../../utils/supabase/server';

/**
 * 根据ID获取单个资产
 */
async function getAssetById(id: string): Promise<Asset | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('assets').select('*').eq('id', id).single();

  if (error) {
    console.error('Error fetching asset by ID:', error);
    return null;
  }

  return data as Asset;
}

/**
 * 更新资产
 */
async function updateAsset(id: string, asset: Partial<Asset>): Promise<Asset | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('assets')
    .update({
      ...asset,
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
}

/**
 * 删除资产
 */
async function deleteAsset(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { error } = await supabase.from('assets').delete().eq('id', id);

  if (error) {
    console.error('Error deleting asset:', error);
    return false;
  }

  return true;
}

// GET /api/assets/:id - 获取单个资产
export async function GET(request: Request, params: { params: Promise<{ id: string }> }) {
  try {
    // 确保id是有效的
    const { id } = await params.params;
    if (!id) {
      return NextResponse.json({ error: '无效的资产ID' }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 获取资产
    const asset = await getAssetById(id);

    if (!asset) {
      return NextResponse.json({ error: '资产不存在' }, { status: 404 });
    }

    // 确保用户只能访问自己的资产
    if (asset.user_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(asset);
  } catch (error) {
    console.error('获取资产详情失败:', error);
    return NextResponse.json({ error: '获取资产详情失败' }, { status: 500 });
  }
}

// PUT /api/assets/:id - 更新资产
export async function PUT(request: Request, params: { params: Promise<{ id: string }> }) {
  try {
    // 确保id是有效的
    const { id } = await params.params;
    if (!id) {
      return NextResponse.json({ error: '无效的资产ID' }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 检查资产是否属于当前用户
    const existingAsset = await getAssetById(id);
    if (!existingAsset) {
      return NextResponse.json({ error: '资产不存在' }, { status: 404 });
    }

    if (existingAsset.user_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updateData = await request.json();

    // 确保用户ID不被修改
    updateData.user_id = user.id;

    const updatedAsset = await updateAsset(id, updateData);

    if (!updatedAsset) {
      return NextResponse.json({ error: '更新资产失败' }, { status: 400 });
    }

    return NextResponse.json(updatedAsset);
  } catch (error) {
    console.error('更新资产失败:', error);
    return NextResponse.json({ error: '更新资产失败' }, { status: 500 });
  }
}

// DELETE /api/assets/:id - 删除资产
export async function DELETE(request: Request, params: { params: Promise<{ id: string }> }) {
  try {
    // 确保id是有效的
    const { id } = await params.params;
    if (!id) {
      return NextResponse.json({ error: '无效的资产ID' }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 检查资产是否属于当前用户
    const existingAsset = await getAssetById(id);
    if (!existingAsset) {
      return NextResponse.json({ error: '资产不存在' }, { status: 404 });
    }

    if (existingAsset.user_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const success = await deleteAsset(id);

    if (!success) {
      return NextResponse.json({ error: '删除资产失败' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除资产失败:', error);
    return NextResponse.json({ error: '删除资产失败' }, { status: 500 });
  }
}
