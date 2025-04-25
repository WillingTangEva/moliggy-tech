'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';
import {
    HomeIcon,
    BarChart3,
    Wallet,
    CalendarClock,
    Settings,
    LogOut,
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
        <aside className="bg-card border-border fixed left-0 top-0 h-screen w-64 border-r p-4">
            <div className="mb-8 flex h-16 items-center">
                <Link href="/dashboard" className="text-2xl font-bold">
                    FIRE.Life
                </Link>
            </div>

            <nav className="space-y-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
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
                    className="text-muted-foreground flex w-full items-center gap-2"
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

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background flex min-h-screen">
            <main className="ml-64 min-h-screen flex-1">{children}</main>
        </div>
    );
}
