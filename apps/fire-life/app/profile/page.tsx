import { redirect } from 'next/navigation';
import { createClient } from '../utils/supabase/server';
import { Button } from '@workspace/ui/components/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@workspace/ui/components/card';
import Link from 'next/link';

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect('/login?returnUrl=/profile');
    }

    const user = data.user;

    return (
        <div className="container mx-auto px-4 py-10">
            <Card className="mx-auto max-w-lg">
                <CardHeader>
                    <CardTitle>个人资料</CardTitle>
                    <CardDescription>查看您的账户信息</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="text-muted-foreground text-sm font-medium">
                            电子邮箱
                        </h3>
                        <p className="text-lg">{user.email}</p>
                    </div>

                    <div>
                        <h3 className="text-muted-foreground text-sm font-medium">
                            账户ID
                        </h3>
                        <p className="font-mono text-lg text-xs">{user.id}</p>
                    </div>

                    <div>
                        <h3 className="text-muted-foreground text-sm font-medium">
                            电子邮箱验证状态
                        </h3>
                        <p className="text-lg">
                            {user.email_confirmed_at ? '已验证' : '未验证'}
                        </p>
                    </div>

                    {user.app_metadata && (
                        <div>
                            <h3 className="text-muted-foreground text-sm font-medium">
                                提供商
                            </h3>
                            <p className="text-lg capitalize">
                                {user.app_metadata.provider || '邮箱密码'}
                            </p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                        <Link href="/dashboard">返回仪表盘</Link>
                    </Button>
                    <Button variant="destructive" asChild>
                        <Link href="/auth/logout">登出</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
