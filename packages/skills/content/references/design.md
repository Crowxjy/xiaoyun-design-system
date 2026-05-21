---
version: alpha
name: Xiaoyun Design System
description: 销运业务方向的设计系统，承载销售、运营、风控等场景的桌面与移动端体验，强调白名单组件 + 标题规范 + token 单一真理来源。
colors:
  brand-1: "#F3F4FF"
  brand-2: "#E2E6FF"
  brand-3: "#939FFF"
  brand-4: "#6879FF"
  brand-5: "#5171FF"
  brand-6: "#495BE6"
  brand-7: "#3340A1"
  primary: "{colors.brand-5}"
  primary-hover: "{colors.brand-4}"
  primary-active: "{colors.brand-6}"
  primary-disable: "{colors.brand-2}"
  primary-text: "{colors.brand-7}"
  text-primary: "#1D2129"
  text-secondary: "#4F535C"
  text-caption: "#6C737A"
  text-disable: "#A8ABB2"
  text-on-primary: "#FFFFFF"
  text-emphasize: "#FF8324"
  bg-page: "#FFFFFF"
  bg-subtle: "#F9FAFD"
  bg-soft: "#F7F9FC"
  bg-muted: "#F2F4F7"
  border-default: "#EBEDF0"
  divider-default: "#F0F2F5"
  success: "#1AB844"
  success-hover: "#42CB67"
  success-active: "#008F27"
  warning: "#FF8324"
  warning-hover: "#FF9A4D"
  warning-active: "#EB4E00"
  danger: "#FA5B50"
  danger-hover: "#FF8C84"
  danger-active: "#CC221D"
  popper-dark: "rgba(29, 33, 41, 0.9)"
  popper-light: "rgba(255, 255, 255, 0.98)"
  mask: "rgba(29, 33, 41, 0.5)"
  diagnosis-title: "#0E165D"
  data-chart-1a: "#6879FF"
  data-chart-1b: "#A48EFF"
  data-chart-2: "#FFC35E"
  data-chart-3: "#69D6FF"
  data-chart-4: "#56E499"
  data-chart-5: "#FFB273"
typography:
  page-title:
    fontFamily: "PingFang SC"
    fontSize: 22px
    lineHeight: 36px
    fontWeight: 600
  heading-level-1:
    fontFamily: "PingFang SC"
    fontSize: 20px
    lineHeight: 30px
    fontWeight: 600
  heading-level-2:
    fontFamily: "PingFang SC"
    fontSize: 16px
    lineHeight: 24px
    fontWeight: 600
  heading-level-3:
    fontFamily: "PingFang SC"
    fontSize: 14px
    lineHeight: 22px
    fontWeight: 500
  body-md:
    fontFamily: "PingFang SC"
    fontSize: 14px
    lineHeight: 22px
    fontWeight: 400
  body-sm:
    fontFamily: "PingFang SC"
    fontSize: 13px
    lineHeight: 22px
    fontWeight: 400
  label-xs:
    fontFamily: "PingFang SC"
    fontSize: 12px
    lineHeight: 18px
    fontWeight: 400
  number-emphasize:
    fontFamily: "Douyin Number ABC"
    fontSize: 22px
    lineHeight: 36px
    fontWeight: 600
rounded:
  xs: 2px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 20px
  xxl: 24px
  xxxl: 32px
  pill: 999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  page-padding-top: 20px
  page-padding-bottom: 20px
  page-padding-x: 24px
  page-title-to-section: 20px
  between-sections: 32px
  section-content: 20px
components:
  page-header:
    backgroundColor: "{colors.bg-page}"
    textColor: "{colors.text-primary}"
    typography: "{typography.page-title}"
    padding: 24px
  heading-level-1:
    textColor: "{colors.text-primary}"
    typography: "{typography.heading-level-1}"
    padding: 0
  heading-level-2:
    textColor: "{colors.text-primary}"
    typography: "{typography.heading-level-2}"
    padding: 0
  heading-level-3:
    textColor: "{colors.text-secondary}"
    typography: "{typography.heading-level-3}"
    padding: 0
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-on-primary}"
    rounded: "{rounded.md}"
    padding: 12px
    height: 40px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.text-on-primary}"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.text-on-primary}"
  button-secondary:
    backgroundColor: "{colors.bg-page}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: 12px
    height: 40px
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 8px
  tag-info:
    backgroundColor: "{colors.brand-1}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.pill}"
    padding: 4px
  tag-success:
    backgroundColor: "#EBFAEB"
    textColor: "{colors.success-active}"
    rounded: "{rounded.pill}"
    padding: 4px
  tag-warning:
    backgroundColor: "#FFF8E6"
    textColor: "{colors.warning-active}"
    rounded: "{rounded.pill}"
    padding: 4px
  tag-danger:
    backgroundColor: "#FFF1EB"
    textColor: "{colors.danger-active}"
    rounded: "{rounded.pill}"
    padding: 4px
  capsule:
    backgroundColor: "{colors.bg-soft}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: 8px
  capsule-checked:
    backgroundColor: "{colors.brand-1}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.pill}"
    padding: 8px
  metric-card:
    backgroundColor: "{colors.bg-page}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: 16px
  diagnosis-card:
    backgroundColor: "{colors.bg-page}"
    textColor: "{colors.diagnosis-title}"
    rounded: "{rounded.lg}"
    padding: 16px
---

## Overview

Xiaoyun Design System 是销运方向的工程化设计系统。它覆盖飞书生态内的销售、运营、风控等横向业务，强调“规则即源头”：所有视觉决策都先沉淀成 token 与组件，再被业务页面消费。

体系遵循三个原则：

- **白名单组件优先**：业务页面只能从约 23 个白名单组件中拼装，禁止再写业务级原生 DOM。
- **token 是单一真理来源**：颜色、字号、间距、圆角、阴影统一在 `packages/tokens/xiaoyun-ds-tokens.css` 维护，组件层与业务层只能消费，不能再造。
- **标题与布局规范硬约束**：页面标题层级、灰色竖线前缀、纵向间距节奏在公共样式层一次落地，所有页面跟随同一套规范。

整体气质是“克制 + 数据敏感”：以蓝紫色为主品牌，搭配中性灰阶承接信息密度高的销运表格、诊断、漏斗等场景，并保留温暖橙、安全绿、警示红三档强语义色用于金额与状态强调。

## Colors

### 品牌主色

- **brand-5（#5171FF）**：主品牌蓝紫，用于主按钮、链接、图表系列 1。
- **brand-4 / brand-6**：主色 hover 与 active 状态，避免业务再造交互态。
- **brand-1 / brand-2**：浅色容器背景，承载选中态、轻量提示。
- **brand-7（#3340A1）**：暗色文字与图标，用于浅色填充上的可读字。

### 文本色

- **text-primary（#1D2129）**：标题与主信息。
- **text-secondary（#4F535C）**：正文、次级信息。
- **text-caption（#6C737A）**：辅助说明、表格表头。
- **text-disable（#A8ABB2）**：占位、禁用、引导线灰条。

### 背景与分割

- **bg-page**：页面默认背景，必须保持纯净，禁止额外叠加品牌色渐变。
- **bg-subtle / bg-soft / bg-muted**：用于分层卡片、列表斑马纹与隔断区。
- **border-default / divider-default**：唯一的描边与分割线灰阶，禁止业务额外引入新灰。

### 状态色

- **success / warning / danger**：分别承担达成、提醒、风险三档语义。
- 业务表达数据上涨用 **success**；下跌用 **danger**；待确认或软提醒用 **warning**。
- 涉及金额、奖励等强调内容统一使用 `text-emphasize`（warning 同色），避免再造金额色。

### 数据图表

- **data-chart-1a / 1b**：双蓝紫主系列，用于主指标与辅助序列。
- **data-chart-2/3/4/5**：暖橙、青蓝、亮绿、橙黄构成补充色轮，承担分类型对比；同一图表内序列数禁止超出 6。

## Typography

字体栈：默认走 `PingFang SC`，并降级到系统无衬线；金额、指标等数字密集场景叠加 `Douyin Number ABC`，保证等宽与视觉重心。品牌字体源文件统一存放在仓库根目录的 `assets/fonts/`（含 `DouyinNumberABC-Medium/Bold/ExtraBold/Condensed*.otf`、`DouyinSansBold.ttf`），由 [`packages/components-web/styles/base.css`](../packages/components-web/styles/base.css) 顶部的 `@font-face` 块统一加载，业务侧无需重复声明。

层级规则（销运强约束）：

- **page-title 22 / 600**：页面级唯一标题，全站只允许出现一次。
- **heading-level-1 20 / 600**：模块级一级标题，必须带 3×16px 灰色竖线（`text-disable`），与标题间距固定 8px。
- **heading-level-2 16 / 600**：二级模块标题，承接卡片、面板内分区。
- **heading-level-3 14 / 500**：三级标题或表头强调，承接列表分组与表头。
- **body-md 14 / 400**：正文默认。
- **body-sm 13 / 400**：表格、辅助说明。
- **label-xs 12 / 400**：标签、Tag 文案、次级 caption。

写代码时优先消费公共标题类（`xds-heading-page` / `xds-heading-level-1` / `xds-heading-with-prefix` 等），避免在业务页面里重复定义同义标题样式。

## Layout

页面布局走“整页 + 模块 + 卡片”三层节奏：

- **页面外边距固定**：顶部 20px、左右 24px、底部 20px。
- **页面标题到首段距离**：20px。
- **一级模块之间**：32px。
- **二级模块之间**：20px。
- **三级模块之间**：16px。
- **标题下间距**：12px。

栅格规则：

- 桌面以最大内容宽度承载主表格与三段式结果区，超出后自动外居中。
- 移动端断点（`max-width: 768px`）下，所有双列网格自动折成单列；表单卡片、结果卡、规则卡保持单一宽度。
- 中间断点（`max-width: 960px`）将三列网格收敛成两列，避免文案换行抖动。

间距 token 使用约定：

- 卡片内部 padding 走 `spacing.lg` 或 `spacing.xl`。
- 卡片之间 gap 默认 `spacing.md`，模块之间 gap 默认 `spacing.lg`。
- 禁止业务直接写裸数值，所有间距必须走 token 或 token 派生量。

## Elevation & Depth

阴影体系按“感知强度”分四档：

- **shadow-small**：常驻卡片阴影，承载组件库默认卡片。
- **shadow-normal**：交互悬浮卡片，承担 hover、tooltip 弱浮起。
- **shadow-large**：主视觉卡片、Hero 区或重要结果区，强调“值得停留”。
- **shadow-{left|right|top|bottom}**：方向性投影，仅用于贴边大组件（Drawer、侧边栏）边缘暗示，禁止滥用。

阴影使用规则：

- 同一页面阴影层级最多出现两档，避免“层叠雾化”。
- 弹层（popover、dropdown）走 `shadow-normal` + `border-default`，避免单纯靠阴影承重。
- 蒙层背景统一使用 `mask`，禁止再造黑色透明叠层。

## Shapes

圆角语义：

- **rounded.xs / sm（2 / 4px）**：徽标、Tag、迷你按钮等小尺寸控件。
- **rounded.md（8px）**：默认按钮、输入控件。
- **rounded.lg（12px）**：卡片、Diagnosis 卡、MetricCard。
- **rounded.xl / xxl（20 / 24px）**：Hero 区、容器型卡片、覆盖整段语义的承重容器。
- **rounded.xxxl（32px）**：仅用于全屏弹窗、Drawer 顶部圆角。
- **rounded.pill（999px）**：Tag、Capsule、状态胶囊。

形状约束：

- 同一组件的圆角不允许出现“桌面圆、移动方”的差异，圆角是品牌印记之一。
- Capsule、Tag 必须使用 pill 形态，禁止退化为方角。
- 卡片只允许内嵌一档更小的圆角，避免“圆中再圆”。

## Components

> 所有业务页面只能从下列白名单组件拼装。如果某个新需求无法用现有组件承住，应该先增强组件，再下沉到 `packages/components-web`，最后让业务消费。

主要白名单组件清单：

- **Button**：包含 `primary / secondary / text-primary / danger` 等变体，统一从 `button-primary` 系列 token 派生。
- **PageHeader**：承接页面标题与描述，必须用于页面顶部，禁止再造 `.doc-page-title`。
- **Tabs / TabNav**：承接横向页签，移动端自动支持横向滚动。
- **Capsule**：身份选择、快速筛选、单选场景的胶囊控件。
- **Select / Input / Checkbox**：表单原子，禁止业务再写原生表单控件。
- **Filter / FilterGroup / TimeFilter**：销运侧筛选体系，承接组合筛选与时间区间。
- **Tag / Tags**：状态、标签、强语义提示。
- **MetricCard**：单指标卡片，承接 KPI、阶段总额、对比数值。
- **Diagnosis**：诊断卡，承接“话术 / 反推 / 动作”等结构化建议。
- **Charts**：销运图表入口，仅消费 data-chart 色系。
- **Table**：数据驱动表格与组合式表格统一在此承载，含冻结列、分组分隔线、summary 行、指标列样式。
- **Pagination / Loading / Dropdown / Menu / Navbar / Icon**：导航、反馈、系统级原子组件。

组件层与 token 的契约：

- 组件颜色、圆角、间距统一通过上文 `components.*` 字段映射 token，不允许在组件内部硬编码新色值。
- 组件状态（hover / active / disabled）必须通过 token 派生，禁止业务在外部 className 里覆盖。
- 当组件能力不足时，先增强组件，禁止业务页面再写原生表单或表格。

## Assets

仓库根目录的 `assets/` 是除 `packages/` 之外的二进制资产真理来源，按类型拆分子目录，业务页面与组件库的相对路径也以这套布局为准：

- `assets/images/` — 图片素材（PNG / JPG）。当前承载 MetricCard 角标蒙版 `shading1~5.png` 与商品占位图 `shangpin.png`，由 `packages/components-web/styles/components.css` 与文档站、`request-portal` 等示例直接通过相对路径引用。
- `assets/fonts/` — 抖音品牌字体源文件（OTF / TTF），覆盖 `DouyinNumberABC-Medium/Bold/ExtraBold/Condensed*` 与 `DouyinSansBold`。由 `base.css` 顶部 `@font-face` 块统一注册，业务侧只要引入 `base.css` 即可启用品牌字体；执行 `npx xiaoyun-ds init` 时 CLI 会把整目录复制到 `assets/fonts/`、`src/assets/fonts/` 或 `public/assets/fonts/`。
- `assets/icons/` — 单个原始 `.svg` 图标源文件，是 `packages/icons/assets/sprite.svg` 的反向源。业务侧默认仍走 `import '@xiaoyun-ds/icons'` 注入雪碧图，仅在确实需要单独引用某一张原始 SVG（如邮件签名、OG 图）时才直接读取该目录。

**约束**：

- 严禁把图片散落到 `assets/` 顶层或与字体混放；新增资源时按文件类型归档到对应子目录。
- 一旦 `assets/fonts` 或 `assets/images` 有变更，发布前必须执行根目录 `npm run sync-assets`，让 `packages/components-web/assets/` 与之保持一致，确保 npm tarball 携带最新资产。

## Do's and Don'ts

### Do

- 优先消费 `xiaoyun-ds-tokens.css` 与 `components.css`，让 token 成为唯一可信源。
- 页面标题、模块标题、灰色竖线前缀必须走公共标题类。
- 所有页面布局边距、模块纵向节奏严格遵循 20/24/20 + 12/16/20/32 节奏。
- 业务页面的金额、对比、上涨下跌等强语义场景必须使用 success / danger / warning 三档色。
- 移动端必须保留断点折叠，禁止把桌面双列布局原样塞进窄屏。
- 销运组件矩阵页表头列（`.matrix-cell.size-head`）必须强制左对齐。
- 当规则需要落到“整个项目”时，先沉淀到 `packages/components-web`，再让 `index.html`、`request-portal/index.html`、demo 页面统一消费。

### Don't

- 不要在 `index.html` 或业务页面里再写一套同义标题类（如 `.doc-page-title` / `.section-title`）。
- 不要在业务页面再造灰阶、品牌色或状态色，所有色值都必须来自 token。
- 不要绕过白名单组件直接写业务级原生 DOM；如果组件不够，先增强组件。
- 不要在 `Table` 等关键组件之外用裸 `<table>` 自行实现表格，会丢失冻结列、分组分隔线和指标列规范。
- 不要把交互结果区做成“随输入自动重算”，销运计算类页面必须保留“点击触发”原则，避免现场误读旧结果。
- 不要在窄屏继续保留桌面三列结果区或多列输入区，否则必然出现挤压错位。
- 不要给同一组件叠加超过两档阴影或超过两档圆角，破坏品牌一致性。

