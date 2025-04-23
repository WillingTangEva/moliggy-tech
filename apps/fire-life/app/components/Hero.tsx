'use client'

import { Button } from '@workspace/ui/components/button'
import Link from 'next/link'
import { ArrowRight, LineChart, Wallet, Calendar } from 'lucide-react'

const Hero = () => {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 slide-up">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm">
              科学规划，提前退休
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              智能规划您的 <span className="text-primary">财务自由</span> 未来
            </h1>
            <p className="text-xl text-muted-foreground">
              Fire Life 帮助您整合各类财务资源，预测退休生活，让提前退休不再是梦想。
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  开始免费使用 <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how-it-works">
                  了解工作原理
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl transform rotate-3"></div>
            <div className="relative bg-muted/50 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
              <h3 className="text-lg font-semibold mb-4">退休财务预测</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">资产整合</h4>
                    <p className="text-sm text-muted-foreground">汇总您的存款、保险和投资</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <LineChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">财富增长模拟</h4>
                    <p className="text-sm text-muted-foreground">根据历史数据预测资产增长曲线</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">退休日期计算</h4>
                    <p className="text-sm text-muted-foreground">发现您的理想财务自由时间点</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">财务自由进度</span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full mt-2">
                    <div className="h-2 bg-primary rounded-full w-[68%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 