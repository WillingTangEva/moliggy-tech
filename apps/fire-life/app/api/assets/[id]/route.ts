import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/app/lib/services/base-service';
import { assetService } from '@/app/lib/services/asset-service';

// 通用辅助函数：检查用户会话
async function checkSession() {
  const supabase = await getServerSupabaseClient();
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    return { error: '未授权访问', userId: null };
  }

  return { error: null, userId: session.user.id };
}

// 获取单个资产
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error, userId } = await checkSession();
    if (error) {
      return NextResponse.json({ error }, { status: 401 });
    }

    // 获取资产列表
    const assets = await assetService.getUserAssets(userId!);
    const asset = assets.find(a => a.id === params.id);

    if (!asset) {
      return NextResponse.json(
        { error: '资产不存在或无权访问' },
        { status: 404 }
      );
    }

    return NextResponse.json(asset);
  } catch (error) {
    console.error('获取资产详情API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

// 更新资产
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error, userId } = await checkSession();
    if (error) {
      return NextResponse.json({ error }, { status: 401 });
    }

    // 获取请求体
    const updateData = await request.json();
    
    // 确保资产属于当前用户
    const assets = await assetService.getUserAssets(userId!);
    const asset = assets.find(a => a.id === params.id);
    
    if (!asset) {
      return NextResponse.json(
        { error: '资产不存在或无权访问' },
        { status: 404 }
      );
    }
    
    // 执行更新
    const updatedAsset = await assetService.updateAsset(params.id, updateData);
    
    if (!updatedAsset) {
      return NextResponse.json(
        { error: '更新资产失败' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(updatedAsset);
  } catch (error) {
    console.error('更新资产API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

// 删除资产
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error, userId } = await checkSession();
    if (error) {
      return NextResponse.json({ error }, { status: 401 });
    }

    // 确保资产属于当前用户
    const assets = await assetService.getUserAssets(userId!);
    const asset = assets.find(a => a.id === params.id);
    
    if (!asset) {
      return NextResponse.json(
        { error: '资产不存在或无权访问' },
        { status: 404 }
      );
    }
    
    // 执行删除
    const success = await assetService.deleteAsset(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: '删除资产失败' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除资产API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
} 