import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@workspace/ui/components/theme-provider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
    title: 'Fire Life - 退休规划平台',
    description:
        '帮助用户整合财务资源，预测退休财务状况，提供可视化的财富增长和支出模拟',
    icons: {
        icon: '/favicon.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex min-h-screen flex-col">
                        <Navbar />
                        <main className="flex-grow">{children}</main>
                        <Footer />
                    </div>
                </ThemeProvider>
                <SpeedInsights />
            </body>
        </html>
    );
}
