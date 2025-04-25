'use client';

import { Card, CardContent } from '@workspace/ui/components/card';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@workspace/ui/components/carousel';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: '李明',
    avatar: '/avatars/user-1.jpg',
    role: '软件工程师',
    age: 32,
    content:
      '使用FIRE.Life后，我对自己的退休计划有了清晰的认识。平台提供的财务预测工具非常精准，帮助我制定了合理的储蓄和投资策略。现在我对未来的财务安全更有信心了。',
    rating: 5,
  },
  {
    id: 2,
    name: '王芳',
    avatar: '/avatars/user-2.jpg',
    role: '市场经理',
    age: 38,
    content:
      '作为一个家庭主要经济来源，我一直担心退休后的生活质量。FIRE.Life的全面规划功能让我能够考虑到各种因素，包括子女教育和潜在的医疗支出。平台的建议非常实用。',
    rating: 5,
  },
  {
    id: 3,
    name: '张伟',
    avatar: '/avatars/user-3.jpg',
    role: '金融分析师',
    age: 45,
    content:
      '即使作为金融专业人士，我也从FIRE.Life中获益匪浅。平台的数据分析能力和智能建议功能帮助我发现了自己规划中的盲点。我已经向许多朋友推荐了这个平台。',
    rating: 4,
  },
  {
    id: 4,
    name: '刘洋',
    avatar: '/avatars/user-4.jpg',
    role: '教师',
    age: 41,
    content:
      '退休规划一直是我推迟的任务，直到我开始使用FIRE.Life。界面友好，容易上手，最重要的是它把复杂的财务概念解释得非常清楚。现在我每月都会定期查看和调整我的计划。',
    rating: 5,
  },
  {
    id: 5,
    name: '赵梅',
    avatar: '/avatars/user-5.jpg',
    role: '创业者',
    age: 36,
    content:
      '作为一个收入不稳定的创业者，我以为财务规划对我来说太复杂了。FIRE.Life帮助我处理不规则收入，设定合理的储蓄目标，并构建应急资金。现在我对自己的财务未来感到安心多了。',
    rating: 5,
  },
  {
    id: 6,
    name: '陈军',
    avatar: '/avatars/user-6.jpg',
    role: '医生',
    age: 48,
    content:
      'FIRE.Life的税务优化功能为我节省了大量资金。平台考虑到了我特殊的职业情况，提供了针对性的建议。动态调整功能也让我能够根据收入变化及时修改计划。',
    rating: 4,
  },
];

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-primary text-primary' : 'fill-muted text-muted'}`} />
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="bg-muted/20 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">用户心声</h2>
          <p className="text-muted-foreground text-lg">听听我们的用户如何利用FIRE.Life改变他们的退休规划</p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="mx-auto w-full max-w-5xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="basis-full pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="text-muted-foreground text-sm">
                          {testimonial.role}，{testimonial.age}岁
                        </div>
                      </div>
                    </div>
                    <RatingStars rating={testimonial.rating} />
                    <blockquote className="text-muted-foreground mt-4 flex-1">"{testimonial.content}"</blockquote>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex justify-center gap-2">
            <CarouselPrevious className="static relative" />
            <CarouselNext className="static relative" />
          </div>
        </Carousel>

        <div className="mt-16 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            <div className="flex items-center gap-2">
              <div className="text-primary text-4xl font-bold">98%</div>
              <div className="text-left text-sm">
                <div>用户满意度</div>
                <div className="text-muted-foreground">基于用户调查</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-primary text-4xl font-bold">45%</div>
              <div className="text-left text-sm">
                <div>平均退休加速</div>
                <div className="text-muted-foreground">使用一年后</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-primary text-4xl font-bold">10K+</div>
              <div className="text-left text-sm">
                <div>活跃用户</div>
                <div className="text-muted-foreground">并持续增长</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
