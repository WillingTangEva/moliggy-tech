import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";

export default function LoginPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">登录账户</CardTitle>
          <CardDescription>
            输入您的账户信息继续访问FIRE.Life平台
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">电子邮箱</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
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
            <Input id="password" type="password" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm font-normal">
              记住我的登录状态
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full">登录</Button>
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
      </Card>
    </div>
  );
} 