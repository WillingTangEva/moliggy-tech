import './globals.css';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@workspace/ui/lib/utils';
import { ThemeProvider } from '@workspace/ui/components/theme-provider';
import { Navbar } from './components/Navbar';
import { SpeedInsights } from '@vercel/speed-insights/next';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'FIRE.Life - 财务独立与提早退休规划工具',
  description: 'FIRE.Life 帮助您规划财务独立与提早退休之路，管理资产、创建规划、预测退休时间。',
  icons: {
    icon: '/favicon.svg',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={cn('bg-background min-h-screen font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
