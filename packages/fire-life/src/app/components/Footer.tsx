'use client'

import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-xl text-primary">FIRE.Life</h3>
            <p className="text-muted-foreground">
              帮助用户整合财务资源，预测退休财务状况，提供可视化的财富增长和支出模拟。
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">网站导航</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  仪表盘
                </Link>
              </li>
              <li>
                <Link href="/plan" className="text-muted-foreground hover:text-primary transition-colors">
                  规划工具
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                  资源中心
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">资源</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  博客
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-muted-foreground hover:text-primary transition-colors">
                  教程指南
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  常见问题
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="text-muted-foreground hover:text-primary transition-colors">
                  计算器
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">联系我们</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  联系方式
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  服务条款
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FIRE.Life. 保留所有权利。
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <span className="sr-only">微信</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M9.195 21.435 7.91 17.76a6.86 6.86 0 0 1-1.65.214c-3.666 0-6.628-2.754-6.628-6.15 0-3.396 2.962-6.15 6.628-6.15 3.666 0 6.628 2.754 6.628 6.15a5.97 5.97 0 0 1-1.403 3.865l1.148 3.747-3.438-.001Zm2.619-13.762c-4.42 0-8 3.318-8 7.413 0 4.094 3.58 7.413 8 7.413.865 0 1.69-.135 2.457-.374l.533-.16 1.585 4.498 3.937-2.908.147-.135a7.39 7.39 0 0 0 2.341-4.334 7.65 7.65 0 0 0-2.338-5.494 8.215 8.215 0 0 0-5.715-2.485 8.408 8.408 0 0 0-2.947.517" />
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <span className="sr-only">微博</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M9.703 15.615a.85.85 0 0 1-.894.795H6.083a.85.85 0 0 1-.894-.795v-7.23c0-.438.4-.795.894-.795h2.726c.493 0 .894.357.894.795v7.23zm4.042 0a.85.85 0 0 1-.894.795H10.12a.85.85 0 0 1-.894-.795V4.795c0-.438.4-.795.894-.795h2.731c.493 0 .894.357.894.795v10.82zm4.536 0a.85.85 0 0 1-.893.795h-2.726a.85.85 0 0 1-.894-.795v-4.436c0-.438.4-.795.894-.795h2.726c.494 0 .893.357.893.795v4.436z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 