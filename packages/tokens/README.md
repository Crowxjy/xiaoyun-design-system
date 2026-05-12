# @xiaoyun-ds/tokens

Xiaoyun Design System 的设计令牌 (Design Tokens) 核心包。

该包提供仓库内维护的 CSS Variables 设计令牌快照，是构建 Xiaoyun Design System Web 组件和相关界面的基石，确保设计语言的一致性。

## 安装

```bash
npm install @xiaoyun-ds/tokens
```

## 使用

将 CSS 文件直接引入到你的入口文件（如 `main.tsx`, `index.js` 或 `index.html`）中：

```javascript
// 在 JS/TS 中引入
import '@xiaoyun-ds/tokens/xiaoyun-ds-tokens.css';
```

或者在 HTML 中：

```html
<link rel="stylesheet" href="node_modules/@xiaoyun-ds/tokens/xiaoyun-ds-tokens.css">
```

> **注意：** 推荐通过 `@xiaoyun-ds/components-web` 的 CLI 工具 (`npx @xiaoyun-ds/components-web init`) 来自动提取并引入所有设计资产。

## 包含的 Token 范围

- **颜色 (Colors)**: 包括主色、中性色、成功/警告/危险状态色、文本色、背景色、边框色等。支持 Light/Dark 主题切换。
- **排版 (Typography)**: 字体族 (Font Family)、字号 (Font Size)、行高 (Line Height) 等文字相关的定义。
- **间距与尺寸 (Spacing & Sizing)**: 统一的间距比例。
- **圆角 (Border Radius)**: 统一的圆角变量。
- **阴影与特效 (Effects)**: 预定义的阴影 (Box Shadow) 变量。

## 开发者脚本

如果你是 Xiaoyun Design System 的维护者，需要校验当前 Token 产物是否齐全，请执行以下步骤：

1. 直接运行同步命令：

```bash
# 在 monorepo 根目录下运行
npm run sync-tokens
```

这会执行位于 `scripts/` 下的校验脚本，并确认 `packages/tokens/xiaoyun-ds-tokens.css` 作为唯一 Token 源文件存在。
