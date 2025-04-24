'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 使用Supabase登录
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (!data.session) {
        throw new Error('登录成功但未创建会话');
      }

      console.log('登录成功，会话已创建');

      // 获取URL中的returnUrl参数
      const params = new URLSearchParams(window.location.search);
      const returnUrl = params.get('returnUrl');
      
      // 登录成功，跳转到之前的页面或默认仪表盘
      if (returnUrl) {
        router.push(decodeURIComponent(returnUrl));
      } else {
        router.push('/dashboard');
      }

      // 确保路由跳转后刷新页面，以应用新的会话
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (err) {
      console.error('登录失败:', err);
      setError(err instanceof Error ? err.message : '登录失败，请检查账号和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">登录账户</CardTitle>
          <CardDescription>
            输入您的账户信息继续访问FIRE.Life平台
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
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
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  忘记密码?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <Label htmlFor="remember" className="text-sm font-normal">
                记住我的登录状态
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? '登录中...' : '登录'}
            </Button>
            <div className="text-center text-sm">
              还没有账户?{" "}
              <Link 
                href="/signup" 
                className="text-primary underline-offset-4 hover:underline"
              >
                注册新账户
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 