import { createClient } from '@/app/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  
  // 登出用户
  await supabase.auth.signOut();
  
  // 获取重定向URL，默认到登录页面
  const requestUrl = new URL(request.url);
  const redirectTo = requestUrl.searchParams.get('redirectTo') ?? '/login';
  
  // 重定向到指定页面
  return NextResponse.redirect(new URL(redirectTo, request.url));
} 