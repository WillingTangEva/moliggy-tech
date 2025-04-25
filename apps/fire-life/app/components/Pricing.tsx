'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Switch } from '@workspace/ui/components/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Badge } from '@workspace/ui/components/badge';

const pricingPlans = [
  {
    id: 'basic',
    name: '基础版',
    description: '适合个人入门使用的基础退休计划工具',
    price: {
      monthly: 19.99,
      annually: 199.99,
    },
    features: ['个人退休计划创建', '基本财务预测', '手动数据输入', '每月报告', '基础储蓄分析'],
    cta: '开始试用',
    popular: false,
  },
  {
    id: 'pro',
    name: '专业版',
    description: '提供进阶功能和更深入分析的退休规划解决方案',
    price: {
      monthly: 39.99,
      annually: 399.99,
    },
    features: [
      '所有基础版功能',
      '多场景财务模拟',
      '税务优化建议',
      '投资组合分析',
      '自动数据同步',
      '每周详细报告',
      '退休提前方案',
    ],
    cta: '选择专业版',
    popular: true,
  },
  {
    id: 'family',
    name: '家庭版',
    description: '为全家人提供完整的财务管理和退休规划系统',
    price: {
      monthly: 59.99,
      annually: 599.99,
    },
    features: [
      '所有专业版功能',
      '最多5个家庭成员账户',
      '家庭财务统一管理',
      '子女教育基金规划',
      '家庭保险建议',
      '遗产规划工具',
      '专属财务顾问支持',
    ],
    cta: '选择家庭版',
    popular: false,
  },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly');
  };

  const getDiscount = (monthly: number, annually: number) => {
    const monthlyTotal = monthly * 12;
    const discount = Math.round(((monthlyTotal - annually) / monthlyTotal) * 100);
    return discount;
  };

  return (
    <section className="py-16 md:py-24" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">简单透明的价格计划</h2>
          <p className="text-muted-foreground text-lg">选择最适合您需求的计划，开始您的财务自由之旅</p>

          <div className="mt-8 flex items-center justify-center space-x-2">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              月付
            </span>
            <Switch
              checked={billingCycle === 'annually'}
              onCheckedChange={toggleBillingCycle}
              className="data-[state=checked]:bg-primary"
            />
            <span
              className={`flex items-center gap-2 text-sm ${billingCycle === 'annually' ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              年付
              <Badge variant="outline" className="bg-primary/10 text-primary text-xs font-medium">
                省20%
              </Badge>
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.annually / 12;
            const totalPrice = billingCycle === 'monthly' ? price : plan.price.annually;

            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg' : ''}`}
              >
                {plan.popular && (
                  <Badge className="bg-primary text-primary-foreground absolute -top-3 right-4">最受欢迎</Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">¥{price.toFixed(0)}</span>
                      <span className="text-muted-foreground ml-2 text-sm">/ 月</span>
                    </div>
                    {billingCycle === 'annually' && (
                      <div className="text-muted-foreground mt-1 text-sm">总计 ¥{totalPrice.toFixed(0)} / 年</div>
                    )}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex">
                        <Check className="text-primary mr-2 h-5 w-5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant={plan.popular ? 'default' : 'outline'} className="w-full">
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">所有计划均提供14天无风险试用期，不满意可全额退款。</p>
          <div className="mt-4">
            <Button variant="link">查看功能完整对比</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
