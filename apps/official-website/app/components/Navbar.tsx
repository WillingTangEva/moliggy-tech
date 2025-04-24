'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';

// UI 组件导入
import { Button } from '@workspace/ui/components/button';
import { ThemeToggle } from '@workspace/ui/components/theme-toggle';
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from '@workspace/ui/components/menubar';

// 自定义组件和工具导入
import QrCodeModal from './QrCodeModal';
import { scrollToElement } from '../../lib/scrollUtils';
import { cn } from '@workspace/ui/lib/utils';

export default function Navbar() {
    const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // 初始化
        handleResize();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const navItems = [
        { name: '解决方案', id: 'solutions' },
        { name: '客户案例', id: 'cases' },
        { name: '关于我们', id: 'ceo' },
        { name: '联系我们', id: 'contact' },
    ];

    const handleNavClick = (id: string) => {
        setActiveSection(id);
        scrollToElement(id);
    };

    return (
        <header
            className={cn(
                'fixed z-50 w-full transition-all duration-300',
                isScrolled
                    ? 'bg-background/90 shadow-sm backdrop-blur-md'
                    : 'bg-transparent'
            )}
        >
            <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center"
                >
                    <Link
                        href="/"
                        className="text-primary text-xl font-bold tracking-tight md:text-2xl"
                    >
                        MoliggyTech
                    </Link>
                </motion.div>

                {/* 桌面端菜单栏 */}
                <div className="hidden md:block">
                    <Menubar className="border-none bg-transparent">
                        {navItems.map((item) => (
                            <MenubarMenu key={item.id}>
                                <MenubarTrigger
                                    className={cn(
                                        'hover:text-primary hover:bg-primary/5 rounded-full px-4 py-2 font-medium transition-colors',
                                        activeSection === item.id
                                            ? 'text-primary'
                                            : 'text-foreground'
                                    )}
                                    onClick={() => handleNavClick(item.id)}
                                >
                                    {item.name}
                                </MenubarTrigger>
                            </MenubarMenu>
                        ))}
                    </Menubar>
                </div>

                <div className="flex items-center space-x-2 md:space-x-3">
                    <ThemeToggle />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Button
                            onClick={() => setIsQrCodeModalOpen(true)}
                            className="rounded-full px-3 py-1 text-sm shadow-md transition-shadow hover:shadow-lg md:px-6 md:py-2 md:text-base"
                        >
                            立即咨询
                        </Button>
                    </motion.div>
                </div>
            </div>

            <QrCodeModal
                isOpen={isQrCodeModalOpen}
                onClose={() => setIsQrCodeModalOpen(false)}
            />
        </header>
    );
}
