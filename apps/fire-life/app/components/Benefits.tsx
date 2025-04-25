'use client';

import { Card, CardContent } from '@workspace/ui/components/card';
import { CalculatorIcon, PiggyBank, TrendingUp, ShieldCheck } from 'lucide-react';

const Benefits = () => {
  return (
    <section className="bg-muted/30 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">为什么选择 FIRE.Life</h2>
          <p className="text-muted-foreground text-lg">
            我们提供全面的退休规划工具，帮助您实现财务自由和提前退休的目标
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none shadow-md transition-shadow hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <CalculatorIcon className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">精准预测</h3>
              <p className="text-muted-foreground">基于您的财务数据和市场趋势，提供精准的退休财务预测</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md transition-shadow hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <TrendingUp className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">动态调整</h3>
              <p className="text-muted-foreground">根据实际情况实时调整规划，应对市场变化和人生转折</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md transition-shadow hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <PiggyBank className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">全面规划</h3>
              <p className="text-muted-foreground">整合各类资产、保险和投资，全方位规划退休生活</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md transition-shadow hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <ShieldCheck className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">安全可靠</h3>
              <p className="text-muted-foreground">严格保护您的财务数据，提供安全可靠的规划服务</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
