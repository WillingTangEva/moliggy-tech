'use client';

import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';
import { ArrowRight, LineChart, Wallet, Calendar } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pb-12 pt-24 md:pb-20 md:pt-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="slide-up space-y-6">
            <div className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1 text-sm font-medium">
              科学规划，提前退休
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              智能规划您的 <span className="text-primary">财务自由</span> 未来
            </h1>
            <p className="text-muted-foreground text-xl">
              Fire Life 帮助您整合各类财务资源，预测退休生活，让提前退休不再是梦想。
            </p>
            <div className="flex flex-col space-y-3 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" asChild>
                <Link href="/signup">
                  开始免费使用 <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how-it-works">了解工作原理</Link>
              </Button>
            </div>
          </div>

          <div className="fade-in relative">
            <div className="from-primary/10 to-secondary/10 absolute inset-0 rotate-3 transform rounded-2xl bg-gradient-to-r"></div>
            <div className="bg-muted/50 relative rounded-xl border p-6 shadow-lg backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold">退休财务预测</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Wallet className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">资产整合</h4>
                    <p className="text-muted-foreground text-sm">汇总您的存款、保险和投资</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <LineChart className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">财富增长模拟</h4>
                    <p className="text-muted-foreground text-sm">根据历史数据预测资产增长曲线</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Calendar className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">退休日期计算</h4>
                    <p className="text-muted-foreground text-sm">发现您的理想财务自由时间点</p>
                  </div>
                </div>
                <div className="mt-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">财务自由进度</span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <div className="bg-muted mt-2 h-2 w-full rounded-full">
                    <div className="bg-primary h-2 w-[68%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
