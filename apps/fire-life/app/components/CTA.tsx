'use client'

import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { ArrowRight } from "lucide-react"

const CTA = () => {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-70" />
          <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-70" />
          
          <div className="relative bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm border rounded-xl p-8 md:p-12 shadow-lg">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">开始您的财务自由之旅</h2>
              <p className="text-lg text-muted-foreground">
                加入成千上万已经在 FIRE.Life 平台上规划退休生活的用户。现在注册，获得免费 14 天全功能试用。
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/signup">
                  免费开始使用 <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo">
                  预约演示
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>无需信用卡 · 无隐藏费用 · 随时取消</p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 border-t">
              <div className="text-center">
                <div className="font-bold text-2xl">3,500+</div>
                <div className="text-sm text-muted-foreground">成功实现提前退休</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl">¥850M+</div>
                <div className="text-sm text-muted-foreground">已规划的退休资金</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl">98%</div>
                <div className="text-sm text-muted-foreground">用户满意度</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl">45%</div>
                <div className="text-sm text-muted-foreground">平均退休加速率</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA 