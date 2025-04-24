import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export function createClientSupabase() {
  return createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: true,
        storageKey: 'fire-life-auth',
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
      }
    }
  );
}

// 创建默认的客户端
export const supabase = createClientSupabase(); 