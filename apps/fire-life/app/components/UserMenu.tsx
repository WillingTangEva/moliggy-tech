'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

    useEffect(() => {
        async function getUser() {
            setIsLoading(true);
            try {
                // 使用新的统一方法获取用户信息
                const userData = await getCurrentUser();

                if (!userData) {
                    setUser(null);
                } else {
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
        }

        getUser();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut();
            router.push('/login');
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

    // 如果正在加载或没有用户，显示登录按钮
    if (isLoading) {
        return (
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
        );
    }

    if (!user) {
        return (
            <Button variant="outline" size="sm" asChild>
                <Link href="/login">登录</Link>
            </Button>
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
