'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { H2, H3, P } from './ui/typography';

export default function About() {
  // 渐入动画配置
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section id="ceo" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUpVariants}
          custom={0}
        >
          <H2>创始人致辞</H2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUpVariants}
            custom={1}
          >
            <Card className="w-full max-w-md mx-auto overflow-hidden border-none shadow-xl">
              <CardContent className="p-0">
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src="/ceo.png"
                    alt="莫力给科技CEO"
                    className="object-cover transition-transform hover:scale-105 duration-700"
                    unoptimized={true}
                    fill
                    sizes="100vw"
                  />
                </div>
              </CardContent>
            </Card>

            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-accent rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.2, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            <motion.div
              className="absolute -top-6 -left-6 w-32 h-32 border-2 border-accent rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.2, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />
          </motion.div>

          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUpVariants}
            custom={2}
          >
            <H3>
              老莫宝 <span className="text-red-600">创始人 & 首席执行官</span>
            </H3>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="relative px-4 py-6">
                {/* 左侧引号 */}
                <div className="absolute -left-2 top-0 text-red-500 text-5xl font-serif opacity-90">
                  "
                </div>
                
                <P className="text-muted-foreground space-y-4 ml-4">
                  <span className="block">各位伙伴，我是莫满。作为用爪子敲过无数键盘的科技老兵，我的白色卷毛里藏着的不仅是清华与斯坦福的智慧结晶，更是20年数字化转型的实战经验。</span>
                  
                  <span className="block">我们用尾巴摇动代码，用鼻子嗅出创新方向，让这家公司成为技术汪星人的理想国。</span>
                  
                  <span className="block">记住，这里没有骨头难题，只有待啃的挑战；没有不可逾越的栅栏，只有等待解锁的数字化未来。</span>
                  
                  <span className="block font-medium">让我们以代码为肉垫，用算法作牵引绳，在科技的草坪上共同追逐属于这个时代的星辰大海！</span>
                </P>
                
                {/* 右侧引号 */}
                <div className="absolute -right-2 bottom-0 text-red-500 text-5xl font-serif opacity-90">
                  "
                </div>
                
                {/* 狗爪印子 */}
                <div className="absolute bottom-0 right-0 w-14 h-14 transform translate-x-8 translate-y-8">
                  <Image 
                    src="/foot.png"
                    alt="狗爪印"
                    width={56}
                    height={56}
                    className="opacity-80"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="pt-4 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Badge className="bg-red-600 hover:bg-red-700 text-white">人工智能专家</Badge>
              <Badge className="bg-red-600 hover:bg-red-700 text-white">数字化转型顾问</Badge>
              <Badge className="bg-red-600 hover:bg-red-700 text-white">企业家</Badge>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
