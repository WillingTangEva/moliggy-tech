import { NextRequest, NextResponse } from 'next/server';
import { assetService } from '../../lib/services/asset-service';
import { createClient } from '../../utils/supabase/server';

// GET /api/assets - 获取用户资产列表
export async function GET(request: NextRequest) {
  try {
    // 从请求或会话中获取用户ID
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const assets = await assetService.getUserAssets(user.id);
    return NextResponse.json(assets);
  } catch (error) {
    console.error('获取资产列表失败:', error);
    return NextResponse.json(
      { error: '获取资产列表失败' }, 
      { status: 500 }
    );
  }
}

// POST /api/assets - 创建新资产
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const assetData = await request.json();
    
    // 确保user_id是当前登录用户
    assetData.user_id = user.id;
    
    const newAsset = await assetService.createAsset(assetData);
    
    if (!newAsset) {
      return NextResponse.json(
        { error: '创建资产失败' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(newAsset);
  } catch (error) {
    console.error('创建资产失败:', error);
    return NextResponse.json(
      { error: '创建资产失败' },
      { status: 500 }
    );
  }
} 