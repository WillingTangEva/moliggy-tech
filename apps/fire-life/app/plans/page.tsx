'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@workspace/ui/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Badge } from '@workspace/ui/components/badge';
import { Plus, BarChart4, FileEdit, Trash2, Loader2 } from 'lucide-react';
import { planAPI } from '../api/plans';
import { FinancialPlan } from '../lib/types';

export default function PlansOverview() {
    const router = useRouter();
    const [plans, setPlans] = useState<FinancialPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPlans() {
            try {
                setLoading(true);
                const data = await planAPI.getPlans();
                setPlans(data);
            } catch (err) {
                console.error('获取计划列表失败:', err);
                setError('无法加载计划数据，请稍后重试');
            } finally {
                setLoading(false);
            }
        }

        fetchPlans();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('确定要删除这个财务计划吗？这个操作不可恢复。')) {
            return;
        }

        try {
            setDeletingId(id);
            await planAPI.deletePlan(id);
            setPlans(plans.filter(plan => plan.id !== id));
        } catch (err) {
            console.error('删除计划失败:', err);
            alert('删除计划失败，请稍后重试');
        } finally {
            setDeletingId(null);
        }
    };

    const getRiskLevelText = (riskTolerance: number) => {
        if (riskTolerance <= 3) return '保守型';
        if (riskTolerance <= 7) return '稳健型';
        return '进取型';
    };

    const getRiskLevelColor = (riskTolerance: number) => {
        if (riskTolerance <= 3) return 'bg-blue-100 text-blue-800';
        if (riskTolerance <= 7) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h1 className="text-3xl font-bold">财务规划</h1>
                    <p className="text-muted-foreground mt-1">
                        管理您的财务计划和退休目标
                    </p>
                </div>
                <Button className="shrink-0" onClick={() => router.push('/plan/new')}>
                    <Plus className="mr-2 h-4 w-4" /> 创建新计划
                </Button>
            </div>

            <Tabs defaultValue="all" className="mt-8">
                <TabsList>
                    <TabsTrigger value="all">全部计划</TabsTrigger>
                    <TabsTrigger value="recent">最近创建</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                    {loading ? (
                        <div className="flex h-32 items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : error ? (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
                            <p className="text-red-700">{error}</p>
                            <Button 
                                variant="outline" 
                                className="mt-4" 
                                onClick={() => window.location.reload()}
                            >
                                重试
                            </Button>
                        </div>
                    ) : plans.length === 0 ? (
                        <div className="rounded-lg border border-dashed p-12 text-center">
                            <h3 className="text-lg font-medium">您还没有创建任何财务计划</h3>
                            <p className="text-muted-foreground mt-2">
                                创建一个新计划来开始您的财务自由之旅
                            </p>
                            <Button className="mt-4" onClick={() => router.push('/plan/new')}>
                                <Plus className="mr-2 h-4 w-4" /> 创建新计划
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {plans.map((plan) => (
                                <Card key={plan.id} className="overflow-hidden">
                                    <CardHeader>
                                        <CardTitle className="line-clamp-1">{plan.name}</CardTitle>
                                        <CardDescription className="line-clamp-2">
                                            {plan.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
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
                                                <p className="text-sm text-muted-foreground">年收入</p>
                                                <p className="font-medium">¥ {plan.annual_income.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">风险偏好</p>
                                                <Badge className={getRiskLevelColor(plan.risk_tolerance)}>
                                                    {getRiskLevelText(plan.risk_tolerance)}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between bg-muted/30 px-6 py-3">
                                        <div className="flex space-x-2">
                                            <Button 
                                                variant="ghost" 
                                                size="sm"
                                                onClick={() => router.push(`/plan/${plan.id}`)}
                                            >
                                                查看
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="sm"
                                                onClick={() => router.push(`/plan/${plan.id}/edit`)}
                                            >
                                                <FileEdit className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button 
                                                variant="ghost" 
                                                size="sm"
                                                onClick={() => router.push(`/forecast?planId=${plan.id}`)}
                                            >
                                                <BarChart4 className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="sm"
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => handleDelete(plan.id!)}
                                                disabled={deletingId === plan.id}
                                            >
                                                {deletingId === plan.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="recent">
                    {!loading && !error && plans.length > 0 && (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {plans.slice(0, 3).map((plan) => (
                                <Card key={plan.id} className="overflow-hidden">
                                    <CardHeader>
                                        <CardTitle className="line-clamp-1">{plan.name}</CardTitle>
                                        <CardDescription className="line-clamp-2">
                                            {plan.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
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
                                                <p className="text-sm text-muted-foreground">年收入</p>
                                                <p className="font-medium">¥ {plan.annual_income.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">风险偏好</p>
                                                <Badge className={getRiskLevelColor(plan.risk_tolerance)}>
                                                    {getRiskLevelText(plan.risk_tolerance)}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between bg-muted/30 px-6 py-3">
                                        <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => router.push(`/plan/${plan.id}`)}
                                        >
                                            查看
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => router.push(`/forecast?planId=${plan.id}`)}
                                        >
                                            <BarChart4 className="mr-1 h-4 w-4" /> 生成预测
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
} 