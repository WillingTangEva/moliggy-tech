# PNPM 使用指南

## 安装依赖
```bash
pnpm install
```

## 添加依赖
```bash
# 添加生产依赖
pnpm add <package-name>

# 添加开发依赖
pnpm add -D <package-name>

# 添加依赖到工作区根目录
pnpm add -w <package-name>
```

## 移除依赖
```bash
pnpm remove <package-name>
```

## 运行脚本
```bash
# 运行开发服务器
pnpm dev

# 构建项目
pnpm build

# 启动生产服务器
pnpm start

# 运行 lint 检查
pnpm lint

# 格式化代码
pnpm format

# 清理项目
pnpm clean
```

## 更新依赖
```bash
# 检查可更新的依赖
pnpm outdated

# 更新所有依赖
pnpm update

# 更新特定依赖
pnpm update <package-name>
```

## 工作区管理
项目使用了 pnpm 工作区功能，配置在 `pnpm-workspace.yaml` 文件中。工作区当前包括：
- 根目录 (`.`)
- `src/` 目录下的所有子包

## 注意事项
- 本项目要求 Node.js 版本 >= 18.0.0
- 本项目要求 pnpm 版本 >= 10.0.0 