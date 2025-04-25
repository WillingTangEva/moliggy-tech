'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@workspace/ui/lib/utils';
import { UserMenu } from './UserMenu';
import { Menu } from 'lucide-react';
import { useState } from 'react';
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

  return (
    <header className="bg-background sticky top-0 z-40 border-b">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-6 lg:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">FIRE.Life</span>
          </Link>

          {/* 桌面端菜单 */}
          <nav className="hidden md:flex md:gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  'hover:text-foreground/80 text-sm font-medium transition-colors',
                  pathname === item.path ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* 移动端菜单按钮 */}
        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className="text-foreground inline-flex h-10 w-10 items-center justify-center rounded-md"
                aria-label="打开菜单"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] px-0 sm:w-[300px]">
              <div className="py-4">
                <div className="flex items-center px-6 pb-4">
                  <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                    <span className="text-xl font-bold">FIRE.Life</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={cn(
                        'flex h-10 items-center px-6 text-sm font-medium',
                        pathname === item.path
                          ? 'bg-accent text-accent-foreground'
                          : 'text-foreground/60 hover:bg-accent/50 hover:text-foreground'
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

        {/* 用户菜单，总是显示 */}
        <div className="flex items-center gap-4">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
