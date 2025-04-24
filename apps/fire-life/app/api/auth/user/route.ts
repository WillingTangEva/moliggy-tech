import { NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/app/lib/services/base-service';

export async function GET() {
  try {
    const supabase = await getServerSupabaseClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: '未授权访问', message: authError?.message || '用户未登录' },
        { status: 401 }
      );
    }

    // 获取用户ID
    const userId = authData.user.id;

    // 从profiles表获取更多用户信息
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('获取用户资料失败:', profileError);
      // 即使无法获取资料，我们至少返回基本的用户信息
      return NextResponse.json({
        user: {
          id: authData.user.id,
          email: authData.user.email,
          phone: authData.user.phone,
          created_at: authData.user.created_at,
          last_sign_in_at: authData.user.last_sign_in_at,
          app_metadata: authData.user.app_metadata,
          user_metadata: authData.user.user_metadata,
          identities: authData.user.identities,
        }
      });
    }

    // 合并用户认证信息和资料信息
    const userData = {
      id: authData.user.id,
      email: authData.user.email,
      phone: authData.user.phone,
      emailVerified: authData.user.email_confirmed_at ? true : false,
      lastSignInAt: authData.user.last_sign_in_at,
      createdAt: authData.user.created_at,
      // 资料信息
      profile: profileData || {},
    };

    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error('用户信息API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
} 