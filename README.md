# 莫力给科技 Monorepo

这是莫力给科技的代码仓库，采用 monorepo 结构管理多个项目。

## 项目结构

本仓库包含以下项目：

- **apps/official-website** - 莫力给科技官方网站
- **apps/fire-life** - FIRE.Life 退休规划平台
- **packages/ui** - 共享UI组件库
- **packages/eslint-config** - 统一的ESLint配置
- **packages/typescript-config** - 共享TypeScript配置

## 技术栈

- **pnpm** - 包管理工具与工作区管理 (v10+)
- **Turborepo** - 高性能构建系统
- **TypeScript** - 类型系统 (v5.7+)
- **Next.js** - React应用框架 (v15.2+)
- **React** - 用户界面库 (v19+)
- **Radix UI** - 无样式、可访问的UI组件库
- **Tailwind CSS** - 原子化CSS框架 (v4+)

## 开发指南

### 前提条件

- Node.js >= 20.0.0
- pnpm >= 10.4.1

### 安装

首先，安装依赖：

```bash
pnpm install
```

### 开发应用

```bash
# 开发所有应用
pnpm dev

# 只开发官方网站
cd apps/official-website
pnpm dev

# 只开发退休规划平台
cd apps/fire-life
pnpm dev
```

### 构建项目

```bash
# 构建所有项目
pnpm build

# 只构建特定项目
cd apps/official-website
pnpm build
```

### 代码检查

```bash
# 检查所有项目
pnpm lint

# 修复代码风格问题
pnpm format
```

## 技术特性

1. **React 19** - 使用最新的React特性和服务器组件
2. **Next.js 15** - 利用App Router和服务器组件架构
3. **Radix UI** - 无障碍访问的UI基础组件
4. **共享UI库** - 跨应用复用的组件系统
5. **Tailwind CSS 4** - 最新版原子化CSS
6. **TypeScript 5.7** - 严格类型检查与类型安全

## Monorepo 优势

1. **代码共享** - 在多个项目间共享组件、工具和配置
2. **统一版本控制** - 所有项目在同一个仓库中，确保依赖版本一致
3. **简化工作流** - 一次性克隆所有相关项目
4. **原子提交** - 支持跨项目的原子级更改
5. **集中管理依赖** - 避免重复安装相同的依赖

## 贡献指南

1. Fork 仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request
