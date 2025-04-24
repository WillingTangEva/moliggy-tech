# `@workspace/eslint-config`

莫力给科技Monorepo项目的共享ESLint配置。

## 介绍

该包提供了一组预配置的ESLint规则，确保整个工作区中所有项目的代码风格一致性。包含了针对TypeScript、React和Next.js的特定规则。

## 包含的配置

- `base.js` - 基础ESLint配置，适用于所有TypeScript项目
- `next.js` - 针对Next.js应用的专用配置
- `react-internal.js` - 针对React内部库的配置

## 使用方法

在项目的`eslint.config.js`文件中导入并使用：

```js
import { createConfig } from '@workspace/eslint-config';

export default createConfig();
```

或者在项目的`eslint.config.mjs`文件中：

```js
import { nextConfig } from '@workspace/eslint-config/next';

export default nextConfig;
```

## 依赖

该配置使用了最新版本的ESLint及相关插件，支持TypeScript 5.7+以及React 19。
