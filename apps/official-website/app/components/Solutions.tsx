'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

// UI 组件导入
import { Card, CardContent } from '@workspace/ui/components/card';
import { H2, H3, P, Muted } from '@workspace/ui/components/typography';

export default function Solutions() {
  const solutions = [
    {
      title: '数字化转型咨询',
      description: '针对您的业务需求，提供详尽的数字化战略规划与实施路径',
      icon: '/icons/consulting.svg',
    },
    {
      title: '企业级应用开发',
      description: '基于最新技术打造定制化企业应用，提升业务效率',
      icon: '/icons/development.svg',
    },
    {
      title: 'AI解决方案集成',
      description: '将人工智能技术融入您的业务流程，实现智能化决策与运营',
      icon: '/icons/ai.svg',
    },
    {
      title: 'DevOps实践指导',
      description: '建立高效的开发运维一体化流程，加速产品迭代与交付',
      icon: '/icons/devops.svg',
    },
    {
      title: '云端架构设计',
      description: '设计弹性可扩展的云架构，降低成本同时提高系统可靠性',
      icon: '/icons/cloud.svg',
    },
    {
      title: '遗留系统重构',
      description: '为传统系统注入新活力，平稳过渡到现代化技术栈',
      icon: '/icons/legacy.svg',
    },
  ];

  // 动画变量
  const animations = {
    title: {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    },
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 },
      },
    },
    card: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      },
    },
  };

  return (
    <section id="solutions" className="py-20 bg-background relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={animations.title}
        >
          <H2 className="text-3xl md:text-4xl font-bold">我们的解决方案</H2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full"></div>
          <Muted className="mt-6 max-w-2xl mx-auto text-foreground/70">为企业提供从咨询到实施的全方位数字化转型服务</Muted>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6 md:gap-8"
          variants={animations.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {solutions.map((item, index) => (
            <motion.div key={index} variants={animations.card} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
              <Card className="h-full border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <motion.div
                    className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                      transition: { duration: 0.3, type: 'spring' },
                    }}
                  >
                    <div className="w-8 h-8 relative">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        className="object-contain filter brightness-0 invert"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </motion.div>

                  <div className="text-center md:text-left">
                    <H3 className="mb-3 text-xl font-semibold group-hover:text-primary transition-colors">{item.title}</H3>
                    <P className="text-muted-foreground text-sm">{item.description}</P>
                  </div>

                  <motion.div
                    className="mt-4 h-1 w-12 bg-primary/20 rounded-full mx-auto md:mx-0"
                    whileHover={{ width: '50%', backgroundColor: 'var(--primary)' }}
                    transition={{ duration: 0.3 }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
