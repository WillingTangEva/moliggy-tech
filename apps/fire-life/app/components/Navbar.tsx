'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@workspace/ui/components/theme-toggle';
import { Button } from '@workspace/ui/components/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl text-primary">FIRE.Life</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">
            首页
          </Link>
          <Link href="/dashboard" className="text-foreground/80 hover:text-primary transition-colors">
            仪表盘
          </Link>
          <Link href="/plan" className="text-foreground/80 hover:text-primary transition-colors">
            规划工具
          </Link>
          <Link href="/resources" className="text-foreground/80 hover:text-primary transition-colors">
            资源中心
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">登录</Link>
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/signup">注册</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="py-2 text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </Link>
            <Link
              href="/dashboard"
              className="py-2 text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              仪表盘
            </Link>
            <Link
              href="/plan"
              className="py-2 text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              规划工具
            </Link>
            <Link
              href="/resources"
              className="py-2 text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              资源中心
            </Link>
            <div className="flex space-x-3 pt-2">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link href="/login">登录</Link>
              </Button>
              <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90" asChild>
                <Link href="/signup">注册</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
