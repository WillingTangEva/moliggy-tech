import { createClient } from '@supabase/supabase-js';

// 注意: 这些值应该来自环境变量
// 在实际项目中，您需要创建.env.local文件并添加以下变量:
// NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// 创建Supabase客户端
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // 默认为true，但明确设置以确保会话持久化
    storageKey: 'fire-life-auth', // 自定义存储键名，避免与其他项目冲突
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    autoRefreshToken: true, // 自动刷新令牌
    detectSessionInUrl: true, // 检测URL中的会话信息，用于第三方OAuth
  },
});

// 创建带有服务角色密钥的管理员客户端（仅在服务器端使用）
export const createAdminClient = () => {
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseServiceRoleKey) {
    console.warn('Missing SUPABASE_SERVICE_ROLE_KEY');
    return supabase;
  }
  
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

// 获取当前会话相关方法
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session:', error.message);
    return null;
  }
  return data.session;
};

export const getUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting user:', error.message);
    return null;
  }
  return user;
}; 