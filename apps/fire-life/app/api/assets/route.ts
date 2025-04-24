import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/app/lib/services/base-service';
import { assetService } from '@/app/lib/services/asset-service';

export async function GET() {
  try {
    // 获取当前会话
    const supabase = await getServerSupabaseClient();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: '未授权访问', message: '请先登录' },
        { status: 401 }
      );
    }

    // 获取用户资产
    const assets = await assetService.getUserAssets(session.user.id);
    
    return NextResponse.json(assets);
  } catch (error) {
    console.error('获取资产API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // 获取当前会话
    const supabase = await getServerSupabaseClient();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: '未授权访问', message: '请先登录' },
        { status: 401 }
      );
    }

    // 获取请求体
    const assetData = await request.json();
    
    // 添加用户ID
    assetData.user_id = session.user.id;
    
    // 创建资产
    const newAsset = await assetService.createAsset(assetData);
    
    if (!newAsset) {
      return NextResponse.json(
        { error: '创建资产失败' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(newAsset, { status: 201 });
  } catch (error) {
    console.error('创建资产API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
} 