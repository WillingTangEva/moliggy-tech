'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { User, Settings, LogOut, GemIcon } from 'lucide-react';
import { useAuth, triggerAuthStateChange, AUTH_STATE_CHANGE_EVENT } from '../api/utils/auth-context';
import { supabase } from '@/app/utils/supabase/client';

export type UserData = {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
};

export function UserMenu() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { refreshAuthState } = useAuth(); // 使用认证上下文

  /**
   * 获取当前用户信息
   * @returns 返回用户信息或null
   */
  const getCurrentUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        console.log('获取用户信息失败:', error?.message);
        return null;
      }

      // 处理用户数据
      const userData = {
        id: data.user.id,
        email: data.user.email || '未设置邮箱',
        name: data.user.user_metadata?.name,
        first_name: data.user.user_metadata?.first_name,
        last_name: data.user.user_metadata?.last_name,
        avatar_url: data.user.user_metadata?.avatar_url,
        bio: data.user.user_metadata?.bio || '',
        created_at: data.user.created_at,
      };

      return userData;
    } catch (error) {
      console.error('获取用户信息出错:', error);
      return null;
    }
  };

  const loadUserData = async () => {
    console.log('加载用户数据...');
    setIsLoading(true);
    try {
      // 使用内部方法获取用户信息
      const userData = await getCurrentUser();

      if (!userData) {
        console.log('未找到用户数据');
        setUser(null);
      } else {
        console.log('用户数据加载成功:', userData.email);
        // 构建用户数据
        const userInfo: UserData = {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          avatar_url: userData.avatar_url,
        };

        setUser(userInfo);
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    loadUserData();
  }, []);

  // 监听路由变化
  useEffect(() => {
    if (pathname !== '/login' && pathname !== '/signup') {
      loadUserData();
    }
  }, [pathname]);

  // 监听自定义的认证状态变化事件
  useEffect(() => {
    const handleAuthStateChange = () => {
      console.log('检测到认证状态变化，重新加载用户数据');
      loadUserData();
    };

    window.addEventListener(AUTH_STATE_CHANGE_EVENT, handleAuthStateChange);
    window.addEventListener('storage', (event) => {
      if (event.key === 'auth_state_updated') {
        handleAuthStateChange();
      }
    });

    return () => {
      window.removeEventListener(AUTH_STATE_CHANGE_EVENT, handleAuthStateChange);
      window.removeEventListener('storage', (event) => {
        if (event.key === 'auth_state_updated') {
          handleAuthStateChange();
        }
      });
    };
  }, []);

  /**
   * 用户退出登录
   */
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('退出登录失败:', error.message);
        return;
      }

      setUser(null); // 立即更新状态
      triggerAuthStateChange(); // 触发认证状态变化事件
      router.push('/');
    } catch (error) {
      console.error('退出登录时出错:', error);
    }
  };

  // 生成用户名的首字母作为头像
  const getInitials = (name?: string, email?: string): string => {
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // 如果正在加载，显示加载状态
  if (isLoading) {
    return (
      <div className="relative h-10 w-10 overflow-hidden rounded-full">
        <div className="bg-primary/30 absolute inset-0 animate-pulse"></div>
      </div>
    );
  }

  // 如果没有用户，显示登录和注册按钮
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="text-foreground/70 hover:text-foreground hover:bg-accent/30 transition-colors duration-200"
          asChild
        >
          <Link href="/login">登录</Link>
        </Button>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all duration-300 hover:shadow"
          asChild
        >
          <Link href="/signup">免费注册</Link>
        </Button>
      </div>
    );
  }

  // 用户已登录，显示头像和下拉菜单
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:ring-ring overflow-hidden rounded-full transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2">
          <Avatar className="border-primary/20 h-10 w-10 border-2">
            <AvatarImage src={user.avatar_url || ''} alt={user.name || user.email} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(user.name, user.email)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-primary/10 w-64 rounded-xl p-2 shadow-lg">
        <DropdownMenuLabel className="p-4">
          <div className="flex flex-col space-y-1">
            <p className="text-lg font-medium">{user.name || '用户'}</p>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary/10" />
        <div className="p-2">
          <DropdownMenuItem asChild className="hover:bg-accent/70 cursor-pointer rounded-lg py-2 transition-colors">
            <Link href="/profile" className="flex items-center">
              <User className="text-primary mr-3 h-4 w-4" />
              <span>个人信息</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-accent/70 cursor-pointer rounded-lg py-2 transition-colors">
            <Link href="/settings" className="flex items-center">
              <Settings className="text-primary mr-3 h-4 w-4" />
              <span>设置</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-primary/10 cursor-pointer rounded-lg py-2 transition-colors">
            <Link href="/subscription" className="flex items-center">
              <GemIcon className="text-primary mr-3 h-4 w-4" />
              <span>升级会员</span>
            </Link>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator className="bg-primary/10" />
        <div className="p-2">
          <DropdownMenuItem
            className="flex cursor-pointer items-center rounded-lg py-2 text-red-500 transition-colors hover:bg-red-500/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span>退出登录</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
