'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '../utils/supabase/server';

// 定义返回值类型
export type ActionResult = 
  | { error: string; message?: undefined }
  | { message: string; error?: undefined }
  | undefined;

export async function login(formData: FormData): Promise<ActionResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  if (!email || !password) {
    return {
      error: '请提供电子邮箱和密码'
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message
    };
  }

  if (!data?.session) {
    return {
      error: '登录成功但未创建会话'
    };
  }

  // 获取URL中的returnUrl参数
  const returnUrl = formData.get('returnUrl') as string || '/dashboard';
  
  redirect(returnUrl);
}

export async function signup(formData: FormData): Promise<ActionResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  if (!email || !password) {
    return {
      error: '请提供电子邮箱和密码'
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${formData.get('origin')}/auth/callback`,
    },
  });

  if (error) {
    return {
      error: error.message
    };
  }

  return {
    message: '请检查您的电子邮箱以完成注册'
  };
}

export async function logout() {
  const supabase = await createClient();
  
  await supabase.auth.signOut();
  
  redirect('/login');
} 