'use client';

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
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 md:py-28">
      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">财务自由进度</CardTitle>
              <CardDescription>基于当前规划</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">68%</span>
                <span className="text-muted-foreground text-sm">
                  目标: 100%
                </span>
              </div>
              <div className="bg-muted mt-2 h-3 w-full rounded-full">
                <div className="bg-primary h-3 w-[68%] rounded-full"></div>
              </div>
              <div className="mt-2 flex justify-between text-sm">
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
              <Calendar className="text-primary mr-4 h-10 w-10" />
              <div>
                <div className="text-2xl font-bold">2036年</div>
                <div className="text-muted-foreground text-sm">
                  距今还有12年
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">每月被动收入</CardTitle>
              <CardDescription>退休后预计</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center">
              <Wallet className="text-primary mr-4 h-10 w-10" />
              <div>
                <div className="text-2xl font-bold">¥12,500</div>
                <div className="text-muted-foreground text-sm">
                  已达到目标的78%
                </div>
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
              <div className="flex flex-col items-center">
                <PieChart className="text-muted-foreground/50 h-40 w-40" />
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="bg-primary mr-2 h-3 w-3 rounded-full"></div>
                    <span className="text-sm">股票 (45%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-secondary mr-2 h-3 w-3 rounded-full"></div>
                    <span className="text-sm">债券 (25%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-destructive mr-2 h-3 w-3 rounded-full"></div>
                    <span className="text-sm">现金 (15%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-muted-foreground mr-2 h-3 w-3 rounded-full"></div>
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
                <TrendingUp className="text-muted-foreground/50 h-40 w-40" />
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm">起始</span>
                    <span className="text-sm font-medium">¥1,380,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">当前</span>
                    <span className="text-sm font-medium">¥1,650,000</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm">增长</span>
                    <span className="text-primary text-sm font-medium">
                      +19.6%
                    </span>
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
                  <div className="bg-primary/10 text-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">保险续费提醒</div>
                    <div className="text-muted-foreground text-sm">
                      您的年金保险将在30天后需要续费
                    </div>
                  </div>
                  <div className="text-muted-foreground ml-auto text-sm">
                    2023-05-15
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-secondary/10 text-secondary mr-3 flex h-8 w-8 items-center justify-center rounded-full">
                    <Wallet className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">定期存款到期</div>
                    <div className="text-muted-foreground text-sm">
                      您的¥50,000定期存款将在15天后到期
                    </div>
                  </div>
                  <div className="text-muted-foreground ml-auto text-sm">
                    2023-05-30
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
