# FIRE.Life - 退休规划平台

FIRE.Life是一个帮助用户实现财务独立、提早退休（Financial Independence, Retire Early）的Web应用。通过个性化的财务规划、资产分析和退休预测，用户可以更好地规划自己的财务未来。

## 技术栈

- **Next.js 15** - 使用App Router的现代React框架
- **React 19** - 用户界面库
- **TypeScript** - 类型安全的JavaScript
- **Supabase** - 后端服务和认证系统
- **Tailwind CSS** - 原子化CSS框架
- **Radix UI** - 无障碍的UI组件库基础

## 功能特点

- 用户认证和账户管理
- 个人财务控制面板
- 退休预测计算器
- 资产管理工具
- 财务计划与追踪

## 认证系统

本应用使用Supabase提供的认证系统，支持以下功能：

- 邮箱/密码注册和登录
- 邮箱验证流程
- 会话管理
- 路由保护
- 注销功能

### 认证架构

认证系统分为以下几个主要部分：

1. **客户端Supabase客户端** - 用于客户端组件中访问Supabase服务
2. **服务器端Supabase客户端** - 用于服务器组件、服务器操作和路由处理程序中访问Supabase
3. **中间件** - 自动刷新认证令牌并存储它们
4. **登录/注册页面** - 用户注册和登录的UI界面
5. **认证回调处理** - 处理邮箱验证和OAuth登录回调

### 认证流程

1. 用户通过登录页面进行注册或登录
2. 对于新用户，系统发送确认邮件进行邮箱验证
3. 用户点击确认链接，完成注册流程
4. 登录后，用户可以访问受保护的页面和功能
5. 中间件自动刷新会话令牌，保持用户登录状态

### 文件结构

- `app/utils/supabase/` - Supabase客户端创建函数
    - `client.ts` - 客户端Supabase客户端
    - `server.ts` - 服务器端Supabase客户端
    - `middleware.ts` - 认证中间件函数
- `app/login/` - 登录和注册界面
- `app/auth/` - 认证相关路由处理
    - `confirm/` - 邮箱确认处理
    - `callback/` - OAuth回调处理
    - `logout/` - 注销处理
    - `error/` - 认证错误处理

## 开发指南

### 设置环境变量

创建`.env.local`文件，添加以下变量：

```
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase匿名密钥
```

### 运行开发服务器

```bash
pnpm dev
```

### 构建项目

```bash
pnpm build
```

## 部署

项目可以部署到任何支持Next.js的平台，如Vercel、Netlify等。确保设置环境变量。

## 网站结构

1. **首页** `/`

    - 主要内容：网站介绍和价值主张
        - 导航栏(Navbar)：网站主要导航
        - 英雄区域(Hero)：简明扼要的平台介绍和行动号召按钮
        - 功能亮点(Benefits)：展示平台主要功能，配有简洁图标和简短描述
        - 核心特性(Features)：详细展示平台的核心功能和优势
        - 用户评价(Testimonials)：退休规划成功的用户案例和证言
        - 定价方案(Pricing)：不同级别的服务方案及其价格
        - 行动召唤(CTA)：引导用户注册或了解更多的区域
        - 页脚(Footer)：联系方式、社交媒体链接和重要页面导航

2. **用户仪表盘** `/dashboard`

    - 主要内容：用户财务状况的综合展示
    - 组件：
        - 财务健康指数(Financial Health Score)：展示用户退休准备状态的综合评分
        - 关键指标卡片(Key Metrics Cards)：展示当前净资产、储蓄率、预计退休年龄等
        - 资产分布图(Asset Distribution Chart)：可视化用户资产的类别分布
        - 收入/支出趋势图(Income/Expense Trend)：展示历史收入支出情况
        - 快速操作(Quick Actions)：快速访问常用功能的按钮组

3. **资产管理** `/assets`

    - 主要内容：管理用户的各类财务资产
    - 组件：
        - 资产列表(Asset List)：所有录入资产的列表视图
        - 资产添加/编辑表单(Asset Form)：添加或编辑资产的表单
        - 资产分类筛选器(Asset Filters)：按类型筛选查看资产
        - 资产变动历史(Asset History)：记录资产变动情况
        - 资产数据导入导出(Import/Export)：支持Excel格式的导入导出

4. **规划创建器** `/plan/new`

    - 主要内容：录入个人信息和财务规划参数
    - 组件：
        - 多步骤表单(Multi-step Form)：分阶段收集用户信息
            - 基本信息：年龄、预期退休年龄、当前收入等
            - 财务目标：月度支出目标、预期生活方式等
            - 风险偏好：投资风险承受能力评估
            - 规划参数：预期通胀率、投资回报率等假设参数
        - 进度指示器(Progress Indicator)：显示表单完成进度
        - 自动保存功能(Auto-save)：防止数据丢失
        - 提示和帮助信息(Tips and Help)：为每个输入项提供上下文帮助

5. **预测结果** `/forecast`

    - 主要内容：可视化展示财务预测和规划效果
    - 组件：
        - 财富增长图表(Wealth Growth Chart)：展示资产随时间的预期增长
        - 退休收入预测(Retirement Income Forecast)：退休后每月可支配收入预测
        - 情景模拟器(Scenario Simulator)：调整参数（如投资回报率、通货膨胀率）查看不同结果
        - 退休准备度指标(Retirement Readiness Indicator)：视觉上显示用户达成目标的可能性
        - 风险评估(Risk Assessment)：评估当前规划的风险水平
        - 数据导出(Export Results)：将预测结果导出为PDF或Excel

6. **设置** `/settings`
    - 主要内容：个人资料和账户管理
    - 组件：
        - 个人信息表单(Profile Form)：更新基本信息
        - 安全设置(Security Settings)：密码修改、两步验证设置
        - 通知偏好(Notification Preferences)：设置接收哪些通知及频率
        - 数据管理(Data Management)：导出或删除个人数据
        - 账户删除(Account Deletion)：删除账户的选项和流程

## 重要说明

- **所有财务数据由用户手动录入**，平台不会自动连接银行或金融机构获取数据
- **数据安全**：用户数据加密存储，确保个人财务信息安全
- **离线可用**：用户可以导出数据和报告，以便离线分析和保存
- **计算准确性**：预测基于用户提供的数据和参数，实际结果可能因外部因素而异

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

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
# 构建项目
pnpm build

# 启动生产服务器
pnpm start
```

## 共享资源

该项目使用了Monorepo中的共享资源：

- `@workspace/ui` - 共享UI组件库
- `@workspace/eslint-config` - 统一的ESLint配置
- `@workspace/typescript-config` - 共享TypeScript配置

## 架构变更说明

### 数据存储

本项目使用Supabase作为后端数据存储解决方案。所有数据库操作都通过Supabase客户端进行，相关配置在 `app/lib/supabase.ts` 中。

### API交互

所有与后端的交互都通过 `app/lib/api-client.ts` 中定义的API客户端进行，它封装了与以下资源的交互：

- 资产管理 (`assetAPI`)
- 财务计划管理 (`planAPI`)
- 退休预测管理 (`forecastAPI`)

### 测试API

为了便于测试API连接，我们提供了一个简单的测试页面：

```
/test/api
```

这个页面允许你测试各种API端点的连接，查看返回的数据格式。

### 开发指南

1. 确保已设置Supabase项目并更新环境变量
2. 在 `.env.local` 文件中添加以下变量：

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (可选，仅用于管理员功能)
```

3. 安装依赖并启动开发服务器：

```bash
npm install
npm run dev
```

4. 访问 http://localhost:3000/test/api 测试API连接
