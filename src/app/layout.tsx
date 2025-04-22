import type { Metadata } from 'next';
import { ThemeProvider } from './components/ui/theme-provider';
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css';

export const metadata: Metadata = {
  title: '莫力给科技工作室 | MoliggyTech',
  description: '专业软件咨询与定制开发服务商，让智能驱动数字化转型',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
