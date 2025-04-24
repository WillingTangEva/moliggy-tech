import { createClient } from '@supabase/supabase-js';

// 注意: 这些值应该来自环境变量
// 在实际项目中，您需要创建.env.local文件并添加以下变量:
// NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// 判断是否在浏览器环境
const isBrowser = typeof window !== 'undefined';

// 创建Supabase客户端
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // 默认为true，但明确设置以确保会话持久化
    storageKey: 'fire-life-auth', // 自定义存储键名，避免与其他项目冲突
    storage: isBrowser ? window.localStorage : undefined,
    autoRefreshToken: true, // 自动刷新令牌
    detectSessionInUrl: true, // 检测URL中的会话信息，用于第三方OAuth
    flowType: 'pkce', // 使用PKCE流程增强安全性
  },
});

// 获取服务器端supabase客户端 - 仅在服务器端组件中导入
let getServerSupabase: () => typeof supabase;

// 使用动态导入，仅在服务器环境中加载
if (!isBrowser) {
  getServerSupabase = () => {
    // 这个代码只会在服务器端运行
    const { cookies } = require('next/headers');
    
    try {
      // 在服务器端，需要手动传递cookie
      const cookieStore = cookies();
      
      return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
        global: {
          headers: {
            cookie: cookieStore.toString(),
          },
        },
      });
    } catch (e) {
      console.error('创建服务器端supabase客户端失败:', e);
      return supabase;
    }
  };
} else {
  // 在客户端，返回标准客户端
  getServerSupabase = () => supabase;
}

// 导出服务器端Supabase客户端获取函数
export { getServerSupabase };

// 创建带有服务角色密钥的管理员客户端（仅在服务器端使用）
export const createAdminClient = () => {
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseServiceRoleKey) {
    console.warn('缺少SUPABASE_SERVICE_ROLE_KEY环境变量');
    return supabase;
  }
  
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

// 获取当前会话方法
export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('获取会话出错:', error.message);
      return null;
    }
    return data.session;
  } catch (error) {
    console.error('获取会话时发生异常:', error);
    return null;
  }
};

// 获取当前用户方法
export const getUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('获取用户出错:', error.message);
      return null;
    }
    return user;
  } catch (error) {
    console.error('获取用户时发生异常:', error);
    return null;
  }
};

// 刷新会话方法
export const refreshSession = async () => {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) {
      console.error('刷新会话出错:', error.message);
      return null;
    }
    return data.session;
  } catch (error) {
    console.error('刷新会话时发生异常:', error);
    return null;
  }
}; 