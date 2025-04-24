import { NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/app/lib/services/base-service';

export async function GET() {
  try {
    const supabase = await getServerSupabaseClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return NextResponse.json(
        { error: '获取会话失败', message: error.message },
        { status: 401 }
      );
    }

    if (!data.session) {
      return NextResponse.json({ status: 'unauthenticated' }, { status: 401 });
    }

    // 返回会话数据
    return NextResponse.json({
      status: 'authenticated',
      userId: data.session.user.id,
      email: data.session.user.email,
      lastUpdated: Date.now(),
    });
  } catch (error) {
    console.error('会话API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
} 