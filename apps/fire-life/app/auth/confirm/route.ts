import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest } from 'next/server';
import { createServerSupabase } from '@/app/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/dashboard';
  
  if (token_hash && type) {
    const supabase = await createServerSupabase();
    
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    
    if (!error) {
      // 验证成功，重定向到指定页面或默认到仪表盘
      redirect(next);
    }
  }
  
  // 验证失败，重定向到错误页面
  redirect('/auth/error?message=验证链接无效或已过期');
} 