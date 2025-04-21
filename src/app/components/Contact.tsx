'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { H2, H4, P, Muted, Small } from './ui/typography';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    type: '',
    message: '',
    privacy: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, privacy: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // 这里添加提交表单逻辑
  };

  // 动画效果
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const formFieldVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <H2>联系我们</H2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
          <Muted className="mt-4 max-w-2xl mx-auto">无论您有任何问题或需求，我们的团队随时准备为您提供帮助</Muted>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={itemVariants}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">发送消息</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={formFieldVariants}>
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        姓名 <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="请输入您的姓名"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        电话 <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="请输入您的联系电话"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={formFieldVariants}>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        电子邮箱 <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="请输入您的电子邮箱"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">公司/组织</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="请输入您的公司或组织名称"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                  </motion.div>

                  <motion.div className="space-y-2" variants={formFieldVariants}>
                    <Label htmlFor="type">需求类型</Label>
                    <Select value={formData.type} onValueChange={handleSelectChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择您的需求类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software">软件开发</SelectItem>
                        <SelectItem value="consulting">技术咨询</SelectItem>
                        <SelectItem value="integration">系统集成</SelectItem>
                        <SelectItem value="other">其他服务</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div className="space-y-2" variants={formFieldVariants}>
                    <Label htmlFor="message">
                      需求描述 <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="请详细描述您的需求或问题"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="h-32"
                    />
                  </motion.div>

                  <motion.div className="flex items-center space-x-2" variants={formFieldVariants}>
                    <Checkbox id="privacy" checked={formData.privacy} onCheckedChange={handleCheckboxChange} />
                    <Small className="text-muted-foreground cursor-pointer" asChild>
                      <label htmlFor="privacy">
                        我同意根据
                        <a href="#" className="text-primary hover:underline">
                          隐私政策
                        </a>
                        处理我的个人信息
                      </label>
                    </Small>
                  </motion.div>

                  <motion.div variants={formFieldVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" className="rounded-full">
                      提交信息
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="shadow-lg h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">联系方式</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <H4 className="text-primary mb-2">公司地址</H4>
                  <P className="text-muted-foreground">上海市浦东新区</P>
                </div>

                <div>
                  <H4 className="text-primary mb-2">联系电话</H4>
                  <P className="text-muted-foreground">+86 021-1234 5678</P>
                </div>

                <div>
                  <H4 className="text-primary mb-2">电子邮箱</H4>
                  <P className="text-muted-foreground">info@moliggy-tech.com</P>
                </div>

                <div>
                  <H4 className="text-primary mb-2">服务时间</H4>
                  <P className="text-muted-foreground">周一至周五: 09:00 - 18:00</P>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
