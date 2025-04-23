# 莫力给科技工作室官网

这是莫力给科技工作室官方网站的源代码仓库。网站使用Next.js框架开发，采用现代化的设计风格。

## 技术栈

- **Next.js 15.3.1** - React框架，使用App Router
- **React 19** - 用户界面库
- **TailwindCSS 4** - 样式系统
- **TypeScript** - 类型系统
- **pnpm** - 包管理工具
- **Radix UI** - 无样式UI组件库
- **Shadcn/ui** - 基于Radix UI的组件集合

## 主要功能

- 响应式设计
- 企业服务展示
- 技术能力展示
- 客户案例与合作伙伴
- 团队介绍

## 本地开发

首先，确保已安装 pnpm（需要 pnpm 10.0.0 或更高版本）：

```bash
npm install -g pnpm
```

然后，安装依赖:

```bash
pnpm install
```

启动开发服务器:

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看网站。

## 构建生产版本

```bash
pnpm build
```

构建完成后，可以通过以下命令启动生产服务器:

```bash
pnpm start
```

## 项目结构

- `src/app` - 主应用目录（Next.js App Router）
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
    - `ui/` - UI组件（基于shadcn/ui）
- `public` - 静态资源目录
  - `icons` - UI图标
  - `partners` - 合作伙伴图标
  - `certifications` - 认证标识

## pnpm 使用指南

项目使用 pnpm 作为包管理工具，详细使用方法请参考 [PNPM_GUIDE.md](./PNPM_GUIDE.md)。

## 设计风格

网站采用两种配色方案:

### 中国风科技红配色 (主页与其他部分)

- 主红: #b72121

## 了解更多

要了解更多关于 Next.js 的信息，请查看以下资源：

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 特性和 API
- [学习 Next.js](https://nextjs.org/learn) - 交互式 Next.js 教程

您可以查看 [Next.js GitHub 仓库](https://github.com/vercel/next.js) - 欢迎您的反馈和贡献！

## 部署到 Vercel

部署 Next.js 应用的最简单方法是使用 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)，该平台由 Next.js 的创建者提供。

查看我们的 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying) 了解更多详情。
