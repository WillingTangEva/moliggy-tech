"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

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
        ease: "easeOut" 
      }
    })
  };

  return (
    <section id="ceo" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUpVariants}
          custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">创始人致辞</h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
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
                    layout="fill"
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
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            custom={2}
          >
            <h3 className="text-2xl font-bold text-foreground">
              老莫宝 <span className="text-primary">创始人 & 首席执行官</span>
            </h3>
            
            <motion.p 
              className="text-muted-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              "各位伙伴，我是莫满。作为用爪子敲过无数键盘的科技老兵，我的白色卷毛里藏着的不仅是清华与斯坦福的智慧结晶，更是20年数字化转型的实战经验。我们用尾巴摇动代码，用鼻子嗅出创新方向，让这家公司成为技术汪星人的理想国。记住，这里没有骨头难题，只有待啃的挑战；没有不可逾越的栅栏，只有等待解锁的数字化未来。让我们以代码为肉垫，用算法作牵引绳，在科技的草坪上共同追逐属于这个时代的星辰大海！"
            </motion.p>
            
            <motion.div 
              className="pt-4 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 px-4 py-1 text-sm rounded-full">
                人工智能专家
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 px-4 py-1 text-sm rounded-full">
                数字化转型顾问
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 px-4 py-1 text-sm rounded-full">
                企业家
              </Badge>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
