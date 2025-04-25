'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@workspace/ui/lib/utils';
import { UserMenu } from './UserMenu';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@workspace/ui/components/sheet';

const menuItems = [
  { name: '仪表盘', path: '/dashboard' },
  { name: '资产管理', path: '/assets' },
  { name: '财务规划', path: '/plans' },
  { name: '退休预测', path: '/forecast' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 添加滚动检测
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 backdrop-blur-md transition-all duration-300',
        scrolled
          ? 'bg-background/95 shadow-md'
          : 'from-background/95 via-background/98 to-background/95 border-border/40 border-b bg-gradient-to-r'
      )}
    >
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-8">
        <div className="flex items-center">
          {/* 移动端菜单按钮 - 仅在移动设备显示 */}
          <div className="mr-3 md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="text-foreground/80 hover:text-foreground hover:bg-accent/30 inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors"
                  aria-label="打开菜单"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="border-r-primary/20 w-[280px] px-0">
                <div className="py-6">
                  <div className="flex items-center px-6 pb-6">
                    <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                      <span className="from-primary to-primary/80 bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
                        FIRE.Life
                      </span>
                    </Link>
                  </div>
                  <nav className="flex flex-col gap-1">
                    {menuItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={cn(
                          'flex h-12 items-center px-6 text-sm font-medium transition-all duration-200',
                          pathname === item.path
                            ? 'bg-primary/10 text-foreground border-primary border-l-2'
                            : 'text-foreground/60 hover:bg-accent/30 hover:text-foreground hover:border-primary/50 hover:border-l-2'
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* 品牌标识 */}
          <Link href="/" className="group flex items-center space-x-2">
            <span className="from-primary to-primary/80 group-hover:from-primary/80 group-hover:to-primary bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent transition-all duration-300">
              FIRE.Life
            </span>
          </Link>
        </div>

        {/* 桌面端菜单 - 中央对齐 */}
        <div className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2 md:transform">
          <nav className="flex gap-8">
            {menuItems.map((item) => (
              <Link key={item.path} href={item.path} className="group relative">
                <span
                  className={cn(
                    'text-sm font-medium transition-colors duration-200',
                    pathname === item.path ? 'text-foreground' : 'text-foreground/60 hover:text-foreground/90'
                  )}
                >
                  {item.name}
                </span>
                {pathname === item.path && (
                  <span className="bg-primary absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full" />
                )}
                <span className="bg-primary absolute -bottom-1.5 left-0 right-0 h-0.5 scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
        </div>

        {/* 用户菜单 - 完全靠右对齐 */}
        <div className="flex items-center">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
