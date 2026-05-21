## 设计变量（token）参考

<br />

### 文字：

所有字体族均使用--font-normal，你可以在全局层面使用这个字体族的token。

只有用于数据展示的数字字体，才会使用--font-number。

#### 字体（font-family）

`xiaoyun-ds-tokens` 提供两个字体变量：

| 变量              | 取值                                                                                                                                                                                                                                                                                                | 使用场景                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `--font-normal` | `-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Ubuntu,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Source Han Sans CN,noto sans，sans-serif，"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`                     | 全局默认字体，用于正文、标题、标签等所有常规文本    |
| `--font-number` | `"Douyin Number ABC",-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Ubuntu,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Source Han Sans CN,noto sans，sans-serif，"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` | 仅用于数据展示类文本，如数字统计、金额、倒计时、编号等 |

> 字体源文件统一存放在仓库根目录的 `assets/fonts/`（`DouyinNumberABC-*.otf`、`DouyinSansBold.ttf`），并在 [`base.css`](../../packages/components-web/styles/base.css) 顶部通过 `@font-face` 声明加载。业务项目通过 `npx xiaoyun-ds init` 接入时，CLI 会把字体目录一并复制到 `assets/fonts/`、`src/assets/fonts/` 或 `public/assets/fonts/`，无需手动配置。

### 与 `designsystem` 的兼容别名

为了兼容 `~/Documents/trae_projects/designsystem` 的规范命名，当前 `xiaoyun-ds-tokens.css` 也同步暴露了一组可直接复用的别名 token，包括但不限于：

- 字体与字号：`--font-family-default`、`--font-family-number`、`--font-size-xs/sm/md/lg/xl/2xl`
- 间距与圆角：`--spacing-xs/sm/md/lg/xl`、`--radius-xs/sm/md/lg/xl/full`
- 动效与阴影：`--transition-fast/base/slow`、`--shadow-sm/md/lg`
- 颜色语义：`--primary-*`、`--text-gray-*`、`--bg-*`、`--divider-*`、`--border-1`

#### 字号方案的主次关系（重要）

xiaoyun 同时存在两套字号 token，**新页面与文字层级请优先使用方案 A**：

| 方案 | 命名 | 用途 | 状态 |
|---|---|---|---|
| **A（主线）** | `--font-size-xs/sm/md/lg/xl/2xl` + `--line-height-*` | 页面规范、模块标题、正文 — 与 designsystem `PAGE_GUIDE.md` 完全对齐 | ✅ 推荐 |
| B（过渡） | `--display/headline/title/subtitle/body/caption-regular/medium` | 旧组件内部仍在使用，新代码不要再用 | ⚠️ 兼容保留 |

**字号矩阵（方案 A，新代码必须遵守）：**

| token | 值 | 用途 |
|---|---|---|
| `--font-size-2xl` / `--line-height-2xl` | 22 / 36 | 页面标题（`.page-title`） |
| `--font-size-xl` / `--line-height-xl` | 20 / 30 | 一级模块标题（`.section-title`） |
| `--font-size-lg` / `--line-height-lg` | 16 / 24 | 二级标题（`.subsection-title`） |
| `--font-size-md` / `--line-height-md` | 14 / 22 | 三级标题、正文（`.subtitle` / `.body-text`） |
| `--font-size-sm` / `--line-height-sm` | 13 / 22 | 紧凑型按钮、表单 |
| `--font-size-xs` / `--line-height-xs` | 12 / 18 | 辅助信息（`.secondary-text`） |

#### 内容层间距 token（与方案 A 配套）

> ⚠️ 这些 token 仅用于 `.app-content` **内部**的模块/标题间距，**不要**用 `--spacing-page-padding-*` 去覆盖外层 `.app-content` 的 padding —— 外层 padding 与 background 由 [base.css](../packages/components-web/styles/base.css) 的 `.app-content` 统一负责，覆盖会导致双重 padding、破坏滚动与圆角投影。详细使用规则请见 [layout.md](./layout.md#页面规范使用指南规范文档详情页通用)。

| token | 值 | 用途 |
|---|---|---|
| `--spacing-page-title-to-first-section` | 20px | 页面标题与第一个模块间间距（仅当不使用 `<PageHeader>` 时） |
| `--spacing-between-sections` | 32px | 各 `.section` 模块之间间距 |
| `--spacing-section-content` | 20px | `.section-title` 与 `.section-content` 之间间距 |
| `--layout-content-max-width` | 960px | 正文段落 (`.body-text` / `.page-summary`) 最大宽度上限 |

> `--spacing-page-padding-top/bottom/left/right` 仅用于「**完全独立的非业务页面**」（如设计系统自身的预览页 `index.html`），业务页面通过基础框架 `.app-content` 自动获得 padding，**不要**显式使用这组 token。

#### 文本样式（text styles）— ⚠️ 过渡保留方案 B

> **新页面请优先使用上方方案 A 的 `--font-size-*` + `--line-height-*` 单粒度 token**，下表的 `font` 简写仅用于兼容旧组件，不要在新页面中引用。

包含字号、字重、行高的综合 token，可直接用于 `font` 简写属性：

```css
/* 使用方式示例 */
.my-title {
  font: var(--headline-medium);
}
.my-body {
  font: var(--body-regular);
}
.my-caption {
  font: var(--caption-medium);
}
```

| 变量值                  | 值             | 使用场景                           |
| -------------------- | ------------- | ------------------------------ |
| `--display-regular`  | 400 28px/38px | 大标题regular，通常不使用               |
| `--display-medium`   | 500 28px/38px | 大标题 medium，页面级标题               |
| `--headline-regular` | 400 24px/36px | 辅助标题regular，                   |
| `--headline-medium`  | 500 24px/36px | 辅助标题medium，                    |
| `--title-regular`    | 400 20px/30px | 标题regular，通常不使用                |
| `--title-medium`     | 500 20px/30px | 标题medium，区块级标题                 |
| `--subtitle-regular` | 400 16px/24px | 小标题 regular，卡片标题/按钮文案/列表主体文案强化 |
| `--subtitle-medium`  | 500 16px/24px | 小标题 medium，卡片标题/按钮文案/列表主体文案强化  |
| `--body-regular`     | 400 14px/22px | 正文regular                      |
| `--body-medium`      | 500 14px/22px | 正文medium                       |
| `--caption-regular`  | 400 12px/18px | 辅助 regular                     |
| `--caption-medium`   | 500 12px/18px | 辅助 medium                      |

- -medium字重的字号，通常用于标题或者强化文字上。

### 圆角

分为两组：**内容圆角**用于小型控件，**容器圆角**用于卡片和表面。切勿混用。

#### 内容圆角 — 按元素高度选择

适用于按钮、输入框、标签、Tab、胶囊、分段控件等小型 UI 元素：

| 变量值              | 取值    | 使用场景                       |
| ---------------- | ----- | -------------------------- |
| `--radius-0`     | 0     | 直角，无边框按钮、无圆角分割线            |
| `--radius-s`     | 6px   | 小型控件（高度 < 22px）、次级按钮、复选框   |
| `--radius-m`     | 12px  | 中型控件（高度 22–35px）、标准按钮、输入框  |
| `--radius-l`     | 16px  | 中大型控件（高度 36–44px）、大按钮、搜索框  |
| `--radius-xl`    | 20px  | 大型控件（高度 > 44px）、胶囊按钮、悬浮输入框 |
| `--radius-round` | 999px | 完全圆形、胶囊/药丸形状、头像            |

#### 容器圆角 — 按嵌套层级和大小选择

适用于卡片、区域、面板、弹出菜单、底页、对话框等：

| 变量值             | 取值   | 使用场景                   |
| --------------- | ---- | ---------------------- |
| `--radius-m`    | 12px | 小页面容器、小卡片、紧凑列表项        |
| `--radius-l`    | 16px | 标准页面容器、普通卡片、列表组、弹窗内容区  |
| `--radius-xl`   | 20px | 大页面容器、首页卡片、精选模块        |
| `--radius-xxl`  | 24px | 大浮层（popover、下拉菜单、导航菜单） |
| `--radius-xxxl` | 32px | 超大浮层（sheet、modal、对话框）  |

### 阴影

阴影的使用需要谨慎，只有在一些组件上存在，或者卡片的hover态，或者页面中最重要的信息卡上，才会使用阴影。

| 变量值               | 使用场景                         |
| ----------------- | ---------------------------- |
| `--shadow-small`  | 小型组件、Tab 激活态、紧凑型卡片等          |
| `--shadow-medium` | 标准卡片、面板、浮动气泡、下拉菜单等           |
| `--shadow-large`  | 大型页面容器、主要内容区域（如 Body）、模态框容器等 |

### 间距

间距是指组件之间的间距，合理的间距能够使页面有清晰、实用的布局。以 4px 为基础单位，采用倍数拓展：4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px...

#### S（Small）间距方案

| 变量值              | 值         | 用途                                                        |
| ---------------- | --------- | --------------------------------------------------------- |
| `--spacing-base` | 4px (1x)  | **附属间距**：表单 Label 与其备注信息；表单报错、Radio、Checkbox、icon 与内容的间距。 |
| `--spacing-3x`   | 12px (3x) | **同组间距**：逻辑紧密的连续操作元件，如：按钮组、筛选组、快筛组、选项组等。                  |
| `--spacing-5x`   | 20px (5x) | **常规间距**：区块内面板之间、Label 与内容（横向）、面板内边距等。                    |
| `--spacing-6x`   | 24px (6x) | **横向间距**：Radio、Checkbox 的横向连续布局；表单各个元件之间。                 |
| `--spacing-8x`   | 32px (8x) | **跨域间距**：带线条分割的区块之间留白。                                    |

#### M（Medium）间距方案

| 变量值             | 值          | 用途                                     |
| --------------- | ---------- | -------------------------------------- |
| `--spacing-2x`  | 8px (2x)   | **附属间距**：普通纵向表单 Label 与内容之间；icon 与内容。  |
| `--spacing-4x`  | 16px (4x)  | **同组间距**：逻辑相关的元件组间距。                   |
| `--spacing-5x`  | 20px (5x)  | **常规间距**：区块内面板之间、Label 与内容（横向）、面板内边距等。 |
| `--spacing-8x`  | 32px (8x)  | **容器内边距**：内容区、容器类组件内边距。                |
| `--spacing-10x` | 40px (10x) | **跨域间距**：不带线条分割的区块之间留白。                |
