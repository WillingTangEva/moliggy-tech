import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 使用 Inter 字体替代之前的中文字体，因为 Inter 缓存更好且加载更快
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "莫力给科技工作室 | MoliggyTech",
  description: "专业软件咨询与定制开发服务商，让智能驱动数字化转型",
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
    <html lang="zh-CN">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
