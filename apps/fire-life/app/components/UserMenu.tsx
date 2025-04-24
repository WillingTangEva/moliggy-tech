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
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import { User, Settings, LogOut } from 'lucide-react';
import { getCurrentUser, signOut } from '../api/user';
import { listenToAuthStateChange, triggerAuthStateChange } from '../utils/events';

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

    const loadUserData = async () => {
        console.log('加载用户数据...');
        setIsLoading(true);
        try {
            // 使用新的统一方法获取用户信息
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
        const cleanup = listenToAuthStateChange(() => {
            console.log('检测到认证状态变化，重新加载用户数据');
            loadUserData();
        });
        
        return cleanup;
    }, []);

    const handleLogout = async () => {
        try {
            await signOut();
            setUser(null); // 立即更新状态
            triggerAuthStateChange(); // 触发认证状态变化事件
            router.push('/');
        } catch (error) {
            console.error('退出登录失败:', error);
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
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
        );
    }

    // 如果没有用户，显示登录和注册按钮
    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                    <Link href="/login">登录</Link>
                </Button>
                <Button size="sm" asChild>
                    <Link href="/signup">注册</Link>
                </Button>
            </div>
        );
    }

    // 用户已登录，显示头像和下拉菜单
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="focus:ring-primary overflow-hidden rounded-full focus:outline-none focus:ring-2">
                    <Avatar>
                        <AvatarImage
                            src={user.avatar_url || ''}
                            alt={user.name || user.email}
                        />
                        <AvatarFallback>
                            {getInitials(user.name, user.email)}
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="font-medium">{user.name || '用户'}</p>
                        <p className="text-muted-foreground text-sm">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link
                        href="/profile"
                        className="flex cursor-pointer items-center"
                    >
                        <User className="mr-2 h-4 w-4" />
                        <span>个人信息</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link
                        href="/settings"
                        className="flex cursor-pointer items-center"
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>设置</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="flex cursor-pointer items-center text-red-600 focus:text-red-600"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>退出登录</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

