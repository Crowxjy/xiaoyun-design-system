# 政策计算器 · Tokens-Only Demo

## 这是什么
- 与 [policy-calculator-mobile](../policy-calculator-mobile/) 复刻同一个目标页 `https://crm.dylk.com/m/webview/policy_calc/policy`。
- **故意不走项目规定路径**：不引入 `@xiaoyun-ds/components-web` 组件库，不消费 `components.css`、不复用 `PageHeader` / `Capsule` / `Tag` 等封装组件。
- 仅消费：
  - `packages/tokens/xiaoyun-ds-tokens.css`（颜色、字号、间距、圆角、阴影、字体栈）
  - 仓库根的 `skills/references/design.md`（标题层级、模块节奏、视觉气质、组件语义约束）

## 用途
- 用作对照演示：在“仅有 token + design.md 约定”的最小依赖前提下，业务页面能复刻到什么程度。
- 用作设计沟通：方便外部协作者只关心 token 层就能理解整体视觉印象。
- **不用作生产路径**。生产实现仍应走 [policy-calculator-mobile](../policy-calculator-mobile/) 那种白名单组件方案。

## 与项目规定方案的区别
| 维度 | 推荐方案（policy-calculator-mobile） | 本 demo（tokens-only） |
| --- | --- | --- |
| 组件来源 | `@xiaoyun-ds/components-web` 白名单组件 | 全部使用原生 HTML 元素 |
| 样式来源 | `tokens` + `base.css` + `components.css` | 仅 `tokens` |
| 标题封装 | `PageHeader` + 公共标题类 | 直接用 `h1/h2/h3` + token 字号字重 |
| Tag / Capsule | 使用组件 | 使用 `button` / `span` + token 圆角和颜色 |
| Tabs | 使用组件 | 使用原生 `button` 模拟 |
| 表单 | `Input` / `Select` / `Checkbox` | 原生 `input` / `select` / `checkbox` |
| 移动端断点 | 走公共组件内置规则 | 自行声明 `@media (max-width: 960px / 768px)` |
| 维护成本 | 低，跟随组件库升级 | 高，所有交互态都要自己维护 |

## 依赖说明
- 单文件 HTML，零构建。
- 仅 `<link rel="stylesheet" href="../../packages/tokens/xiaoyun-ds-tokens.css">`。
- 计算逻辑使用纯原生 JavaScript，状态管理走单一 `state` 对象。

## 预览方式
- 直接在浏览器打开：`demo/policy-calculator-tokens-only/index.html`
- 或在仓库根启动静态服务后访问 `/demo/policy-calculator-tokens-only/`

## 复刻范围
- 顶部 Hero（含区域选择、标签、说明）
- “计算器 / 规则说明”双页签
- 输入区：身份、高频类目、完整类目、本月 GMV、扫码 GMV、续约 / 存量条件项、本地推加成
- 结果区：综合权益、三大板块、对客话术、提报动作建议
- 规则说明：T+5、类目门槛、灵活佣金档位、移动端约定

## 已知限制
- 部分高级交互（如复杂校验、可访问性、键盘导航）只做了基础版本。
- 未引入图标体系，所有控件使用文本占位。
- 数字字体回落策略：本 demo 故意不引入 `base.css` 的 `@font-face`，因此 `Douyin Number ABC` 仅在系统已安装该字体时生效，否则会回落到 `--font-number` 中的系统字体栈。如需启用品牌字体，可手动在本页面顶部追加：
  ```html
  <link rel="stylesheet" href="../../packages/components-web/styles/base.css">
  ```
  并确保 `assets/fonts/` 目录被部署到正确位置。
