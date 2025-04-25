import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import './globals.css';
import { Providers } from './components/providers';

export const metadata: Metadata = {
  title: '莫力给科技工作室 | MoliggyTech',
  description: '专业软件咨询与定制开发服务商，让智能驱动数字化转型',
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
    <html lang="zh-CN">
      <body>
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
