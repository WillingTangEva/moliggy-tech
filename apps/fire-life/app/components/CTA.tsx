'use client';

import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="bg-primary/5 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative mx-auto max-w-5xl">
          <div className="bg-primary/10 absolute -left-12 -top-12 h-40 w-40 rounded-full opacity-70 blur-3xl" />
          <div className="bg-primary/10 absolute -bottom-12 -right-12 h-40 w-40 rounded-full opacity-70 blur-3xl" />

          <div className="from-background to-muted/50 relative rounded-xl border bg-gradient-to-br p-8 shadow-lg backdrop-blur-sm md:p-12">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">开始您的财务自由之旅</h2>
              <p className="text-muted-foreground text-lg">
                加入成千上万已经在 FIRE.Life 平台上规划退休生活的用户。现在注册，获得免费 14 天全功能试用。
              </p>
            </div>

            <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/signup">
                  免费开始使用 <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo">预约演示</Link>
              </Button>
            </div>

            <div className="text-muted-foreground mt-8 text-center text-sm">
              <p>无需信用卡 · 无隐藏费用 · 随时取消</p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t pt-8 md:grid-cols-4 md:gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold">3,500+</div>
                <div className="text-muted-foreground text-sm">成功实现提前退休</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">¥850M+</div>
                <div className="text-muted-foreground text-sm">已规划的退休资金</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-muted-foreground text-sm">用户满意度</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">45%</div>
                <div className="text-muted-foreground text-sm">平均退休加速率</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
