'use client';

import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import {
    PlusCircle,
    TrendingUp,
    Calendar,
    Wallet,
    CreditCard,
    PieChart,
    Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { assetAPI, planAPI, forecastAPI } from '../lib/api-client';
import { Asset, FinancialPlan, Forecast } from '../lib/types';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';
import { fetchAPI } from '../lib/api-client';

// API会话状态接口
interface ApiSessionStatus {
    status: string;
    userId: string;
    email: string;
    lastUpdated: number;
}

export default function Dashboard() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [plans, setPlans] = useState<FinancialPlan[]>([]);
    const [forecasts, setForecasts] = useState<Forecast[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [sessionStatus, setSessionStatus] = useState<string>('检查中...');
    const router = useRouter();

    // 获取用户数据
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [assetsData, plansData, forecastsData] =
                    await Promise.all([
                        assetAPI.getAssets(),
                        planAPI.getPlans(),
                        forecastAPI.getForecasts(),
                    ]);

                setAssets(assetsData);
                setPlans(plansData);
                setForecasts(forecastsData);
                setError(null);
            } catch (err) {
                console.error('获取数据失败:', err);
                setError('获取数据失败，请刷新页面重试');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('获取会话出错:', error.message);
                    setSessionStatus(`会话错误: ${error.message}`);
                    setTimeout(() => router.push('/login'), 2000);
                    return;
                }

                if (!data.session) {
                    console.log('仪表盘: 未登录');
                    setSessionStatus('未登录，正在跳转到登录页面...');
                    setTimeout(() => router.push('/login'), 2000);
                    return;
                }

                // 获取用户信息
                setUser(data.session.user);
                setSessionStatus('已登录');

                // 检查API会话状态
                try {
                    const apiSessionStatus =
                        await fetchAPI<ApiSessionStatus>('/auth/session');
                    console.log('API会话状态:', apiSessionStatus);
                    setSessionStatus(
                        `已登录 (API会话有效: ${apiSessionStatus.userId})`
                    );
                } catch (apiError) {
                    console.error('API会话检查失败:', apiError);
                    setSessionStatus(`已登录 (API会话检查失败)`);
                }
            } catch (err) {
                console.error('认证检查失败:', err);
                setSessionStatus(
                    `认证检查失败: ${err instanceof Error ? err.message : '未知错误'}`
                );
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    // 计算总资产价值
    const totalAssetValue = assets.reduce((sum, asset) => sum + asset.value, 0);

    // 获取最新的预测（如果有）
    const latestForecast = forecasts.length > 0 ? forecasts[0] : null;

    // 计算财务自由进度
    const financialFreedomProgress = latestForecast
        ? Math.min(
              100,
              Math.round(
                  (totalAssetValue / latestForecast.retirement_assets) * 100
              )
          )
        : 0;

    // 计算资产分布
    type AssetDistributionType =
        | 'cash'
        | 'stock'
        | 'bond'
        | 'real_estate'
        | 'crypto'
        | 'other';
    const assetDistribution: Record<AssetDistributionType, number> = {
        cash: 0,
        stock: 0,
        bond: 0,
        real_estate: 0,
        crypto: 0,
        other: 0,
    };

    assets.forEach((asset) => {
        // 如果资产类型是有效的分布类型，则添加到相应类别，否则添加到"其他"
        const type = asset.type as AssetDistributionType;
        if (type in assetDistribution) {
            assetDistribution[type] += asset.value;
        } else {
            assetDistribution.other += asset.value;
        }
    });

    if (loading) {
        return (
            <div className="container mx-auto flex items-center justify-center px-4 py-24 md:px-6 md:py-28">
                <div className="text-center">
                    <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin" />
                    <p>加载数据中...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto mt-10 px-4">
                <h1 className="mb-6 text-2xl font-bold">
                    认证状态: {sessionStatus}
                </h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-24 md:px-6 md:py-28">
            {error && (
                <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-red-600">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold">财务仪表盘</h1>
                        <p className="text-muted-foreground mt-1">
                            查看和管理您的退休规划
                        </p>
                    </div>
                    <Button className="mt-4 md:mt-0" asChild>
                        <Link href="/plan/new">
                            <PlusCircle className="mr-2 h-4 w-4" /> 新建规划
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">
                                财务自由进度
                            </CardTitle>
                            <CardDescription>基于当前规划</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-medium">
                                    {financialFreedomProgress}%
                                </span>
                                <span className="text-muted-foreground text-sm">
                                    目标: 100%
                                </span>
                            </div>
                            <div className="bg-muted mt-2 h-3 w-full rounded-full">
                                <div
                                    className="bg-primary h-3 rounded-full"
                                    style={{
                                        width: `${financialFreedomProgress}%`,
                                    }}
                                ></div>
                            </div>
                            <div className="mt-2 flex justify-between text-sm">
                                <span>
                                    当前: ¥
                                    {(totalAssetValue / 10000).toFixed(1)}万
                                </span>
                                {latestForecast && (
                                    <span>
                                        目标: ¥
                                        {(
                                            latestForecast.retirement_assets /
                                            10000
                                        ).toFixed(1)}
                                        万
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">
                                预计退休时间
                            </CardTitle>
                            <CardDescription>基于当前的存款率</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center">
                            <Calendar className="text-primary mr-4 h-10 w-10" />
                            <div>
                                {latestForecast ? (
                                    <>
                                        <div className="text-2xl font-bold">
                                            {new Date().getFullYear() +
                                                (latestForecast.retirement_age -
                                                    (plans[0]?.current_age ||
                                                        30))}
                                            年
                                        </div>
                                        <div className="text-muted-foreground text-sm">
                                            {latestForecast.retirement_age}岁
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-muted-foreground">
                                        尚无预测数据
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">
                                每月被动收入
                            </CardTitle>
                            <CardDescription>退休后预计</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center">
                            <Wallet className="text-primary mr-4 h-10 w-10" />
                            <div>
                                {latestForecast ? (
                                    <>
                                        <div className="text-2xl font-bold">
                                            ¥
                                            {latestForecast.monthly_income.toLocaleString()}
                                        </div>
                                        <div className="text-muted-foreground text-sm">
                                            已达到目标的
                                            {latestForecast.readiness_score}%
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-muted-foreground">
                                        尚无预测数据
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>资产配置</CardTitle>
                            <CardDescription>您当前的资产分布</CardDescription>
                        </CardHeader>
                        <CardContent className="flex min-h-[220px] items-center justify-center">
                            {assets.length > 0 ? (
                                <div className="flex flex-col items-center">
                                    <PieChart className="text-muted-foreground/50 h-40 w-40" />
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        {assetDistribution.stock > 0 && (
                                            <div className="flex items-center">
                                                <div className="bg-primary mr-2 h-3 w-3 rounded-full"></div>
                                                <span className="text-sm">
                                                    股票 (
                                                    {Math.round(
                                                        (assetDistribution.stock /
                                                            totalAssetValue) *
                                                            100
                                                    )}
                                                    %)
                                                </span>
                                            </div>
                                        )}
                                        {assetDistribution.bond > 0 && (
                                            <div className="flex items-center">
                                                <div className="bg-secondary mr-2 h-3 w-3 rounded-full"></div>
                                                <span className="text-sm">
                                                    债券 (
                                                    {Math.round(
                                                        (assetDistribution.bond /
                                                            totalAssetValue) *
                                                            100
                                                    )}
                                                    %)
                                                </span>
                                            </div>
                                        )}
                                        {assetDistribution.cash > 0 && (
                                            <div className="flex items-center">
                                                <div className="bg-destructive mr-2 h-3 w-3 rounded-full"></div>
                                                <span className="text-sm">
                                                    现金 (
                                                    {Math.round(
                                                        (assetDistribution.cash /
                                                            totalAssetValue) *
                                                            100
                                                    )}
                                                    %)
                                                </span>
                                            </div>
                                        )}
                                        {assetDistribution.real_estate > 0 && (
                                            <div className="flex items-center">
                                                <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                                                <span className="text-sm">
                                                    房产 (
                                                    {Math.round(
                                                        (assetDistribution.real_estate /
                                                            totalAssetValue) *
                                                            100
                                                    )}
                                                    %)
                                                </span>
                                            </div>
                                        )}
                                        {assetDistribution.other > 0 && (
                                            <div className="flex items-center">
                                                <div className="bg-muted-foreground mr-2 h-3 w-3 rounded-full"></div>
                                                <span className="text-sm">
                                                    其他 (
                                                    {Math.round(
                                                        (assetDistribution.other /
                                                            totalAssetValue) *
                                                            100
                                                    )}
                                                    %)
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p className="text-muted-foreground mb-4">
                                        尚未添加资产数据
                                    </p>
                                    <Button asChild variant="outline" size="sm">
                                        <Link href="/assets/new">添加资产</Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>财务计划</CardTitle>
                            <CardDescription>您的退休规划</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {plans.length > 0 ? (
                                <div className="space-y-4">
                                    {plans.slice(0, 3).map((plan) => (
                                        <div
                                            key={plan.id}
                                            className="flex items-start justify-between"
                                        >
                                            <div>
                                                <div className="font-medium">
                                                    {plan.name || '未命名计划'}
                                                </div>
                                                <div className="text-muted-foreground text-sm">
                                                    目标退休年龄:{' '}
                                                    {plan.target_retirement_age}
                                                    岁
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                asChild
                                            >
                                                <Link href={`/plan/${plan.id}`}>
                                                    查看
                                                </Link>
                                            </Button>
                                        </div>
                                    ))}
                                    {plans.length > 3 && (
                                        <div className="mt-2 text-center">
                                            <Button
                                                asChild
                                                variant="link"
                                                size="sm"
                                            >
                                                <Link href="/plans">
                                                    查看所有计划
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p className="text-muted-foreground mb-4">
                                        尚未创建财务计划
                                    </p>
                                    <Button asChild size="sm">
                                        <Link href="/plan/new">创建计划</Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
