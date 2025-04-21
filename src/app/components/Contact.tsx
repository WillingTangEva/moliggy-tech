'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

// UI 组件导入
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { H2, H4, P, Muted, Small } from './ui/typography';

type FormData = {
  name: string;
  phone: string;
  email: string;
  company: string;
  type: string;
  message: string;
  privacy: boolean;
  needType: string;
};

type FormFieldProps = {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
};

// 表单字段包装组件
const FormField = ({ label, id, required = false, children }: FormFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor={id}>
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    {children}
  </div>
);

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    company: '',
    type: '',
    message: '',
    privacy: false,
    needType: '',
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

  const handleNeedTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, needType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // 这里添加提交表单逻辑
  };

  // 动画变量
  const animations = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, type: 'spring', stiffness: 300, damping: 24 },
      },
    },
    formField: {
      hidden: { opacity: 0, x: -10 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    },
  };

  const contactInfo = [
    { title: '公司地址', content: '上海市浦东新区', icon: MapPin },
    { title: '联系电话', content: '+86 021-1234 5678', icon: Phone },
    { title: '电子邮箱', content: 'moliggy@163.com', icon: Mail },
    { title: '服务时间', content: '周一至周五: 09:00 - 18:00', icon: Clock },
  ];

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
          variants={animations.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={animations.item}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">发送消息</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={animations.formField}>
                    <FormField label="姓名" id="name" required>
                      <Input
                        id="name"
                        name="name"
                        placeholder="请输入您的姓名"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </FormField>
                    <FormField label="电话" id="phone" required>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="请输入您的联系电话"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </FormField>
                  </motion.div>

                  <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={animations.formField}>
                    <FormField label="电子邮箱" id="email" required>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="请输入您的电子邮箱"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </FormField>
                    <FormField label="公司/组织" id="company">
                      <Input
                        id="company"
                        name="company"
                        placeholder="请输入您的公司或组织名称"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </FormField>
                  </motion.div>

                  <motion.div variants={animations.formField}>
                    <FormField label="需求描述" id="message" required>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            type="button"
                            variant={formData.needType === '功能开发' ? 'default' : 'outline'}
                            className="h-12"
                            onClick={() => handleNeedTypeChange('功能开发')}
                          >
                            功能开发
                          </Button>
                          <Button
                            type="button"
                            variant={formData.needType === '技术咨询' ? 'default' : 'outline'}
                            className="h-12"
                            onClick={() => handleNeedTypeChange('技术咨询')}
                          >
                            技术咨询
                          </Button>
                          <Button
                            type="button"
                            variant={formData.needType === 'Bug修复' ? 'default' : 'outline'}
                            className="h-12"
                            onClick={() => handleNeedTypeChange('Bug修复')}
                          >
                            Bug修复
                          </Button>
                          <Button
                            type="button"
                            variant={formData.needType === '其他问题' ? 'default' : 'outline'}
                            className="h-12"
                            onClick={() => handleNeedTypeChange('其他问题')}
                          >
                            其他问题
                          </Button>
                        </div>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder={`请描述您的${formData.needType || ''}需求或问题`}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="h-32"
                        />
                      </div>
                    </FormField>
                  </motion.div>

                  <motion.div className="flex items-center space-x-2" variants={animations.formField}>
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

                  <motion.div variants={animations.formField} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" className="rounded-full">
                      提交信息
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={animations.item}>
            <Card className="shadow-lg h-full bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">联系方式</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-lg transition-colors hover:bg-accent"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="bg-primary/10 p-3 rounded-full">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <H4 className="font-medium">{item.title}</H4>
                        <P className="text-muted-foreground mt-1">{item.content}</P>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
