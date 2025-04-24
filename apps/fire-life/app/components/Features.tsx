'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@workspace/ui/components/tabs';
import { BarChart2, LineChart, PieChart, TrendingUp } from 'lucide-react';

const Features = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">强大的退休规划工具</h2>
          <p className="text-muted-foreground text-lg">
            FIRE.Life 提供全面的工具集，帮助您规划和优化退休生活
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <TabsList className="bg-muted/50 flex h-auto flex-col space-y-1 p-1 md:w-64">
              <TabsTrigger
                value="dashboard"
                className="h-auto w-full justify-start gap-2 px-4 py-3 text-left data-[state=active]:shadow-sm"
              >
                <BarChart2 className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">个性化仪表盘</div>
                  <div className="text-muted-foreground text-xs">
                    一目了然的财务概览
                  </div>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="planner"
                className="h-auto w-full justify-start gap-2 px-4 py-3 text-left data-[state=active]:shadow-sm"
              >
                <LineChart className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">退休规划创建</div>
                  <div className="text-muted-foreground text-xs">
                    定制专属计划
                  </div>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="projection"
                className="h-auto w-full justify-start gap-2 px-4 py-3 text-left data-[state=active]:shadow-sm"
              >
                <TrendingUp className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">财务预测</div>
                  <div className="text-muted-foreground text-xs">
                    动态模拟未来财务
                  </div>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="h-auto w-full justify-start gap-2 px-4 py-3 text-left data-[state=active]:shadow-sm"
              >
                <PieChart className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">智能建议</div>
                  <div className="text-muted-foreground text-xs">
                    优化资产配置策略
                  </div>
                </div>
              </TabsTrigger>
            </TabsList>

            <div className="w-full flex-1">
              <TabsContent value="dashboard" className="mt-0">
                <Card className="overflow-hidden border-none shadow-lg">
                  <CardHeader className="pb-0">
                    <CardTitle>个性化仪表盘</CardTitle>
                    <CardDescription>
                      一目了然查看您的财务健康状况与退休进展
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-6">
                    <div className="bg-muted/20 relative aspect-video overflow-hidden rounded-lg border">
                      <Image
                        src="/images/dashboard-preview.jpg"
                        alt="仪表盘预览"
                        fill
                        className="object-cover"
                      />
                      <div className="from-background/80 to-background/20 absolute inset-0 flex items-end bg-gradient-to-t p-6">
                        <div className="text-white">
                          <p className="text-lg font-medium">财务一览无余</p>
                          <p className="text-sm opacity-90">
                            实时追踪您的资产、收入与支出
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="mb-1 font-medium">净资产跟踪</h4>
                        <p className="text-muted-foreground text-sm">
                          监控您的净资产增长趋势
                        </p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="mb-1 font-medium">退休进度计算</h4>
                        <p className="text-muted-foreground text-sm">
                          查看距离财务自由的进度百分比
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="planner" className="mt-0">
                <Card className="overflow-hidden border-none shadow-lg">
                  <CardHeader className="pb-0">
                    <CardTitle>退休规划创建</CardTitle>
                    <CardDescription>
                      定制专属于您的退休计划，考虑各种因素
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-6">
                    <div className="bg-muted/20 relative aspect-video overflow-hidden rounded-lg border">
                      <Image
                        src="/images/planner-preview.jpg"
                        alt="规划创建器预览"
                        fill
                        className="object-cover"
                      />
                      <div className="from-background/80 to-background/20 absolute inset-0 flex items-end bg-gradient-to-t p-6">
                        <div className="text-white">
                          <p className="text-lg font-medium">全面规划工具</p>
                          <p className="text-sm opacity-90">
                            考虑收入、支出、投资和通胀等各种因素
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="mb-1 font-medium">资产配置优化</h4>
                        <p className="text-muted-foreground text-sm">
                          优化您的投资组合以实现目标
                        </p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="mb-1 font-medium">多场景规划</h4>
                        <p className="text-muted-foreground text-sm">
                          创建和比较不同的退休场景
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projection" className="mt-0">
                <Card className="overflow-hidden border-none shadow-lg">
                  <CardHeader className="pb-0">
                    <CardTitle>财务预测</CardTitle>
                    <CardDescription>
                      动态模拟您的财务未来，助您做出明智决策
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-6">
                    <div className="bg-muted/20 relative aspect-video overflow-hidden rounded-lg border">
                      <Image
                        src="/images/projection-preview.jpg"
                        alt="财务预测预览"
                        fill
                        className="object-cover"
                      />
                      <div className="from-background/80 to-background/20 absolute inset-0 flex items-end bg-gradient-to-t p-6">
                        <div className="text-white">
                          <p className="text-lg font-medium">预见财务未来</p>
                          <p className="text-sm opacity-90">
                            通过先进模型预测您的财务发展轨迹
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="mb-1 font-medium">蒙特卡洛模拟</h4>
                        <p className="text-muted-foreground text-sm">
                          分析各种市场情景下的退休成功率
                        </p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="mb-1 font-medium">互动式图表</h4>
                        <p className="text-muted-foreground text-sm">
                          调整参数并实时查看影响
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="mt-0">
                <Card className="overflow-hidden border-none shadow-lg">
                  <CardHeader className="pb-0">
                    <CardTitle>智能建议</CardTitle>
                    <CardDescription>
                      基于您的情况提供个性化财务优化建议
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-6">
                    <div className="bg-muted/20 relative aspect-video overflow-hidden rounded-lg border">
                      <Image
                        src="/images/recommendations-preview.jpg"
                        alt="智能建议预览"
                        fill
                        className="object-cover"
                      />
                      <div className="from-background/80 to-background/20 absolute inset-0 flex items-end bg-gradient-to-t p-6">
                        <div className="text-white">
                          <p className="text-lg font-medium">数据驱动的建议</p>
                          <p className="text-sm opacity-90">
                            获取针对性的财务改进策略
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="mb-1 font-medium">税务优化</h4>
                        <p className="text-muted-foreground text-sm">
                          提供合法节税策略建议
                        </p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="mb-1 font-medium">支出分析</h4>
                        <p className="text-muted-foreground text-sm">
                          找出节约机会，延长退休资金寿命
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default Features;
