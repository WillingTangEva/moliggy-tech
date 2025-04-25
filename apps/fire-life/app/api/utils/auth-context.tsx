'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@/app/utils/supabase/client';

// 自定义事件名称常量
export const AUTH_STATE_CHANGE_EVENT = 'auth-state-change';

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuthState: () => Promise<void>;
  triggerAuthStateChange: () => void;
}

/**
 * 触发用户认证状态变化的事件
 * 可以在登录成功、注销或会话恢复时调用
 */
export function triggerAuthStateChange() {
  if (typeof window !== 'undefined') {
    // 创建自定义事件
    const event = new CustomEvent(AUTH_STATE_CHANGE_EVENT);
    window.dispatchEvent(event);

    // 同时存储一个值到localStorage，以便在不同标签页间同步
    localStorage.setItem('auth_state_updated', Date.now().toString());
  }
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 认证提供者组件
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  // 刷新认证状态
  const refreshAuthState = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        throw error;
      }

      if (user) {
        setUser({
          id: user.id,
          email: user.email || '',
        });
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('认证状态刷新失败:', err);
      setError(err instanceof Error ? err : new Error('认证状态刷新失败'));
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 登录方法
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      await refreshAuthState();
      triggerAuthStateChange(); // 登录成功后触发认证状态变化事件
    } catch (err) {
      console.error('登录失败:', err);
      setError(err instanceof Error ? err : new Error('登录失败'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 注销方法
  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setUser(null);
      triggerAuthStateChange(); // 注销成功后触发认证状态变化事件
    } catch (err) {
      console.error('注销失败:', err);
      setError(err instanceof Error ? err : new Error('注销失败'));
    } finally {
      setIsLoading(false);
    }
  };

  // 初始加载和监听Supabase认证变化
  useEffect(() => {
    refreshAuthState();

    // 设置认证状态变化监听
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
        });
      } else {
        setUser(null);
      }
      triggerAuthStateChange(); // Supabase认证状态变化时触发自定义事件
    });

    // 监听自定义事件和localStorage变化，实现跨标签页同步
    const handleAuthStateChange = () => {
      refreshAuthState();
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'auth_state_updated') {
        refreshAuthState();
      }
    };

    window.addEventListener(AUTH_STATE_CHANGE_EVENT, handleAuthStateChange);
    window.addEventListener('storage', handleStorageChange);

    // 清理函数
    return () => {
      subscription.unsubscribe();
      window.removeEventListener(AUTH_STATE_CHANGE_EVENT, handleAuthStateChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        refreshAuthState,
        triggerAuthStateChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 自定义Hook，用于在组件中访问认证上下文
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth必须在AuthProvider内部使用');
  }
  return context;
}
