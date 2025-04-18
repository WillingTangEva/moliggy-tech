# Vercel与GitHub Actions集成设置指南

## 准备工作

要使GitHub Actions能够将你的项目部署到Vercel，你需要获取以下信息并将其添加到GitHub仓库的Secrets中：

1. `VERCEL_TOKEN` - Vercel账户的访问令牌
2. `VERCEL_ORG_ID` - Vercel组织ID
3. `VERCEL_PROJECT_ID` - Vercel项目ID

## 步骤一：获取Vercel访问令牌

1. 登录Vercel账户：https://vercel.com/dashboard
2. 点击右上角的头像，选择"Settings"
3. 在左侧菜单中选择"Tokens"
4. 点击"Create"创建新令牌，给它一个描述性名称（例如"GitHub Actions"）
5. 选择适当的作用域（通常是"Full Account"）
6. 点击"Create"生成令牌
7. 复制生成的令牌（重要：这是你唯一能看到令牌的机会！）

## 步骤二：获取Vercel组织ID和项目ID

1. 安装Vercel CLI（如果尚未安装）：
   ```
   npm install -g vercel
   ```

2. 在终端中登录Vercel：
   ```
   vercel login
   ```

3. 在项目目录中运行以下命令将项目链接到Vercel：
   ```
   vercel link
   ```
   - 按照提示选择你的Vercel组织和项目，或创建新项目

4. 链接完成后，打开项目目录中的`.vercel/project.json`文件，你将在其中找到：
   - `orgId`：这是你的`VERCEL_ORG_ID`
   - `projectId`：这是你的`VERCEL_PROJECT_ID`

## 步骤三：将Secrets添加到GitHub仓库

1. 在GitHub上打开你的仓库
2. 导航到"Settings" > "Secrets and variables" > "Actions"
3. 点击"New repository secret"添加以下三个Secrets：
   - `VERCEL_TOKEN`：来自步骤一的访问令牌
   - `VERCEL_ORG_ID`：来自步骤二的组织ID
   - `VERCEL_PROJECT_ID`：来自步骤二的项目ID

## 完成

设置完成后，GitHub Actions将在以下情况下自动部署你的项目：

- 当你推送代码到非`main`分支时，会创建预览部署
- 当你推送代码到`main`分支时，会创建生产部署

你可以在GitHub仓库的"Actions"标签页中查看工作流运行情况，在Vercel仪表板中查看部署结果。 