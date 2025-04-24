'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Button } from '@workspace/ui/components/button';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { Alert, AlertDescription } from '@workspace/ui/components/alert';
import { supabase } from '../utils/supabase/client';
import { triggerAuthStateChange } from '../utils/events';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState(true);
    const [rememberMe, setRememberMe] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get('returnUrl') || '/dashboard';

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
        action: 'login' | 'signup'
    ) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setLoading(true);

        try {
            if (action === 'login') {
                // 使用客户端API进行登录
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) {
                    setError(error.message);
                    return;
                }

                // 登录成功，触发认证状态变化事件
                triggerAuthStateChange();
                
                // 使用客户端导航跳转到目标页面
                router.push(returnUrl);
                return;
            } else {
                // 注册流程
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (error) {
                    setError(error.message);
                    return;
                }

                setMessage('注册成功！请检查您的邮箱完成验证。验证后将自动登录。');
            }
        } catch (err) {
            console.error(`${action === 'login' ? '登录' : '注册'}失败:`, err);
            setError(
                err instanceof Error
                    ? err.message
                    : `${action === 'login' ? '登录' : '注册'}失败，请稍后重试`
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">
                        {isLogin ? '登录账户' : '注册新账户'}
                    </CardTitle>
                    <CardDescription>
                        {isLogin
                            ? '输入您的账户信息继续访问FIRE.Life平台'
                            : '创建一个新账户开始您的财务自由之旅'}
                    </CardDescription>
                </CardHeader>
                <form
                    onSubmit={(e) =>
                        handleSubmit(e, isLogin ? 'login' : 'signup')
                    }
                >
                    <CardContent className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {message && (
                            <Alert>
                                <AlertDescription>{message}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">电子邮箱</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">密码</Label>
                                {isLogin && (
                                    <Link
                                        href="/forgot-password"
                                        className="text-primary text-sm underline-offset-4 hover:underline"
                                    >
                                        忘记密码?
                                    </Link>
                                )}
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {isLogin && (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={rememberMe}
                                    onCheckedChange={(checked) =>
                                        setRememberMe(checked === true)
                                    }
                                />
                                <Label
                                    htmlFor="remember"
                                    className="text-sm font-normal"
                                >
                                    记住我的登录状态
                                </Label>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? isLogin
                                    ? '登录中...'
                                    : '注册中...'
                                : isLogin
                                  ? '登录'
                                  : '注册'}
                        </Button>
                        <div className="text-center text-sm">
                            {isLogin ? (
                                <>
                                    还没有账户?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setIsLogin(false)}
                                        className="text-primary underline-offset-4 hover:underline"
                                    >
                                        注册新账户
                                    </button>
                                </>
                            ) : (
                                <>
                                    已有账户?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setIsLogin(true)}
                                        className="text-primary underline-offset-4 hover:underline"
                                    >
                                        登录
                                    </button>
                                </>
                            )}
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
