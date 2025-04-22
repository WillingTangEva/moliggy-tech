'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import QrCodeModal from './QrCodeModal';
import { scrollToElement } from '../utils/scrollUtils';
import { cn } from '../utils/cn';
import { H1, Lead } from './ui/typography';

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary">
      <motion.div className="absolute inset-0 z-0" variants={backgroundVariants} initial="hidden" animate="visible">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-primary/5"></div>
      </motion.div>

      <div className="container mx-auto px-4 z-10" style={{ paddingTop: navbarHeight ? `${navbarHeight}px` : '50px' }}>
        <div className="text-center max-w-3xl mx-auto py-12 md:py-20">
          <motion.div variants={titleVariants} initial="hidden" animate="visible">
            <H1 className="mb-6">
              <span className="text-primary">让智能</span>驱动数字化转型
            </H1>
          </motion.div>

          <motion.div variants={descriptionVariants} initial="hidden" animate="visible">
            <Lead className="mb-10">专业软件咨询与定制开发服务商</Lead>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
            <Button onClick={() => setIsQrCodeModalOpen(true)} className="rounded-full text-base" size="lg">
              立即咨询 <span className="ml-2">→</span>
            </Button>

            <Button
              onClick={() => scrollToElement('cases')}
              variant="outline"
              className="rounded-full text-base"
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
