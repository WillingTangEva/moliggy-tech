# 莫力给科技 Monorepo

这是莫力给科技的代码仓库，采用 monorepo 结构管理多个项目。

## 项目结构

本仓库包含以下项目：

- **packages/official-website** - 莫力给科技官方网站
- 未来可能会添加更多项目...

## 技术栈

- **pnpm** - 包管理工具与工作区管理
- **TypeScript** - 类型系统
- **Next.js** - React应用框架
- **React** - 用户界面库

## 开发指南

### 前提条件

- Node.js >= 18.0.0
- pnpm >= 10.0.0

### 安装

首先，安装依赖：

```bash
pnpm install
```

### 开发官方网站

```bash
# 在根目录运行
pnpm dev

# 或直接在项目目录运行
cd packages/official-website
pnpm dev
```

### 构建项目

```bash
# 构建所有项目
pnpm -r build

# 只构建官方网站
pnpm --filter @moliggy-tech/official-website build
```

### 清理项目

```bash
# 清理所有项目
pnpm clean

# 清理pnpm缓存
pnpm clean:cache
```

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
