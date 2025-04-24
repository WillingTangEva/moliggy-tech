'use client';

import { ForecastDetail } from '../lib/types';
import { useState, useEffect, useMemo } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@workspace/ui/components/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@workspace/ui/components/select';
import { Label } from '@workspace/ui/components/label';
import React from 'react';

// 引入图表库
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
    AreaChart,
} from 'recharts';

interface ForecastChartProps {
    forecastDetails: ForecastDetail[];
    retirementAge: number;
}

// 格式化大数字（添加千位分隔符）
const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY',
        maximumFractionDigits: 0,
    }).format(value);
};

// 自定义退休标记组件
const RetirementMarker = (props: any) => {
    const { cx, cy, payload, retirementAge } = props;
    if (payload.age === retirementAge) {
        return (
            <g>
                <line
                    x1={cx}
                    y1={0}
                    x2={cx}
                    y2="100%"
                    stroke="#f43f5e"
                    strokeWidth={1}
                    strokeDasharray="5 5"
                />
                <text
                    x={cx + 5}
                    y={20}
                    fill="#f43f5e"
                    fontSize={12}
                    textAnchor="start"
                >
                    退休年龄
                </text>
            </g>
        );
    }
    return null;
};

export default function ForecastChart({
    forecastDetails,
    retirementAge,
}: ForecastChartProps) {
    // 图表类型选择
    const [chartType, setChartType] = useState<'assets' | 'income-expenses'>(
        'assets'
    );

    // 处理数据，将退休年龄标记出来
    const chartData = useMemo(() => {
        return forecastDetails.map((detail) => ({
            ...detail,
            // 添加退休标记
            isRetirementYear: detail.age === retirementAge,
            // 格式化标签
            ageLabel: `${detail.age}岁`,
            formattedAssets: formatCurrency(detail.total_assets),
            formattedIncome: formatCurrency(detail.income || 0),
            formattedExpenses: formatCurrency(detail.expenses || 0),
            // 确保以下字段在图表中可用
            annual_income: detail.income || 0,
            annual_expenses: detail.expenses || 0,
        }));
    }, [forecastDetails, retirementAge]);

    // 找到退休那一年的索引
    const retirementIndex = chartData.findIndex(
        (data) => data.age === retirementAge
    );

    // 专门用于退休标记的自定义dot渲染函数
    const renderRetirementDot = (props: any) => {
        const { cx, cy, payload } = props;
        if (payload.age === retirementAge) {
            return (
                <svg x={cx - 10} y={0} width={20} height={20}>
                    <line
                        x1={10}
                        y1={0}
                        x2={10}
                        y2="100%"
                        stroke="#f43f5e"
                        strokeWidth={1}
                        strokeDasharray="5 5"
                    />
                </svg>
            );
        }
        return null;
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>财务趋势预测</CardTitle>
                        <CardDescription>
                            查看您的资产、收入和支出随时间的变化趋势
                        </CardDescription>
                    </div>
                    <div className="flex items-center">
                        <Label htmlFor="chart-type" className="mr-2">
                            图表类型
                        </Label>
                        <Select
                            value={chartType}
                            onValueChange={(value) =>
                                setChartType(
                                    value as 'assets' | 'income-expenses'
                                )
                            }
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="选择图表类型" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="assets">资产趋势</SelectItem>
                                <SelectItem value="income-expenses">
                                    收入与支出
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] w-full">
                    {chartType === 'assets' ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient
                                        id="colorAssets"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#0ea5e9"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#0ea5e9"
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="ageLabel"
                                    tick={{ fontSize: 12 }}
                                    tickMargin={10}
                                />
                                <YAxis
                                    tickFormatter={(value) =>
                                        `¥${(value / 10000).toFixed(0)}万`
                                    }
                                    tick={{ fontSize: 12 }}
                                />
                                <Tooltip
                                    formatter={(value: any) => [
                                        formatCurrency(value),
                                        '总资产',
                                    ]}
                                    labelFormatter={(label) => `年龄: ${label}`}
                                />
                                <Legend />

                                {/* 添加退休标记线 */}
                                {retirementIndex >= 0 && (
                                    <Line
                                        type="monotone"
                                        dataKey="age"
                                        stroke="none"
                                        activeDot={false}
                                        dot={false}
                                    />
                                )}

                                {/* 在图表上方添加退休年龄标记 */}
                                <text
                                    x={
                                        retirementIndex > 0
                                            ? retirementIndex *
                                                  (100 / chartData.length) +
                                              5
                                            : 5
                                    }
                                    y={20}
                                    fill="#f43f5e"
                                    fontSize={12}
                                    textAnchor="start"
                                >
                                    退休年龄
                                </text>

                                {/* 添加退休年龄垂直线 */}
                                {retirementIndex >= 0 && (
                                    <Line
                                        type="monotone"
                                        dataKey={() => null}
                                        stroke="#f43f5e"
                                        strokeDasharray="5 5"
                                        activeDot={false}
                                        dot={false}
                                        strokeWidth={1}
                                        legendType="none"
                                    />
                                )}

                                <Area
                                    type="monotone"
                                    dataKey="total_assets"
                                    stroke="#0ea5e9"
                                    fillOpacity={1}
                                    fill="url(#colorAssets)"
                                    name="总资产"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="ageLabel"
                                    tick={{ fontSize: 12 }}
                                    tickMargin={10}
                                />
                                <YAxis
                                    tickFormatter={(value) =>
                                        `¥${(value / 10000).toFixed(0)}万`
                                    }
                                    tick={{ fontSize: 12 }}
                                />
                                <Tooltip
                                    formatter={(value: any, name: any) => {
                                        const label =
                                            name === 'annual_income'
                                                ? '年收入'
                                                : '年支出';
                                        return [formatCurrency(value), label];
                                    }}
                                    labelFormatter={(label) => `年龄: ${label}`}
                                />
                                <Legend />

                                {/* 添加退休年龄垂直线 */}
                                {retirementIndex >= 0 && (
                                    <Line
                                        type="monotone"
                                        dataKey={() => null}
                                        stroke="#f43f5e"
                                        strokeDasharray="5 5"
                                        activeDot={false}
                                        dot={false}
                                        strokeWidth={1}
                                        legendType="none"
                                    />
                                )}

                                {/* 在图表上方添加退休年龄标记 */}
                                <text
                                    x={
                                        retirementIndex > 0
                                            ? retirementIndex *
                                                  (100 / chartData.length) +
                                              5
                                            : 5
                                    }
                                    y={20}
                                    fill="#f43f5e"
                                    fontSize={12}
                                    textAnchor="start"
                                >
                                    退休年龄
                                </text>

                                <Line
                                    type="monotone"
                                    dataKey="annual_income"
                                    stroke="#10b981"
                                    name="年收入"
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="annual_expenses"
                                    stroke="#f43f5e"
                                    name="年支出"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
                <div className="text-muted-foreground mt-4 text-center text-sm">
                    <p>
                        提示: 退休年龄（{retirementAge}
                        岁）以红色垂直线标出。图表显示了从当前年龄到100岁的财务预测。
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
