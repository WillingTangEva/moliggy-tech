'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@workspace/ui/components/accordion';

const Footer = () => {
  return (
    <footer className="bg-muted/10 border-t">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="/logo.svg"
                alt="FIRE.Life Logo"
                width={140}
                height={40}
                className="dark:invert"
              />
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              FIRE.Life是领先的退休规划平台，帮助用户制定科学的财务自由计划，实现提前退休的目标。
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://facebook.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://youtube.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* 桌面版导航 */}
          <div className="hidden lg:block">
            <h3 className="mb-4 text-lg font-medium">产品</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/features"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  功能介绍
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  价格
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  用户评价
                </Link>
              </li>
              <li>
                <Link
                  href="/integrations"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  集成服务
                </Link>
              </li>
              <li>
                <Link
                  href="/enterprise"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  企业解决方案
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden lg:block">
            <h3 className="mb-4 text-lg font-medium">资源</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  博客
                </Link>
              </li>
              <li>
                <Link
                  href="/academy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FIRE学院
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  退休计算器
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  指南
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  常见问题
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden lg:block">
            <h3 className="mb-4 text-lg font-medium">公司</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  关于我们
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  加入我们
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  联系我们
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  新闻中心
                </Link>
              </li>
              <li>
                <Link
                  href="/investors"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  投资者关系
                </Link>
              </li>
            </ul>
          </div>

          {/* 移动版手风琴导航 */}
          <div className="md:col-span-2 lg:hidden">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="product">
                <AccordionTrigger className="text-lg">产品</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 py-2">
                    <li>
                      <Link
                        href="/features"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        功能介绍
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/pricing"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        价格
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/testimonials"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        用户评价
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/integrations"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        集成服务
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/enterprise"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        企业解决方案
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="resources">
                <AccordionTrigger className="text-lg">资源</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 py-2">
                    <li>
                      <Link
                        href="/blog"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        博客
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/academy"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        FIRE学院
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/calculator"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        退休计算器
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/guides"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        指南
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/faq"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        常见问题
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="company">
                <AccordionTrigger className="text-lg">公司</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 py-2">
                    <li>
                      <Link
                        href="/about"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        关于我们
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/careers"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        加入我们
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        联系我们
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/press"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        新闻中心
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/investors"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        投资者关系
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <div className="text-muted-foreground mb-4 text-sm md:mb-0">
            © {new Date().getFullYear()} FIRE.Life 保留所有权利
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              服务条款
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              隐私政策
            </Link>
            <Link
              href="/cookies"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Cookie 政策
            </Link>
            <Link
              href="/accessibility"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              可访问性
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
