# 莫力给科技官方网站

这是莫力给科技官方网站的源代码仓库，是莫力给科技Monorepo项目的一部分。网站采用现代化技术栈开发，提供响应式设计和优秀的用户体验。

## 技术栈

- **Next.js 15.2+** - React框架，采用App Router架构
- **React 19** - 最新版React，支持服务器组件
- **Tailwind CSS 4** - 原子化CSS框架
- **TypeScript 5.7+** - 严格类型系统
- **Radix UI** - 无样式、可访问的UI组件库
- **Shadcn/ui** - 基于Radix UI的高质量组件集合

## 主要功能

- 响应式设计，适配各种设备
- 企业服务与产品展示
- 技术能力与解决方案介绍
- 客户案例与合作伙伴展示
- 团队介绍与公司文化

## 本地开发

确保已安装所需工具：

- Node.js >= 20.0.0
- pnpm >= 10.4.1

### 安装依赖

```bash
# 在monorepo根目录安装所有依赖
pnpm install

# 或者只在此项目目录安装依赖
pnpm install
```

### 启动开发服务器

```bash
# 在monorepo根目录启动所有应用
pnpm dev

# 或者只启动此项目
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 构建生产版本

```bash
# 构建项目
pnpm build

# 启动生产服务器
pnpm start
```

## 项目结构

- `app/` - Next.js App Router目录
    - `page.tsx` - 首页组件
    - `layout.tsx` - 应用布局
    - `globals.css` - 全局样式
- `components/` - 页面组件
    - `Hero.tsx` - 主页英雄区
    - `Navbar.tsx` - 导航栏
    - `About.tsx` - 关于我们
    - `Solutions.tsx` - 解决方案
    - `Cases.tsx` - 案例展示
    - `Contact.tsx` - 联系方式
    - `Footer.tsx` - 页脚
    - `QrCodeModal.tsx` - 二维码模态框
- `lib/` - 工具函数和通用逻辑
- `hooks/` - 自定义React Hooks
- `public/` - 静态资源
    - `icons/` - UI图标
    - `partners/` - 合作伙伴图标
    - `certifications/` - 认证标识

## 共享资源

该项目使用了Monorepo中的共享资源：

- `@workspace/ui` - 共享UI组件库
- `@workspace/eslint-config` - 统一的ESLint配置
- `@workspace/typescript-config` - 共享TypeScript配置

## 设计风格

网站采用特色配色方案：

- 主色调: #b72121 (中国风科技红)
- 次要色: #1e293b (深蓝灰)
- 背景色: #f8fafc (浅灰白)
- 强调色: #f59e0b (金黄)
