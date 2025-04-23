# `@workspace/typescript-config`

莫力给科技Monorepo项目的共享TypeScript配置。

## 介绍

该包提供了一组预配置的TypeScript设置，确保整个工作区中所有项目使用一致的TypeScript配置。包含了针对不同类型项目的特定配置。

## 包含的配置

- `base.json` - 基础TypeScript配置，适用于所有项目
- `nextjs.json` - 针对Next.js应用的专用配置
- `react-library.json` - 针对React库的配置

## 使用方法

在项目的`tsconfig.json`文件中扩展这些配置：

```json
{
  "extends": "@workspace/typescript-config/nextjs.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## 特性

- 严格的类型检查 (`strict: true`)
- 现代ECMAScript目标 (ES2022)
- 支持React 19和Next.js 15
- 针对不同项目类型的优化配置
