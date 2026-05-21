# Xiaoyun Design System (xiaoyun-ds)

> ⚠️ **项目定位声明**
>
> 本项目基于 **Life-Design-System** 强行魔改而来，**仅用于内部实验测试或销运业务的规范参考**，**不作为对外发布的标准设计系统**。项目中部分组件内容尚未依据销运真实规范做调整，当前仅作为实验参考。
>
> - 与上游 Life-Design-System 不保持兼容，token、组件 API 与视觉细节可能随销运业务需求随时调整
> - 不承诺向后兼容、不接受外部业务团队接入
> - 如需稳定的设计系统，请使用上游官方 Life-Design-System

Xiaoyun Design System 是一套面向 Web 开发的高保真设计系统，旨在通过自动化工作流将设计资产稳定转化为前端代码。本项目采用 Monorepo 架构，实现了设计变量 (Tokens)、图标 (Icons)、组件 (Components) 以及 AI 技能 (Skills) 的统一管理与分发。

## 📦 项目架构

本项目由以下核心包组成，所有包均发布在 `@xiaoyun-ds` 作用域下：

| 包名 | 说明 | 目录 |
| :--- | :--- | :--- |
| **[@xiaoyun-ds/tokens](./packages/tokens)** | 设计系统底层变量（色彩、间距、排版、阴影等） | `packages/tokens` |
| **[@xiaoyun-ds/icons](./packages/icons)** | 标准化 SVG Sprite 图标库，支持自动注入与 CSS 换色 | `packages/icons` |
| **[@xiaoyun-ds/components-web](./packages/components-web)** | 核心 React Web 组件库、样式资源及自动化接入工具 (CLI) | `packages/components-web` |
| **[@xiaoyun-ds/skills](./packages/skills)** | 为 Trae/Coze 等 Agent 准备的设计规范 Prompt 与技能集 | `packages/skills` |

此外，仓库根目录下的 `assets/` 目录托管了二进制设计资产，按类型分子目录：

| 子目录 | 内容 | 接入方式 |
| :--- | :--- | :--- |
| [`assets/images`](./assets/images) | MetricCard 角标蒙版 (`shading1~5.png`)、商品占位图 (`shangpin.png`) 等 | 由 `components.css` / 业务示例直接引用 |
| [`assets/fonts`](./assets/fonts) | 抖音数字字体 `DouyinNumberABC-*.otf` 与 `DouyinSansBold.ttf` | 由 `base.css` 顶部 `@font-face` 加载，`xiaoyun-ds init` 会一并复制到业务项目的 `assets/fonts/` |
| [`assets/icons`](./assets/icons) | 单个原始 `.svg` 图标源文件 | 优先通过 `@xiaoyun-ds/icons` 雪碧图使用；按需单独引用时再走该目录 |

---

## 🚀 接入指南

### 1. 接入 React 组件库与样式 (Components-Web)

这是最推荐的接入方式。`@xiaoyun-ds/components-web` 提供 React 组件 API，`npx xiaoyun-ds init` 会自动为您准备 Token、基础样式和图标资源。

```bash
# 1. 安装组件库包
npm install @xiaoyun-ds/components-web

# 2. 运行初始化工具，提取资产到您的项目目录（如 `styles/`、`src/styles/`、`assets/`、`src/assets/` 或 `public/assets/`，包含 `assets/fonts/`、`assets/images/`）
npx xiaoyun-ds init
```

随后在您的入口文件或 HTML 模板中引入生成的 CSS：
```html
<link rel="stylesheet" href="./styles/xiaoyun-ds-tokens.css">
<link rel="stylesheet" href="./styles/base.css">
<link rel="stylesheet" href="./styles/components.css">
```

完成样式准备后，请在 React 项目中直接导入并使用组件：

```tsx
import React from 'react';
import { Navbar, Menu, FilterGroup, Filter, Button } from '@xiaoyun-ds/components-web';

export function App() {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Menu />
        <main style={{ padding: 24 }}>
          <FilterGroup size="small" onQuery={() => {}} onReset={() => {}}>
            <Filter type="input" size="small" label="商品名称" placeholder="请输入" value="" onChange={() => {}} />
            <Filter type="select" size="small" label="商品状态" placeholder="请选择" onClick={() => {}} />
          </FilterGroup>
          <Button variant="primary">查询</Button>
        </main>
      </div>
    </>
  );
}
```

在 React 项目中，请优先使用 `@xiaoyun-ds/components-web` 提供的组件，避免手写 `.xds-` DOM 结构或仅通过 class 名拼装组件。

### 2. 接入 AI 技能集 (Skills)

如果您希望在 Trae 或其他 AI 编程助手（Agent）中使用 Xiaoyun Design System 的规范进行辅助开发，可以接入我们的技能包。

```bash
# 1. 安装技能包
npm install @xiaoyun-ds/skills

# 2. 获取特定技能的配置（以 Trae 为例）
npx xiaoyun-ds-skills trae-config xiaoyun-design-system
```
将输出的 JSON 内容复制并填入 Trae 的 `skill-creator` 即可完成注册。

---

## 🛠️ 开发者同步指南 (维护者专用)

本项目以仓库内已提交的设计资产为准。如果您是设计系统的维护者，请在本地更新源码后执行对应的校验命令。

### 同步设计变量 (Tokens)
```bash
# 校验 token 源文件是否齐全
npm run sync-tokens
```

### 同步图标库 (Icons)
```bash
# 校验图标产物是否齐全
npm run sync-icons
```

### 同步品牌资产 (Fonts / Images)
```bash
# 将仓库根目录 assets/fonts 与 assets/images 镜像到 packages/components-web/assets
# 仅在准备发布 components-web 之前执行；目的是让 npm tarball 携带最新的字体与图片
npm run sync-assets
```

### 同步 AI 技能 (Skills)
根目录的 `skills/` 目录为技能源码，发布前需同步到分发包：
```bash
# 同步根目录 skills/ 文档到 packages/skills 产物目录
npm run sync-skills
```

---

## 📦 发布与更新

发布前请先确认要发布的包，并在根目录完成对应产物同步：

```bash
# 如果 tokens 有更新，先同步生成最新 CSS
npm run sync-tokens

# 如果 skills 有更新，先同步分发内容
npm run sync-skills

# 如果根目录 assets/fonts 或 assets/images 有更新，先镜像到 components-web 包
npm run sync-assets

# 如果 components-web 有源码更新，先重新构建 dist
npm run build --workspace=@xiaoyun-ds/components-web
```

本轮如需发布 `@xiaoyun-ds/tokens`、`@xiaoyun-ds/components-web`、`@xiaoyun-ds/skills`，建议按依赖顺序执行：

```bash
# 1. 发布 tokens
npm publish --workspace=@xiaoyun-ds/tokens --access public

# 2. 发布 components-web
npm publish --workspace=@xiaoyun-ds/components-web --access public

# 3. 发布 skills
npm publish --workspace=@xiaoyun-ds/skills --access public
```

发布完成后再推送 GitHub，并补上版本 tag：

```bash
git add .
git commit -m "chore: release xiaoyun-ds packages"
git push origin main

git tag components-web-v1.0.15
git tag tokens-v1.0.6
git tag skills-v1.1.0
git push origin components-web-v1.0.15 tokens-v1.0.6 skills-v1.1.0
```

---

© 2026 Xiaoyun Design System. Built with 抖音来客设计规范.
