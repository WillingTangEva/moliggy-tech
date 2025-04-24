import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export async function updateSession(request: NextRequest) {
  try {
    // 从请求中重新创建响应，以保留原始URL
    const response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
      },
    });

    // 刷新会话 - 这会检查cookie中的会话是否有效，如果有效则刷新
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      // 将会话信息设置到响应头中，以便传递给浏览器
      response.cookies.set('supabase-auth-token', JSON.stringify(session), {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: session.expires_in,
      });
    }

    return response;
  } catch (e) {
    console.error('中间件更新会话失败:', e);
    // 错误时，允许请求继续，但不更新会话
    return NextResponse.next();
  }
} 