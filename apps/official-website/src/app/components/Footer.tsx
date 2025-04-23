'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { Large, Small, Muted } from './ui/typography';

export default function Footer() {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-card py-6 border-t">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <Large className="text-foreground">莫力给科技工作室</Large>
            <Muted>让智能驱动数字化转型</Muted>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center items-center gap-4">
            <Small asChild>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                隐私政策
              </Link>
            </Small>
            <Small asChild>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                服务条款
              </Link>
            </Small>
            <Small className="text-muted-foreground">© 2024 莫力给科技. 保留所有权利</Small>
          </motion.div>
        </motion.div>

        <motion.div
          className="h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-4"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>
    </footer>
  );
}
