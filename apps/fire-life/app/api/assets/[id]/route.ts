import { NextRequest, NextResponse } from 'next/server';
import { assetService } from '../../../lib/services/asset-service';
import { createClient } from '../../../utils/supabase/server';

// GET /api/assets/:id - 获取单个资产
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 由于assetService没有提供获取单个资产的方法
    // 我们获取所有资产并筛选
    const assets = await assetService.getUserAssets(user.id);
    const asset = assets.find(a => a.id === params.id);

    if (!asset) {
      return NextResponse.json(
        { error: '资产不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json(asset);
  } catch (error) {
    console.error('获取资产详情失败:', error);
    return NextResponse.json(
      { error: '获取资产详情失败' },
      { status: 500 }
    );
  }
}

// PUT /api/assets/:id - 更新资产
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const updateData = await request.json();
    const updatedAsset = await assetService.updateAsset(params.id, updateData);

    if (!updatedAsset) {
      return NextResponse.json(
        { error: '更新资产失败' },
        { status: 400 }
      );
    }

    return NextResponse.json(updatedAsset);
  } catch (error) {
    console.error('更新资产失败:', error);
    return NextResponse.json(
      { error: '更新资产失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/assets/:id - 删除资产
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const success = await assetService.deleteAsset(params.id);

    if (!success) {
      return NextResponse.json(
        { error: '删除资产失败' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除资产失败:', error);
    return NextResponse.json(
      { error: '删除资产失败' },
      { status: 500 }
    );
  }
} 