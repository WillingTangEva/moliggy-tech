'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import { PlusCircle, TrendingUp, Calendar, Wallet, CreditCard, PieChart } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-24 md:py-28">
      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold">财务仪表盘</h1>
            <p className="text-muted-foreground mt-1">查看和管理您的退休规划</p>
          </div>
          <Button className="mt-4 md:mt-0" asChild>
            <Link href="/plan/new">
              <PlusCircle className="mr-2 h-4 w-4" /> 新建规划
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">财务自由进度</CardTitle>
              <CardDescription>基于当前规划</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">68%</span>
                <span className="text-sm text-muted-foreground">目标: 100%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full mt-2">
                <div className="h-3 bg-primary rounded-full w-[68%]"></div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span>当前: ¥1.6M</span>
                <span>目标: ¥2.5M</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">预计退休时间</CardTitle>
              <CardDescription>基于当前的存款率</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center">
              <Calendar className="h-10 w-10 text-primary mr-4" />
              <div>
                <div className="text-2xl font-bold">2036年</div>
                <div className="text-sm text-muted-foreground">距今还有12年</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">每月被动收入</CardTitle>
              <CardDescription>退休后预计</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center">
              <Wallet className="h-10 w-10 text-primary mr-4" />
              <div>
                <div className="text-2xl font-bold">¥12,500</div>
                <div className="text-sm text-muted-foreground">已达到目标的78%</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>资产配置</CardTitle>
              <CardDescription>您当前的资产分布</CardDescription>
            </CardHeader>
            <CardContent className="flex min-h-[220px] items-center justify-center">
              <div className="flex flex-col items-center">
                <PieChart className="h-40 w-40 text-muted-foreground/50" />
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm">股票 (45%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-secondary mr-2"></div>
                    <span className="text-sm">债券 (25%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-destructive mr-2"></div>
                    <span className="text-sm">现金 (15%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-muted-foreground mr-2"></div>
                    <span className="text-sm">其他 (15%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>财富增长趋势</CardTitle>
              <CardDescription>过去12个月</CardDescription>
            </CardHeader>
            <CardContent className="flex min-h-[220px] items-center justify-center">
              <div className="flex flex-col items-center">
                <TrendingUp className="h-40 w-40 text-muted-foreground/50" />
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">起始</span>
                    <span className="text-sm font-medium">¥1,380,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">当前</span>
                    <span className="text-sm font-medium">¥1,650,000</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm">增长</span>
                    <span className="text-sm font-medium text-primary">+19.6%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>近期提醒</CardTitle>
              <CardDescription>重要财务事件提醒</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">保险续费提醒</div>
                    <div className="text-sm text-muted-foreground">您的年金保险将在30天后需要续费</div>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">2023-05-15</div>
                </div>
                <div className="flex items-start">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-secondary/10 text-secondary mr-3">
                    <Wallet className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">定期存款到期</div>
                    <div className="text-sm text-muted-foreground">您的¥50,000定期存款将在15天后到期</div>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">2023-05-30</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
