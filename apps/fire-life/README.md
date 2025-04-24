# FIRE.Life - 退休规划平台

FIRE.Life 是一个专注的退休规划平台，帮助追求财务独立和提早退休(FIRE)的用户进行财务管理和规划。用户可以手动录入其财务数据，平台将提供当前财务状况展示和未来财务预测，帮助用户规划退休路径。

## 功能特点
    
- **财务数据管理**：用户可手动录入和管理存款、投资、保险等各类财务资产信息
- **财务状况展示**：直观展示用户当前的财务状况、资产分布和相关指标
- **退休预测**：基于用户输入的数据，预测未来的财务状况和退休收入
- **方案对比**：比较不同投资策略和退休计划的效果
- **数据导出**：导出财务数据和预测结果，方便用户保存和分析

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

## 技术栈

- **Next.js 15.2+** - React框架，采用App Router架构
- **React 19** - 最新版React，支持服务器组件
- **TypeScript 5.7+** - 严格类型系统
- **Tailwind CSS** - 原子化CSS框架
- **@workspace/ui** - 莫力给科技内部共享UI组件库
- **Lucide React** - 开源图标库
- **Motion** - 动画库

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