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

# 火焰生活 (Fire Life) - 财务自由规划工具

火焰生活是一个全面的财务规划和追踪应用，专为希望实现财务自由和提前退休的用户设计。本应用基于FIRE原则（财务独立，提前退休），提供直观的财务监控和预测工具。

## 核心功能

- **资产管理**: 追踪和管理各类资产，包括现金、股票、债券、房产等
- **财务规划**: 创建详细的财务计划，设定收入、支出和储蓄目标
- **退休预测**: 分析当前财务状况，预测退休时间和退休后收入
- **可视化图表**: 直观展示财务状况和未来趋势
- **情景模拟**: 调整参数，模拟不同投资回报率和通货膨胀率下的财务状况

## 技术栈

- **前端**: Next.js 15, React 19, TypeScript, TailwindCSS
- **后端**: Next.js API Routes, Supabase (PostgreSQL)
- **认证**: Supabase Auth
- **图表**: Recharts
- **UI组件**: shadcn/ui

## 功能说明

### 1. 资产管理

- 添加、编辑和删除各类资产
- 按资产类型分类查看
- 资产增长趋势图表
- 资产配置分析

### 2. 财务规划

- 创建个人财务计划
- 设置收入、支出和储蓄目标
- 配置退休年龄和退休后预期收入
- 多计划方案比较

### 3. 退休预测

退休预测功能是本应用的核心，它通过分析用户的当前财务状况和未来规划，提供详细的退休时间线和财务自由可能性评估。

#### 退休预测主要功能:

1. **基础预测**:
   - 基于当前资产、收入、支出和储蓄率计算可能的退休年龄
   - 预测退休时的资产总额和退休后每月可用收入
   - 评估用户的退休准备度分数(0-100)

2. **资产趋势图表**:
   - 可视化展示从当前到100岁的资产变化趋势
   - 清晰标记退休时间点
   - 展示工作期和退休期的资产增长/消耗曲线

3. **收入与支出对比**:
   - 图表展示工作期和退休期的收入与支出变化
   - 直观了解财务现金流的转变

4. **退休准备状态分析**:
   - 提供退休准备度评分和分析
   - 根据评分提供个性化改进建议
   - 显示距离退休的剩余时间和相对目标退休年龄的差距

5. **情景模拟器**:
   - 调整通货膨胀率、投资回报率、每月额外储蓄和计划退休年龄
   - 实时更新预测结果，了解参数变化的影响
   - 帮助用户优化财务策略，找到最适合的退休路径

#### 使用方法:

1. 选择要分析的财务计划和当前资产总额
2. 系统自动计算并显示退休预测结果
3. 查看资产趋势图和退休准备状态卡片，了解详细预测
4. 使用情景模拟器调整参数，找到最佳财务策略
5. 点击"更新预测"保存当前预测结果
6. 定期更新财务数据以获得更准确的预测

## 安装与运行

1. 克隆仓库
```bash
git clone https://github.com/your-username/fire-life.git
cd fire-life
```

2. 安装依赖
```bash
pnpm install
```

3. 设置环境变量
创建`.env.local`文件并添加Supabase配置:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. 运行开发服务器
```bash
pnpm dev
```

5. 构建生产版本
```bash
pnpm build
pnpm start
```

## 贡献指南

欢迎贡献代码、报告问题或提出新功能建议。请遵循以下步骤:

1. Fork 本仓库
2. 创建新分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 联系方式

如有任何问题或建议，请联系项目维护者。

---

*火焰生活 - 规划你的财务自由之路*
