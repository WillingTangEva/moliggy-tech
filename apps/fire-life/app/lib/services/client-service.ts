import { createClient } from '@supabase/supabase-js';

// 创建客户端Supabase客户端实例
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// 创建客户端使用的Supabase实例
export const clientSupabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'fire-life-auth',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  }
});

/**
 * 获取客户端会话
 * @returns 返回用户ID或null
 */
export async function getClientSession() {
  try {
    const { data, error } = await clientSupabase.auth.getSession();

    if (error || !data.session) {
      console.log('没有有效会话:', error?.message);
      return null;
    }

    return data.session.user.id;
  } catch (error) {
    console.error('检查会话时出错:', error);
    return null;
  }
}

/**
 * 刷新客户端会话
 * @returns 返回刷新后的会话或null
 */
export async function refreshClientSession() {
  try {
    const { data, error } = await clientSupabase.auth.refreshSession();
    
    if (error || !data.session) {
      console.log('刷新会话失败:', error?.message);
      return null;
    }
    
    return data.session;
  } catch (error) {
    console.error('刷新会话时出错:', error);
    return null;
  }
} 