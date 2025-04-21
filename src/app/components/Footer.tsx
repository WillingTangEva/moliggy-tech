"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span className="text-lg font-bold">莫力给科技工作室</span>
            <span className="text-sm text-gray-400">让智能驱动数字化转型</span>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center items-center gap-4">
            <Link 
              href="/privacy" 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              隐私政策
            </Link>
            <Link 
              href="/terms" 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              服务条款
            </Link>
            <span className="text-sm text-gray-500">© 2024 莫力给科技. 保留所有权利</span>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent mt-4"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>
    </footer>
  );
} 