'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@workspace/ui/components/card';
import { Label } from '@workspace/ui/components/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@workspace/ui/components/select';
import { ArrowLeft, ArrowRight, Loader2, Save } from 'lucide-react';

const steps = [
    { id: 1, name: '基本信息' },
    { id: 2, name: '资产录入' },
    { id: 3, name: '保险设置' },
    { id: 4, name: '支出设置' },
];

export default function NewPlan() {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // 检查用户登录状态
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/auth/check');
                const data = await response.json();

                if (!data.authenticated) {
                    console.log('新建计划: 未登录');
                    router.push('/login?returnUrl=/plan/new');
                    return;
                }

                setLoading(false);
            } catch (err) {
                console.error('认证检查失败:', err);
                router.push('/login?returnUrl=/plan/new');
            }
        };

        checkAuth();
    }, [router]);

    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto flex items-center justify-center px-4 py-24 md:px-6 md:py-28">
                <div className="text-center">
                    <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin" />
                    <p>加载中...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-24 md:px-6 md:py-28">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">创建退休规划</h1>
                    <p className="text-muted-foreground mt-1">
                        填写必要信息，获取您的退休财务分析
                    </p>
                </div>

                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={`flex-1 text-center ${
                                    currentStep === step.id
                                        ? 'text-primary'
                                        : currentStep > step.id
                                          ? 'text-muted-foreground'
                                          : 'text-muted-foreground/50'
                                }`}
                            >
                                <div className="relative">
                                    <div
                                        className={`absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 transform ${
                                            currentStep > step.id
                                                ? 'bg-primary'
                                                : 'bg-muted'
                                        }`}
                                        style={{
                                            left: step.id === 1 ? '50%' : '0',
                                            right:
                                                step.id === steps.length
                                                    ? '50%'
                                                    : '0',
                                        }}
                                    />
                                    <div
                                        className={`relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full ${
                                            currentStep === step.id
                                                ? 'bg-primary text-white'
                                                : currentStep > step.id
                                                  ? 'bg-primary text-white'
                                                  : 'bg-muted text-muted-foreground'
                                        }`}
                                    >
                                        {currentStep > step.id ? '✓' : step.id}
                                    </div>
                                </div>
                                <div className="mt-2 text-sm font-medium">
                                    {step.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {currentStep === 1 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>基本信息</CardTitle>
                            <CardDescription>
                                填写您的基本信息和目标
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="current-age">
                                        当前年龄
                                    </Label>
                                    <Input
                                        id="current-age"
                                        type="number"
                                        placeholder="35"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="retirement-age">
                                        目标退休年龄
                                    </Label>
                                    <Input
                                        id="retirement-age"
                                        type="number"
                                        placeholder="55"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="life-expectancy">
                                        预期寿命
                                    </Label>
                                    <Input
                                        id="life-expectancy"
                                        type="number"
                                        placeholder="85"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="income">
                                        当前月收入 (¥)
                                    </Label>
                                    <Input
                                        id="income"
                                        type="number"
                                        placeholder="25000"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="risk-profile">
                                    风险承受能力
                                </Label>
                                <Select>
                                    <SelectTrigger id="risk-profile">
                                        <SelectValue placeholder="选择风险承受能力" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="conservative">
                                            保守型 - 低风险低回报
                                        </SelectItem>
                                        <SelectItem value="moderate">
                                            稳健型 - 中等风险中等回报
                                        </SelectItem>
                                        <SelectItem value="aggressive">
                                            进取型 - 高风险高回报
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button onClick={nextStep}>
                                下一步 <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                )}

                {currentStep === 2 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>资产录入</CardTitle>
                            <CardDescription>
                                添加您当前拥有的各类资产
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="bank-savings">
                                    银行储蓄 (¥)
                                </Label>
                                <Input
                                    id="bank-savings"
                                    type="number"
                                    placeholder="100000"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="term-deposits">
                                    定期存款 (¥)
                                </Label>
                                <Input
                                    id="term-deposits"
                                    type="number"
                                    placeholder="200000"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stocks">股票投资 (¥)</Label>
                                <Input
                                    id="stocks"
                                    type="number"
                                    placeholder="300000"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="funds">基金投资 (¥)</Label>
                                <Input
                                    id="funds"
                                    type="number"
                                    placeholder="200000"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="real-estate">
                                    房产估值 (¥)
                                </Label>
                                <Input
                                    id="real-estate"
                                    type="number"
                                    placeholder="2000000"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="other-assets">
                                    其他资产 (¥)
                                </Label>
                                <Input
                                    id="other-assets"
                                    type="number"
                                    placeholder="50000"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={prevStep}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> 上一步
                            </Button>
                            <Button onClick={nextStep}>
                                下一步 <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                )}

                {currentStep === 3 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>保险设置</CardTitle>
                            <CardDescription>添加您的保险信息</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>社会保险</Label>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="social-insurance-base">
                                            缴费基数 (¥/月)
                                        </Label>
                                        <Input
                                            id="social-insurance-base"
                                            type="number"
                                            placeholder="10000"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="social-insurance-years">
                                            已缴费年限
                                        </Label>
                                        <Input
                                            id="social-insurance-years"
                                            type="number"
                                            placeholder="10"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>年金保险</Label>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="annuity-premium">
                                            年保费 (¥)
                                        </Label>
                                        <Input
                                            id="annuity-premium"
                                            type="number"
                                            placeholder="20000"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="annuity-payout-age">
                                            领取年龄
                                        </Label>
                                        <Input
                                            id="annuity-payout-age"
                                            type="number"
                                            placeholder="60"
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 space-y-2">
                                    <Label htmlFor="annuity-monthly-payment">
                                        估计月领取金额 (¥)
                                    </Label>
                                    <Input
                                        id="annuity-monthly-payment"
                                        type="number"
                                        placeholder="3000"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>商业养老保险</Label>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="commercial-pension-premium">
                                            年保费 (¥)
                                        </Label>
                                        <Input
                                            id="commercial-pension-premium"
                                            type="number"
                                            placeholder="12000"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="commercial-pension-years">
                                            缴费年限
                                        </Label>
                                        <Input
                                            id="commercial-pension-years"
                                            type="number"
                                            placeholder="15"
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 space-y-2">
                                    <Label htmlFor="commercial-pension-monthly">
                                        估计月领取金额 (¥)
                                    </Label>
                                    <Input
                                        id="commercial-pension-monthly"
                                        type="number"
                                        placeholder="2500"
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={prevStep}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> 上一步
                            </Button>
                            <Button onClick={nextStep}>
                                下一步 <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                )}

                {currentStep === 4 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>支出设置</CardTitle>
                            <CardDescription>
                                预估您当前和退休后的支出
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-monthly-expenses">
                                    当前月度支出 (¥)
                                </Label>
                                <Input
                                    id="current-monthly-expenses"
                                    type="number"
                                    placeholder="15000"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="retirement-monthly-expenses">
                                    预期退休后月度支出 (¥)
                                </Label>
                                <Input
                                    id="retirement-monthly-expenses"
                                    type="number"
                                    placeholder="12000"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>大额支出计划</Label>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <Label htmlFor="major-expense-1-name">
                                                支出名称
                                            </Label>
                                            <Input
                                                id="major-expense-1-name"
                                                placeholder="子女教育"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="major-expense-1-amount">
                                                金额 (¥)
                                            </Label>
                                            <Input
                                                id="major-expense-1-amount"
                                                type="number"
                                                placeholder="500000"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="major-expense-1-year">
                                                预计年份
                                            </Label>
                                            <Input
                                                id="major-expense-1-year"
                                                type="number"
                                                placeholder="2030"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <Label htmlFor="major-expense-2-name">
                                                支出名称
                                            </Label>
                                            <Input
                                                id="major-expense-2-name"
                                                placeholder="环球旅行"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="major-expense-2-amount">
                                                金额 (¥)
                                            </Label>
                                            <Input
                                                id="major-expense-2-amount"
                                                type="number"
                                                placeholder="200000"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="major-expense-2-year">
                                                预计年份
                                            </Label>
                                            <Input
                                                id="major-expense-2-year"
                                                type="number"
                                                placeholder="2035"
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        + 添加更多支出
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={prevStep}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> 上一步
                            </Button>
                            <Button className="bg-primary hover:bg-primary/90">
                                <Save className="mr-2 h-4 w-4" /> 保存并生成报告
                            </Button>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    );
}
