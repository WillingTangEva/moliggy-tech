import { createServerSupabase } from '@/app/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/dashboard';

  if (code) {
    const supabase = await createServerSupabase();
    
    // 处理OAuth登录回调
    await supabase.auth.exchangeCodeForSession(code);
  }

  // 重定向到指定的页面或默认到仪表盘
  return NextResponse.redirect(new URL(next, request.url));
} 