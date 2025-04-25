import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../utils/supabase/server';

// GET /api/assets - 获取用户资产列表
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

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

    // 查询用户的资产列表
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('获取资产列表失败:', error);
      return NextResponse.json({ error: '获取资产列表失败' }, { status: 500 });
    }

    return NextResponse.json(data);
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

    const { data, error } = await supabase.from('assets').insert(assetData).select().single();

    if (error) {
      console.error('创建资产失败:', error);
      return NextResponse.json({ error: '创建资产失败' }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('创建资产失败:', error);
    return NextResponse.json({ error: '创建资产失败' }, { status: 500 });
  }
}
