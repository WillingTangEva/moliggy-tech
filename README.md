# 莫力给科技工作室官网

这是莫力给科技工作室官方网站的源代码仓库。网站使用Next.js框架开发，采用现代化的设计风格。

## 技术栈

- **Next.js 15.3.1** - React框架
- **React 19** - 用户界面库
- **TailwindCSS 4** - 样式系统
- **TypeScript** - 类型系统

## 主要功能

- 响应式设计
- 企业服务展示
- 技术能力展示
- 客户案例与合作伙伴
- 团队介绍

## 本地开发

首先，安装依赖:

```bash
npm install
```

然后，启动开发服务器:

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看网站.

## 构建生产版本

```bash
npm run build
```

构建完成后，可以通过以下命令启动生产服务器:

```bash
npm run start
```

## 项目结构

- `src/app` - 主应用目录
  - `page.tsx` - 首页组件
  - `layout.tsx` - 应用布局
  - `globals.css` - 全局样式
- `public` - 静态资源目录
  - `icons` - UI图标
  - `partners` - 合作伙伴图标
  - `certifications` - 认证标识

## 设计风格

网站采用两种配色方案:

### 中国风科技红配色 (主页与其他部分)

- 主红: #b72121 (故宫红演变色)
- 辅助色:
  - 渐变红: 线性渐变(135deg, #b72121 0%, #901a1a 100%)
  - 点缀金: #f3c74f (用于图标、文字强调)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
