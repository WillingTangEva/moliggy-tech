'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@workspace/ui/components/card';
import { ArrowLeft } from 'lucide-react';
import { planAPI } from '../../api/plans';
import { FinancialPlan } from '../../lib/types';

export default function PlanDetail({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [plan, setPlan] = useState<FinancialPlan | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPlan() {
            try {
                setLoading(true);
                const data = await planAPI.getPlan(params.id);
                setPlan(data);
            } catch (err) {
                console.error('获取计划失败:', err);
                setError('无法加载计划数据，请稍后重试');
            } finally {
                setLoading(false);
            }
        }

        fetchPlan();
    }, [params.id]);

    const navigateBack = () => {
        router.back();
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-24 md:px-6 md:py-28">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-2xl font-bold">加载中...</h2>
                    <p className="text-muted-foreground mt-2">正在获取计划详情</p>
                </div>
            </div>
        );
    }

    if (error || !plan) {
        return (
            <div className="container mx-auto px-4 py-24 md:px-6 md:py-28">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-2xl font-bold text-red-500">出错了</h2>
                    <p className="mt-2">{error || '无法找到该计划'}</p>
                    <Button className="mt-4" onClick={navigateBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> 返回
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-24 md:px-6 md:py-28">
            <div className="mx-auto max-w-3xl">
                <Button
                    variant="outline"
                    className="mb-6"
                    onClick={navigateBack}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> 返回
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">基本信息</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">当前年龄</p>
                                    <p className="font-medium">{plan.current_age} 岁</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">目标退休年龄</p>
                                    <p className="font-medium">{plan.target_retirement_age} 岁</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">退休目标金额</p>
                                    <p className="font-medium">¥ {plan.retirement_target_amount?.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">财务数据</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">年收入</p>
                                    <p className="font-medium">¥ {plan.annual_income.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">年支出</p>
                                    <p className="font-medium">¥ {plan.annual_expenses.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">退休后年收入</p>
                                    <p className="font-medium">¥ {plan.retirement_income.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">退休后年支出</p>
                                    <p className="font-medium">¥ {plan.retirement_expenses.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">投资相关</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">预期投资回报率</p>
                                    <p className="font-medium">{(plan.expected_return_rate * 100).toFixed(2)}%</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">通胀率</p>
                                    <p className="font-medium">{(plan.inflation_rate * 100).toFixed(2)}%</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">风险承受能力</p>
                                    <p className="font-medium">
                                        {plan.risk_tolerance <= 3 
                                            ? '保守型' 
                                            : plan.risk_tolerance <= 7 
                                                ? '稳健型' 
                                                : '进取型'
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => router.push(`/plan/${plan.id}/edit`)}>
                            编辑计划
                        </Button>
                        <Button 
                            className="bg-primary hover:bg-primary/90"
                            onClick={() => router.push(`/forecast?planId=${plan.id}`)}
                        >
                            生成预测报告
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
} 