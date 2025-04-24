'use client';

import { AuthCheck } from './_auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';
import { 
  HomeIcon, 
  BarChart3, 
  Wallet, 
  CalendarClock, 
  Settings, 
  LogOut 
} from 'lucide-react';

function Sidebar() {
  const pathname = usePathname();
  
  const links = [
    { href: '/dashboard', label: '仪表盘', icon: HomeIcon },
    { href: '/dashboard/forecasts', label: '退休预测', icon: BarChart3 },
    { href: '/dashboard/assets', label: '资产管理', icon: Wallet },
    { href: '/dashboard/plans', label: '财务计划', icon: CalendarClock },
    { href: '/dashboard/settings', label: '设置', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border h-screen fixed left-0 top-0 p-4">
      <div className="flex items-center mb-8 h-16">
        <Link href="/dashboard" className="text-2xl font-bold">FIRE.Life</Link>
      </div>
      
      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="absolute bottom-8 left-0 w-full px-4">
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2 text-muted-foreground"
          asChild
        >
          <Link href="/auth/logout">
            <LogOut className="h-4 w-4" />
            登出
          </Link>
        </Button>
      </div>
    </aside>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthCheck>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="ml-64 flex-1 min-h-screen">
          {children}
        </main>
      </div>
    </AuthCheck>
  );
} 