import { redirect } from 'next/navigation';
import { createClient } from '../utils/supabase/server';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@workspace/ui/components/tabs';
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
import { Switch } from '@workspace/ui/components/switch';
import { Separator } from '@workspace/ui/components/separator';
import {
    RadioGroup,
    RadioGroupItem,
} from '@workspace/ui/components/radio-group';
import {
    Download,
    Save,
    UserRound,
    ShieldCheck,
    Bell,
    Database,
    Trash2,
    HelpCircle,
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@workspace/ui/components/select';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@workspace/ui/components/alert-dialog';

export default async function SettingsPage() {
    // 检查用户登录状态
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect('/login?returnUrl=/settings');
    }

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">设置</h1>
                <p className="text-muted-foreground">
                    管理您的个人资料、安全设置和偏好
                </p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="mb-8 grid w-full grid-cols-4">
                    <TabsTrigger
                        value="profile"
                        className="flex items-center gap-2"
                    >
                        <UserRound className="h-4 w-4" />
                        <span className="hidden sm:inline">个人资料</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        className="flex items-center gap-2"
                    >
                        <ShieldCheck className="h-4 w-4" />
                        <span className="hidden sm:inline">安全设置</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="notifications"
                        className="flex items-center gap-2"
                    >
                        <Bell className="h-4 w-4" />
                        <span className="hidden sm:inline">通知偏好</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="data"
                        className="flex items-center gap-2"
                    >
                        <Database className="h-4 w-4" />
                        <span className="hidden sm:inline">数据管理</span>
                    </TabsTrigger>
                </TabsList>

                {/* 个人资料 */}
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>个人资料</CardTitle>
                            <CardDescription>
                                更新您的个人信息和偏好设置
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-1">
                                    <Label htmlFor="name">姓名</Label>
                                    <Input id="name" defaultValue="张三" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <Label htmlFor="email">电子邮箱</Label>
                                        <Input
                                            id="email"
                                            defaultValue="zhangsan@example.com"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="phone">手机号码</Label>
                                        <Input
                                            id="phone"
                                            defaultValue="13812345678"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <Label htmlFor="birth">出生日期</Label>
                                        <Input
                                            id="birth"
                                            type="date"
                                            defaultValue="1985-01-15"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="gender">性别</Label>
                                        <Select defaultValue="male">
                                            <SelectTrigger>
                                                <SelectValue placeholder="选择性别" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">
                                                    男
                                                </SelectItem>
                                                <SelectItem value="female">
                                                    女
                                                </SelectItem>
                                                <SelectItem value="other">
                                                    其他
                                                </SelectItem>
                                                <SelectItem value="prefer-not-to-say">
                                                    不便透露
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    偏好设置
                                </h3>

                                <div className="space-y-1">
                                    <Label htmlFor="language">语言</Label>
                                    <Select defaultValue="zh-CN">
                                        <SelectTrigger>
                                            <SelectValue placeholder="选择语言" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="zh-CN">
                                                简体中文
                                            </SelectItem>
                                            <SelectItem value="zh-TW">
                                                繁体中文
                                            </SelectItem>
                                            <SelectItem value="en-US">
                                                English (US)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="currency">货币单位</Label>
                                    <Select defaultValue="CNY">
                                        <SelectTrigger>
                                            <SelectValue placeholder="选择货币单位" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CNY">
                                                人民币 (CNY)
                                            </SelectItem>
                                            <SelectItem value="USD">
                                                美元 (USD)
                                            </SelectItem>
                                            <SelectItem value="EUR">
                                                欧元 (EUR)
                                            </SelectItem>
                                            <SelectItem value="GBP">
                                                英镑 (GBP)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="dark-mode">
                                            深色模式
                                        </Label>
                                        <p className="text-muted-foreground text-sm">
                                            启用深色模式以减少眼睛疲劳
                                        </p>
                                    </div>
                                    <Switch id="dark-mode" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>
                                <Save className="mr-2 h-4 w-4" />
                                保存更改
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* 安全设置 */}
                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>安全设置</CardTitle>
                            <CardDescription>
                                管理密码和账户安全选项
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    修改密码
                                </h3>

                                <div className="space-y-1">
                                    <Label htmlFor="current-password">
                                        当前密码
                                    </Label>
                                    <Input
                                        id="current-password"
                                        type="password"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="new-password">新密码</Label>
                                    <Input id="new-password" type="password" />
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="confirm-password">
                                        确认新密码
                                    </Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                    />
                                </div>

                                <Button className="mt-2">更新密码</Button>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    双重验证
                                </h3>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="2fa">两步验证</Label>
                                        <p className="text-muted-foreground text-sm">
                                            启用两步验证以提高账户安全性
                                        </p>
                                    </div>
                                    <Switch id="2fa" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="login-alert">
                                            登录提醒
                                        </Label>
                                        <p className="text-muted-foreground text-sm">
                                            在新设备登录时发送邮件通知
                                        </p>
                                    </div>
                                    <Switch id="login-alert" defaultChecked />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    会话管理
                                </h3>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">
                                                Windows PC - Chrome
                                            </p>
                                            <p className="text-muted-foreground text-sm">
                                                上海 · 当前设备
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled
                                        >
                                            当前
                                        </Button>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">
                                                iPhone 13 - Safari
                                            </p>
                                            <p className="text-muted-foreground text-sm">
                                                上海 · 最后登录于 2小时前
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            登出
                                        </Button>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">
                                                MacBook - Firefox
                                            </p>
                                            <p className="text-muted-foreground text-sm">
                                                北京 · 最后登录于 2天前
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            登出
                                        </Button>
                                    </div>
                                </div>

                                <Button variant="secondary">
                                    登出所有其他设备
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 通知偏好 */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>通知偏好</CardTitle>
                            <CardDescription>
                                自定义您希望接收的通知类型和频率
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    通知渠道
                                </h3>

                                <div className="grid gap-2">
                                    <RadioGroup defaultValue="both">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="both"
                                                id="both"
                                            />
                                            <Label htmlFor="both">
                                                电子邮件和短信
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="email"
                                                id="email"
                                            />
                                            <Label htmlFor="email">
                                                仅电子邮件
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="sms"
                                                id="sms"
                                            />
                                            <Label htmlFor="sms">仅短信</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    通知类型
                                </h3>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>账户安全提醒</Label>
                                            <p className="text-muted-foreground text-sm">
                                                登录提醒、密码更改、账户活动等
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>财务目标提醒</Label>
                                            <p className="text-muted-foreground text-sm">
                                                储蓄目标达成、退休准备度变化等
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>定期报告</Label>
                                            <p className="text-muted-foreground text-sm">
                                                每月财务状况摘要、退休规划更新等
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>新功能公告</Label>
                                            <p className="text-muted-foreground text-sm">
                                                平台新功能、服务更新等信息
                                            </p>
                                        </div>
                                        <Switch />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>营销信息</Label>
                                            <p className="text-muted-foreground text-sm">
                                                促销活动、合作伙伴优惠等
                                            </p>
                                        </div>
                                        <Switch />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    通知频率
                                </h3>

                                <div className="space-y-1">
                                    <Label htmlFor="report-frequency">
                                        财务报告频率
                                    </Label>
                                    <Select defaultValue="monthly">
                                        <SelectTrigger>
                                            <SelectValue placeholder="选择频率" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="weekly">
                                                每周
                                            </SelectItem>
                                            <SelectItem value="biweekly">
                                                每两周
                                            </SelectItem>
                                            <SelectItem value="monthly">
                                                每月
                                            </SelectItem>
                                            <SelectItem value="quarterly">
                                                每季度
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="quiet-hours">
                                        勿扰时段
                                    </Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            id="quiet-hours-start"
                                            type="time"
                                            defaultValue="22:00"
                                        />
                                        <Input
                                            id="quiet-hours-end"
                                            type="time"
                                            defaultValue="08:00"
                                        />
                                    </div>
                                    <p className="text-muted-foreground mt-1 text-sm">
                                        在勿扰时段内不会发送短信通知
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>保存偏好设置</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* 数据管理 */}
                <TabsContent value="data">
                    <Card>
                        <CardHeader>
                            <CardTitle>数据管理</CardTitle>
                            <CardDescription>
                                管理您的个人数据和账户信息
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    数据导出
                                </h3>

                                <p className="text-muted-foreground text-sm">
                                    您可以导出所有个人数据的副本，包括个人资料、财务信息和规划数据
                                </p>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between rounded-md border p-4">
                                        <div>
                                            <p className="font-medium">
                                                完整数据包
                                            </p>
                                            <p className="text-muted-foreground text-sm">
                                                所有个人数据和财务信息
                                            </p>
                                        </div>
                                        <Button variant="outline">
                                            <Download className="mr-2 h-4 w-4" />
                                            导出
                                        </Button>
                                    </div>

                                    <div className="flex items-center justify-between rounded-md border p-4">
                                        <div>
                                            <p className="font-medium">
                                                财务数据
                                            </p>
                                            <p className="text-muted-foreground text-sm">
                                                资产、退休规划和预测信息
                                            </p>
                                        </div>
                                        <Button variant="outline">
                                            <Download className="mr-2 h-4 w-4" />
                                            导出
                                        </Button>
                                    </div>

                                    <div className="flex items-center justify-between rounded-md border p-4">
                                        <div>
                                            <p className="font-medium">
                                                个人资料
                                            </p>
                                            <p className="text-muted-foreground text-sm">
                                                账户信息和个人设置
                                            </p>
                                        </div>
                                        <Button variant="outline">
                                            <Download className="mr-2 h-4 w-4" />
                                            导出
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    数据隐私
                                </h3>

                                <div className="flex items-start rounded-md border border-blue-200 bg-blue-50 p-4">
                                    <HelpCircle className="mr-4 mt-1 h-6 w-6 flex-shrink-0 text-blue-500" />
                                    <div>
                                        <h4 className="mb-1 font-medium text-blue-800">
                                            数据隐私说明
                                        </h4>
                                        <p className="text-sm text-blue-700">
                                            我们重视您的数据隐私。所有数据均加密存储，并且仅用于提供您请求的服务。
                                            我们不会将您的个人数据出售给第三方。您可以随时删除您的账户和相关数据。
                                        </p>
                                        <Button
                                            variant="link"
                                            className="mt-1 h-auto p-0 text-blue-700"
                                        >
                                            查看隐私政策
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-red-600">
                                    账户删除
                                </h3>

                                <p className="text-muted-foreground text-sm">
                                    删除账户将永久移除所有个人数据和财务信息。此操作无法撤销。
                                </p>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            删除账户
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                确认删除账户？
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                此操作将永久删除您的账户和所有相关数据，包括个人资料、财务信息和规划数据。
                                                删除后无法恢复。
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                取消
                                            </AlertDialogCancel>
                                            <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                                确认删除
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
