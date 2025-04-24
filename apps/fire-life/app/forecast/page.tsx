'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import { Slider } from '@workspace/ui/components/slider';
import { Label } from '@workspace/ui/components/label';
import {
    Download,
    Share2,
    RefreshCw,
    AlertTriangle,
    Loader2,
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@workspace/ui/components/select';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@workspace/ui/components/tooltip';
import { forecastAPI, planAPI, assetAPI } from '../api';
import {
    FinancialPlan,
    RetirementResult,
    Forecast,
    ForecastDetail,
} from '../lib/types';
import ForecastChart from '../components/ForecastChart';
import RetirementReadinessCard from '../components/RetirementReadinessCard';

export default function ForecastPage() {
    const [plans, setPlans] = useState<FinancialPlan[]>([]);
    const [selectedPlanId, setSelectedPlanId] = useState<string>('');
    const [currentAssets, setCurrentAssets] = useState<number>(0);
    const [retirementResult, setRetirementResult] =
        useState<RetirementResult | null>(null);
    const [forecasts, setForecasts] = useState<Forecast[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [calculating, setCalculating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // 参数调整
    const [inflationRate, setInflationRate] = useState<number>(3);
    const [returnRate, setReturnRate] = useState<number>(7);
    const [monthlySavings, setMonthlySavings] = useState<number>(5000);
    const [retirementAge, setRetirementAge] = useState<number>(55);

    // 获取用户数据
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                
                // 先获取计划数据
                let plansData: FinancialPlan[] = [];
                try {
                    plansData = await planAPI.getPlans();
                    console.log('获取到计划数据:', plansData);
                    setPlans(plansData);
                } catch (err) {
                    console.error('获取计划数据失败:', err);
                    setError('获取财务计划数据失败，请刷新页面重试');
                }

                // 获取资产和预测数据
                try {
                    const [assetsData, forecastsData] = await Promise.all([
                        assetAPI.getAssets(),
                        forecastAPI.getForecasts(),
                    ]);
                    setForecasts(forecastsData);

                    // 计算总资产
                    const totalAssets = assetsData.reduce(
                        (sum, asset) => sum + asset.value,
                        0
                    );
                    setCurrentAssets(totalAssets);
                } catch (err) {
                    console.error('获取资产或预测数据失败:', err);
                    if (!error) {
                        setError('获取资产或预测数据失败，请刷新页面重试');
                    }
                }

                // 检查URL中是否有planId参数
                const searchParams = new URLSearchParams(window.location.search);
                const planIdFromUrl = searchParams.get('planId');
                
                if (planIdFromUrl && plansData.some(p => p.id === planIdFromUrl)) {
                    // 如果URL中有planId并且该计划存在，则选择它
                    setSelectedPlanId(planIdFromUrl);
                    console.log('从URL设置计划ID:', planIdFromUrl);
                } else if (plansData.length > 0 && plansData[0]?.id) {
                    // 否则选择第一个计划
                    setSelectedPlanId(plansData[0].id);
                    console.log('设置为第一个计划ID:', plansData[0].id);
                } else {
                    console.log('没有可用的计划，计划列表为空');
                    setSelectedPlanId('');
                }
            } catch (err) {
                console.error('获取数据失败:', err);
                setError('获取数据失败，请刷新页面重试');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // 当用户选择计划时，重新计算退休结果
    useEffect(() => {
        async function calculateRetirement() {
            if (!selectedPlanId || !currentAssets) return;

            try {
                setCalculating(true);
                // 使用forecastAPI，访问正确的端点
                const result = await forecastAPI.calculateRetirement(
                    selectedPlanId,
                    currentAssets
                );
                
                console.log('计算结果:', result);
                setRetirementResult(result);

                // 设置模拟器参数为当前计划的参数
                const selectedPlan = plans.find((p) => p.id === selectedPlanId);
                if (selectedPlan) {
                    setInflationRate(
                        (selectedPlan.inflation_rate || 0.03) * 100
                    );
                    setReturnRate(
                        (selectedPlan.expected_return_rate || 0.07) * 100
                    );
                    setRetirementAge(selectedPlan.target_retirement_age || 55);
                }
            } catch (err) {
                console.error('计算退休结果失败:', err);
                setError('计算退休结果失败，请重试');
            } finally {
                setCalculating(false);
            }
        }

        if (selectedPlanId) {
            calculateRetirement();
        }
    }, [selectedPlanId, currentAssets, plans]);

    // 创建新的预测
    const handleCreateForecast = async () => {
        if (!selectedPlanId) {
            setError('请选择财务计划');
            return;
        }

        try {
            setCalculating(true);
            // 使用forecastAPI，访问正确的端点
            const result = await forecastAPI.createForecast(
                selectedPlanId,
                currentAssets
            );
            
            console.log('创建预测结果:', result);

            // 更新预测列表
            if (result.forecast) {
                setForecasts([result.forecast, ...forecasts]);
                setRetirementResult({
                    targetRetirementAge: result.forecast.retirement_age,
                    actualRetirementAge: result.forecast.retirement_age,
                    retirementAssets: result.forecast.retirement_assets,
                    monthlyRetirementIncome: result.forecast.monthly_income || 0,
                    readinessScore: result.forecast.readiness_score || 0,
                    yearlyDetails: result.details || [],
                });
            }

            alert('预测已创建/更新');
        } catch (err) {
            console.error('创建预测失败:', err);
            setError('创建预测失败，请重试');
        } finally {
            setCalculating(false);
        }
    };

    // 应用参数变更
    const applyParameterChanges = async () => {
        if (!selectedPlanId) {
            setError('请选择财务计划');
            return;
        }

        try {
            setCalculating(true);

            // 更新计划参数
            await planAPI.updatePlan(selectedPlanId, {
                inflation_rate: inflationRate / 100,
                expected_return_rate: returnRate / 100,
                target_retirement_age: retirementAge,
            });

            // 重新计算
            const result = await forecastAPI.calculateRetirement(
                selectedPlanId,
                currentAssets
            );
            setRetirementResult(result);

            alert('参数已更新，预测已重新计算');
        } catch (err) {
            console.error('应用参数变更失败:', err);
            setError('应用参数变更失败，请重试');
        } finally {
            setCalculating(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto flex min-h-[70vh] items-center justify-center py-8">
                <div className="text-center">
                    <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin" />
                    <p>加载数据中...</p>
                </div>
            </div>
        );
    }

    // 检查是否有财务计划
    if (plans.length === 0) {
        return (
            <div className="container mx-auto py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            退休预测
                        </h1>
                        <p className="text-muted-foreground">
                            基于您的财务数据，预测未来财务状况和退休收入
                        </p>
                    </div>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>创建财务计划</CardTitle>
                        <CardDescription>
                            您需要创建一个财务计划才能进行退休预测
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center pb-6">
                        <p className="mb-4">您还没有创建任何财务计划。请先创建一个财务计划，然后再进行退休预测。</p>
                        <Button 
                            onClick={() => router.push('/plans/new')}
                        >
                            创建财务计划
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // 获取当前选择的计划
    const selectedPlan = plans.find((p) => p.id === selectedPlanId);
    const currentAge = selectedPlan?.current_age || 30;

    // 确保RetirementReadinessCard组件获得有效的属性
    const readinessCardProps = {
        readinessScore: retirementResult?.readinessScore || 0,
        currentAge,
        targetRetirementAge: retirementResult?.targetRetirementAge || 0,
        actualRetirementAge: retirementResult?.actualRetirementAge || 0,
    };

    return (
        <div className="container mx-auto py-8">
            {error && (
                <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-red-600">
                    {error}
                </div>
            )}

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        退休预测
                    </h1>
                    <p className="text-muted-foreground">
                        基于您的财务数据，预测未来财务状况和退休收入
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={handleCreateForecast}
                        disabled={calculating || !selectedPlanId}
                    >
                        {calculating ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <RefreshCw className="mr-2 h-4 w-4" />
                        )}
                        {calculating ? '计算中...' : '更新预测'}
                    </Button>
                    <Button variant="outline">
                        <Share2 className="mr-2 h-4 w-4" />
                        分享
                    </Button>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        导出报告
                    </Button>
                </div>
            </div>

            {/* 选择计划和资产数据 */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>预测设置</CardTitle>
                    <CardDescription>
                        选择要分析的财务计划和当前资产
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <Label htmlFor="plan-select">选择财务计划</Label>
                            <Select
                                value={selectedPlanId}
                                onValueChange={setSelectedPlanId}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="选择财务计划" />
                                </SelectTrigger>
                                <SelectContent>
                                    {plans.length > 0 ? (
                                        plans.map((plan) => (
                                            <SelectItem
                                                key={plan.id}
                                                value={plan.id || ''}
                                            >
                                                {plan.name ||
                                                    `计划 (目标退休年龄: ${plan.target_retirement_age}岁)`}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="none" disabled>
                                            暂无财务计划
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                            {plans.length === 0 && (
                                <div className="mt-2">
                                    <p className="text-muted-foreground text-sm mb-2">
                                        您需要先创建一个财务计划才能进行预测
                                    </p>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => router.push('/plans/new')}
                                    >
                                        创建财务计划
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="current-assets">
                                当前总资产(元)
                            </Label>
                            <div className="relative mt-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 transform">
                                    ¥
                                </span>
                                <input
                                    id="current-assets"
                                    type="number"
                                    value={currentAssets}
                                    onChange={(e) =>
                                        setCurrentAssets(Number(e.target.value))
                                    }
                                    className="w-full rounded-md border py-2 pl-8 pr-4"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-8">
                {/* 预测摘要卡片 */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                                预计退休年龄
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {retirementResult ? (
                                <>
                                    <div className="text-2xl font-bold">
                                        {retirementResult.actualRetirementAge}岁
                                    </div>
                                    <div className="flex items-center">
                                        <div className="mr-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                            <div
                                                className="h-2.5 rounded-full bg-green-600"
                                                style={{
                                                    width: `${retirementResult.readinessScore}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-medium text-green-600">
                                            {retirementResult.readinessScore}%
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground mt-1 text-xs">
                                        {new Date().getFullYear() +
                                            (retirementResult.actualRetirementAge -
                                                currentAge)}
                                        年
                                    </p>
                                </>
                            ) : (
                                <div className="flex h-14 items-center justify-center">
                                    <p className="text-muted-foreground text-sm">
                                        选择计划来查看
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                                预计退休资产
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {retirementResult ? (
                                <>
                                    <div className="text-2xl font-bold">
                                        ¥
                                        {retirementResult.retirementAssets.toLocaleString()}
                                    </div>
                                    <div className="flex items-center">
                                        <div className="mr-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                            <div
                                                className="h-2.5 rounded-full bg-yellow-500"
                                                style={{
                                                    width: `${Math.min(100, (currentAssets / retirementResult.retirementAssets) * 100)}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-medium text-yellow-500">
                                            {Math.round(
                                                (currentAssets /
                                                    retirementResult.retirementAssets) *
                                                    100
                                            )}
                                            %
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground mt-1 text-xs">
                                        当前: ¥{currentAssets.toLocaleString()}
                                    </p>
                                </>
                            ) : (
                                <div className="flex h-14 items-center justify-center">
                                    <p className="text-muted-foreground text-sm">
                                        选择计划来查看
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                                每月退休收入
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {retirementResult ? (
                                <>
                                    <div className="text-2xl font-bold">
                                        ¥
                                        {retirementResult.monthlyRetirementIncome.toLocaleString()}
                                    </div>
                                    <div className="flex items-center">
                                        <div className="mr-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                            <div
                                                className="h-2.5 rounded-full bg-green-600"
                                                style={{
                                                    width: `${retirementResult.readinessScore}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-medium text-green-600">
                                            {retirementResult.readinessScore}%
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground mt-1 text-xs">
                                        退休后每月可用支出
                                    </p>
                                </>
                            ) : (
                                <div className="flex h-14 items-center justify-center">
                                    <p className="text-muted-foreground text-sm">
                                        选择计划来查看
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* 图表和退休准备状态 */}
                {retirementResult && retirementResult.yearlyDetails && (
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <ForecastChart 
                                forecastDetails={retirementResult.yearlyDetails} 
                                retirementAge={retirementResult.actualRetirementAge} 
                            />
                        </div>
                        <div>
                            <RetirementReadinessCard 
                                {...readinessCardProps}
                            />
                        </div>
                    </div>
                )}

                {/* 免责提示 */}
                <Card className="border-amber-200 bg-amber-50">
                    <CardContent className="flex items-start p-4">
                        <AlertTriangle className="mr-4 mt-1 h-6 w-6 flex-shrink-0 text-amber-500" />
                        <div>
                            <h4 className="mb-1 font-medium text-amber-800">
                                预测免责说明
                            </h4>
                            <p className="text-sm text-amber-700">
                                此预测基于您提供的数据和假设参数。实际结果可能因市场波动、通货膨胀、政策变化等因素而有所不同。
                                请定期更新您的财务数据以获得更准确的预测。
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* 情景模拟器 */}
                <Card>
                    <CardHeader>
                        <CardTitle>情景模拟器</CardTitle>
                        <CardDescription>
                            调整参数，查看不同情景下的退休预测结果
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-8">
                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label htmlFor="inflation">
                                            预期年通货膨胀率
                                        </Label>
                                        <span className="text-sm font-medium">
                                            {inflationRate.toFixed(1)}%
                                        </span>
                                    </div>
                                    <Slider
                                        id="inflation"
                                        value={[inflationRate]}
                                        onValueChange={(values) =>
                                            setInflationRate(values[0] || 3)
                                        }
                                        max={10}
                                        step={0.1}
                                        className="w-full"
                                    />
                                    <div className="text-muted-foreground flex justify-between text-xs">
                                        <span>1%</span>
                                        <span>5%</span>
                                        <span>10%</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label htmlFor="return">
                                            预期年投资回报率
                                        </Label>
                                        <span className="text-sm font-medium">
                                            {returnRate.toFixed(1)}%
                                        </span>
                                    </div>
                                    <Slider
                                        id="return"
                                        value={[returnRate]}
                                        onValueChange={(values) =>
                                            setReturnRate(values[0] || 7)
                                        }
                                        max={15}
                                        step={0.1}
                                        className="w-full"
                                    />
                                    <div className="text-muted-foreground flex justify-between text-xs">
                                        <span>1%</span>
                                        <span>8%</span>
                                        <span>15%</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label htmlFor="savings">
                                            每月额外储蓄
                                        </Label>
                                        <span className="text-sm font-medium">
                                            ¥{monthlySavings}
                                        </span>
                                    </div>
                                    <Slider
                                        id="savings"
                                        value={[monthlySavings]}
                                        onValueChange={(values) =>
                                            setMonthlySavings(values[0] || 5000)
                                        }
                                        max={20000}
                                        step={100}
                                        className="w-full"
                                    />
                                    <div className="text-muted-foreground flex justify-between text-xs">
                                        <span>¥0</span>
                                        <span>¥10,000</span>
                                        <span>¥20,000</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label htmlFor="retire-age">
                                            计划退休年龄
                                        </Label>
                                        <span className="text-sm font-medium">
                                            {retirementAge}岁
                                        </span>
                                    </div>
                                    <Slider
                                        id="retire-age"
                                        value={[retirementAge]}
                                        onValueChange={(values) =>
                                            setRetirementAge(values[0] || 55)
                                        }
                                        min={40}
                                        max={70}
                                        step={1}
                                        className="w-full"
                                    />
                                    <div className="text-muted-foreground flex justify-between text-xs">
                                        <span>40岁</span>
                                        <span>55岁</span>
                                        <span>70岁</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                onClick={applyParameterChanges}
                                                disabled={
                                                    calculating ||
                                                    !selectedPlanId
                                                }
                                            >
                                                {calculating ? (
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                ) : null}
                                                应用参数变更
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>更新预测结果以反映参数变更</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
