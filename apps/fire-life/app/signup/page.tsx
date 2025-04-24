import Link from 'next/link';
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

export default function SignupPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">创建账户</CardTitle>
          <CardDescription>
            填写以下信息注册FIRE.Life平台，开始您的退休规划之旅
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">姓</Label>
              <Input id="first-name" placeholder="张" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">名</Label>
              <Input id="last-name" placeholder="三" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">电子邮箱</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <Input id="password" type="password" />
            <p className="text-muted-foreground text-xs">
              密码至少包含8个字符，包括大小写字母、数字和特殊符号
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">确认密码</Label>
            <Input id="confirm-password" type="password" />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="terms" className="mt-1" />
            <Label
              htmlFor="terms"
              className="text-sm font-normal leading-tight"
            >
              我已阅读并同意FIRE.Life的
              <Link
                href="/terms"
                className="text-primary underline-offset-4 hover:underline"
              >
                服务条款
              </Link>
              和
              <Link
                href="/privacy"
                className="text-primary underline-offset-4 hover:underline"
              >
                隐私政策
              </Link>
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full">注册</Button>
          <div className="text-center text-sm">
            已有账户?{' '}
            <Link
              href="/login"
              className="text-primary underline-offset-4 hover:underline"
            >
              登录
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
