'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { H2, H3, P, Muted } from '@workspace/ui/components/typography';

export default function Cases() {
  const [activeFilter, setActiveFilter] = useState('全部案例');

  const cases = [
    {
      title: '某国有银行智能风控系统',
      description: '为客户构建基于AI的实时风险评估系统，将风险识别准确率提升40%，处理速度提升300%',
      industry: '金融行业',
      image: '/cases/finance.jpg',
    },
    {
      title: '医疗集团患者管理平台',
      description: '整合多家医院的患者数据，建立统一的管理平台，优化医疗资源调配效率，缩短患者等待时间53%',
      industry: '医疗健康',
      image: '/cases/healthcare.jpg',
    },
    {
      title: '制造企业智能生产线改造',
      description: '引入IoT和边缘计算技术，实现生产线智能化改造，生产效率提升35%，能源消耗降低28%',
      industry: '制造业',
      image: '/cases/manufacturing.jpg',
    },
  ];

  const filterButtons = ['全部案例', '金融行业', '医疗健康', '制造业', '零售电商'];

  const filteredCases = activeFilter === '全部案例' ? cases : cases.filter((item) => item.industry === activeFilter);

  // 标题动画
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // 筛选按钮动画
  const filterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const filterItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  };

  // 卡片容器动画
  const cardsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  // 卡片动画
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <section id="cases" className="py-20 bg-secondary relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-background to-transparent z-0"></div>
      <div className="absolute -top-60 -right-60 w-96 h-96 bg-accent/5 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={titleVariants}
        >
          <H2 className="text-3xl md:text-4xl font-bold">客户案例</H2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full"></div>
          <Muted className="mt-6 max-w-2xl mx-auto text-foreground/70">我们为各行业领先企业提供专业的数字化解决方案</Muted>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8"
          variants={filterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filterButtons.map((filter) => (
            <motion.div key={filter} variants={filterItemVariants}>
              <Button
                variant={activeFilter === filter ? 'default' : 'outline'}
                className={`rounded-full text-sm md:text-base px-4 py-2 transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'shadow-md' 
                    : 'border-primary/20 hover:border-primary/50 hover:bg-primary/5'
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            className="grid md:grid-cols-3 gap-6 md:gap-8 mt-12 min-h-[500px]"
            key={activeFilter}
            variants={cardsContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredCases.map((item, index) => (
              <motion.div
                key={`${item.industry}-${index}`}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="h-full overflow-hidden border border-border/40 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <div className="h-48 relative overflow-hidden bg-muted/30 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-60"></div>
                    <motion.div
                      className="absolute inset-0 bg-primary/50 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button variant="secondary" className="rounded-full shadow-lg hover:shadow-xl transition-shadow">
                        查看详情
                      </Button>
                    </motion.div>
                  </div>

                  <CardContent className="p-6">
                    <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors">
                      {item.industry}
                    </Badge>
                    <H3 className="mt-3 mb-2 text-xl font-semibold">{item.title}</H3>
                    <P className="text-muted-foreground text-sm mb-4">{item.description}</P>

                    <motion.a
                      href="#"
                      className="text-primary flex items-center hover:text-primary/80 transition-colors text-sm font-medium"
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      查看案例研究 <span className="ml-2">→</span>
                    </motion.a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
