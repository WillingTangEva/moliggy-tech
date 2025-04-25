'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '@workspace/ui/components/button';
import QrCodeModal from './QrCodeModal';
import { scrollToElement } from '../../lib/scrollUtils';
import { H1, Lead } from '@workspace/ui/components/typography';

export default function Hero() {
  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    // 获取导航栏高度
    const navbar = document.querySelector('header');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }

    // 窗口大小变化时重新计算
    const handleResize = () => {
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 标题动画变体
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // 描述动画变体
  const descriptionVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: 'easeOut' },
    },
  };

  // 按钮动画变体
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.4, ease: 'easeOut' },
    },
  };

  // 背景动画效果
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1 },
    },
  };

  return (
    <section className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 z-0" variants={backgroundVariants} initial="hidden" animate="visible">
        <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>
        <div className="from-background via-background to-secondary absolute inset-0 bg-gradient-to-b"></div>
        <div className="bg-primary/5 absolute right-0 top-0 h-2/3 w-2/3 -translate-y-1/4 translate-x-1/4 transform rounded-bl-full blur-3xl"></div>
        <div className="bg-accent/5 absolute bottom-0 left-0 h-1/2 w-1/2 -translate-x-1/4 translate-y-1/4 transform rounded-tr-full blur-3xl"></div>
      </motion.div>

      <div
        className="container z-10 mx-auto px-4"
        style={{
          paddingTop: navbarHeight ? `${navbarHeight}px` : '50px',
        }}
      >
        <div className="mx-auto max-w-3xl py-12 text-center md:py-20">
          <motion.div variants={titleVariants} initial="hidden" animate="visible">
            <H1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              <span className="text-primary">让智能</span>
              驱动数字化转型
            </H1>
          </motion.div>

          <motion.div variants={descriptionVariants} initial="hidden" animate="visible">
            <Lead className="text-foreground/80 mb-10 text-lg md:text-xl">专业软件咨询与定制开发服务商</Lead>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
            <Button
              onClick={() => setIsQrCodeModalOpen(true)}
              className="rounded-full text-base shadow-md transition-shadow hover:shadow-lg"
              size="lg"
            >
              立即咨询 <span className="ml-2">→</span>
            </Button>

            <Button
              onClick={() => scrollToElement('cases')}
              variant="outline"
              className="border-primary/20 hover:bg-primary/5 hover:border-primary/30 rounded-full text-base transition-colors"
              size="lg"
            >
              查看客户案例 <span className="ml-2">→</span>
            </Button>
          </motion.div>
        </div>
      </div>

      <QrCodeModal isOpen={isQrCodeModalOpen} onClose={() => setIsQrCodeModalOpen(false)} />
    </section>
  );
}
