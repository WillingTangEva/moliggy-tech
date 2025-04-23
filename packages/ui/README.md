# `@workspace/ui`

莫力给科技Monorepo项目的共享UI组件库。

## 介绍

该包提供了一组可重用的UI组件，确保莫力给科技所有项目中的设计系统一致性。组件基于Radix UI和Tailwind CSS构建，支持多主题、响应式设计和无障碍访问。

## 特性

- 基于Radix UI构建的无障碍组件
- Tailwind CSS 4优化的样式系统
- 支持深色和浅色主题
- 响应式设计，适配各种设备
- 符合WCAG 2.1无障碍标准
- 与React 19完全兼容

## 组件列表

- 按钮、表单控件和输入组件
- 导航和菜单组件
- 模态框、抽屉和弹出层
- 卡片、面板和容器
- 表格和数据展示组件
- 提示、通知和告警组件

## 使用方法

在项目中导入并使用组件：

```tsx
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Theme } from "@workspace/ui/components/theme";

// 在应用中使用
<Theme>
  <div className="p-4">
    <h1 className="text-2xl font-bold">表单示例</h1>
    <Input placeholder="请输入用户名" />
    <Button>提交</Button>
  </div>
</Theme>
```

## 开发

组件库使用最新的React 19特性和TypeScript 5.7+开发，确保类型安全和最佳性能。 