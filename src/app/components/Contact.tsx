"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    type: "",
    message: "",
    privacy: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, type: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, privacy: checked }));
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
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const formFieldVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="contact" className="py-20 bg-blue-langlan text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">联系我们</h2>
          <div className="h-1 w-20 bg-blue-caie mx-auto mt-4"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            无论您有任何问题或需求，我们的团队随时准备为您提供帮助
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-blue-langlan-dark border-blue-caie-30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">发送消息</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={formFieldVariants}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        姓名 <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="请输入您的姓名"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-blue-langlan border-blue-caie-50 focus:border-blue-caie text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">
                        电话 <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="请输入您的联系电话"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="bg-blue-langlan border-blue-caie-50 focus:border-blue-caie text-white"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={formFieldVariants}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        电子邮箱 <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="请输入您的电子邮箱"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-blue-langlan border-blue-caie-50 focus:border-blue-caie text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-300">
                        公司/组织
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="请输入您的公司或组织名称"
                        value={formData.company}
                        onChange={handleChange}
                        className="bg-blue-langlan border-blue-caie-50 focus:border-blue-caie text-white"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div className="space-y-2" variants={formFieldVariants}>
                    <Label htmlFor="type" className="text-gray-300">
                      需求类型
                    </Label>
                    <Select value={formData.type} onValueChange={handleSelectChange}>
                      <SelectTrigger className="bg-blue-langlan border-blue-caie-50 focus:border-blue-caie text-white">
                        <SelectValue placeholder="请选择您的需求类型" />
                      </SelectTrigger>
                      <SelectContent className="bg-blue-langlan-dark text-white">
                        <SelectItem value="software">软件开发</SelectItem>
                        <SelectItem value="consulting">技术咨询</SelectItem>
                        <SelectItem value="integration">系统集成</SelectItem>
                        <SelectItem value="other">其他服务</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                  
                  <motion.div className="space-y-2" variants={formFieldVariants}>
                    <Label htmlFor="message" className="text-gray-300">
                      需求描述 <span className="text-red-400">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="请详细描述您的需求或问题"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-blue-langlan border-blue-caie-50 focus:border-blue-caie text-white h-32"
                    />
                  </motion.div>
                  
                  <motion.div className="flex items-center space-x-2" variants={formFieldVariants}>
                    <Checkbox 
                      id="privacy" 
                      checked={formData.privacy}
                      onCheckedChange={handleCheckboxChange}
                      className="data-[state=checked]:bg-blue-caie"
                    />
                    <label 
                      htmlFor="privacy" 
                      className="text-sm text-gray-300 cursor-pointer"
                    >
                      我同意根据<a href="#" className="text-blue-caie hover:underline">隐私政策</a>处理我的个人信息
                    </label>
                  </motion.div>
                  
                  <motion.div
                    variants={formFieldVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit"
                      className="bg-blue-caie hover:bg-blue-caie-dark text-white rounded-full"
                    >
                      提交信息
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="bg-blue-langlan-dark border-blue-caie-30 shadow-lg h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">联系方式</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <h4 className="text-lg font-medium text-blue-caie mb-2">公司地址</h4>
                  <p className="text-gray-300">上海市浦东新区</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <h4 className="text-lg font-medium text-blue-caie mb-2">联系电话</h4>
                  <p className="text-gray-300">010-12345678</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <h4 className="text-lg font-medium text-blue-caie mb-2">电子邮箱</h4>
                  <p className="text-gray-300">moliggy@163.com</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <h4 className="text-lg font-medium text-blue-caie mb-2">工作时间</h4>
                  <p className="text-gray-300">周一至周五：9:00 - 18:00</p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
