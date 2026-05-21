***

name: xiaoyun-design-system
description: 使用 @xiaoyun-ds 构建或优化 销运风格的 React Web 界面。当需要根据截图、设计稿、文本提示或现有代码实现销运风格 UI 时（尤其是期望在 Web 端高度还原销运页面模式时）使用。
----------------------------------------------------------------------------------------------------------------------

> ⚠️ **项目定位声明**：本设计系统基于 **Life-Design-System** 强行魔改而来，**仅用于内部实验测试或销运业务的规范参考**。token、组件 API 与视觉细节会随销运业务需求随时调整，与上游不保证兼容。当你为外部业务团队/通用场景生成代码时，请改用上游官方 Life-Design-System；本 Skill 仅在销运/实验上下文中启用。

# 强制性规则

以下规则适用于所有任务。没有任何例外。

1. **优先使用** `xiaoyun-ds` 提供的 **React 组件。** 在构建自定义 UI 之前，务必优先使用 `@xiaoyun-ds/components-web` 提供的 React 组件。当存在等效的 `xiaoyun-ds` 组件时，禁止创建自定义组件，禁止对组件样式进行覆盖和魔改。在 React 项目中，禁止手写 `.xds-` DOM 结构或自行拼装已提供的组件。
2. **所有视觉样式均使用语义化 Tokens。** 颜色、排版、圆角和阴影必须使用 design tokens。原则上严禁在 UI 中硬编码色值、字号或圆角大小，除非由设计师提供设计稿中的圆角和间距在token中不存在时可采用硬编码，但需要告知。
3. 所有文本的字体族均使用`--font-normal`，你可以在全局层面使用这个字体族的token。只有用于数据展示的数字字体，才会使用`--font-number`。
4. **使用** `@xiaoyun-ds/icons` **图标。** 在引入组件时，脚本会自动引入 `@xiaoyun-ds/icons`，如果没有引入，请手动引入。不要捏造图标名称 —— 务必核实存在完全一致的导出项。
5. 除非是全屏页面、弹框等非典型页面类型，否则必须使用基础结构构建页面的基础框架。包含顶部导航、左侧菜单和中间内容区域，对于大部分页面，均需要遵循此结构，且不要对组件和样式进行修改！页面基础框架请阅读 [references/layout.md](references/layout.md)。**对于规范展示页/文档页/详情页，外层仍然使用 `.app-container` → `.app-body` → `.app-content` 基础框架（禁止再嵌套 `.page-container` 等容器层），仅在 `.app-content` 内部使用 `.section` / `.section-title` / `.subsection-title` 等内容层语义类，文字层级与间距严格走 token，禁止 hardcoded 数值。**
5. **在能提升清晰度的地方考虑使用动效。** 对于交互状态变化（展开/收起、切换、焦点滑动、错误反馈），优先使用 xiaoyun-ds 组件内置的动效。仅对非组件元素使用自定义动效，并遵循 [references/motion.md](references/motion.md) 的预设以保持一致性。
6. **遵循现有项目模式。** 如果仓库中已经使用了 xiaoyun-ds 组件或本地封装组件，请在其基础上进行扩展，而不是创建平行的结构。
7. 每个项目的页面，需要增加字体平滑的代码：`-webkit-font-smoothing: antialiased`
8. **页面生成请求路由：** 当用户消息中出现 `templates/page-request-*.md` 路径，或显式要求「按 SKILL 与 page-generation-pipeline 处理某需求」时，**必须**严格按 [references/page-generation-pipeline.md](references/page-generation-pipeline.md) 的 6 步流水线执行（解析→选组件→装数据→产出→自检→README），产物只能写入 `demo/{需求名}/`，不得修改 `templates/**`，且交付前必须把 Step 5 的 8 条自检结果贴到 README。

***

# 核心工作流

> ⚠️ **重要提示 (Agent System Prompt)：**
> 本项目在 `references/` 目录下配备了详细的设计系统组件规范。在实现任何 UI（如按钮、筛选器、表格、布局）之前，你 **必须** 使用文件读取工具查阅该目录下对应的 `.md` 参考文件，并优先使用 `@xiaoyun-ds/components-web` 的 React 组件 API。禁止凭空猜测组件实现，禁止手写 `.xds-` DOM/class 结构替代现有 React 组件。

## 1. 优先检查 Xiaoyun Design System (xiaoyun-ds) 的引入情况

在开始任何 UI 开发之前，AI 必须首先检查当前项目是否已经正确接入了 Xiaoyun Design System。

### 1.1 检查方法

1. **检查** **`package.json`**：查看 `dependencies` 或 `devDependencies` 中是否包含 `@xiaoyun-ds/components-web`。
2. **检查本地资产**：查看项目中是否存在 `styles/xiaoyun-ds-tokens.css`、`styles/components.css` 以及 `assets/sprite.svg` 等文件。

<br />

### 1.2 如果未引入，请按照以下自动化步骤执行接入：

由于 Xiaoyun Design System 提供了极其便捷的一键接入 CLI 工具，当检测到项目未接入时，AI 必须**严格按照以下 2 步**在终端执行操作，**禁止手动新建 CSS 文件或手动复制粘贴代码**：

1. **安装组件库包**：
   在项目的根目录下执行命令：
   ```bash
   npm install @xiaoyun-ds/components-web
   ```
   *(该操作会自动将* *`@xiaoyun-ds/tokens`* *和* *`@xiaoyun-ds/icons`* *作为依赖项一并下载)*
2. **运行初始化脚本提取本地资产**：
   安装完成后，紧接着执行：
   ```bash
   npx xiaoyun-ds init
   ```
   *(该 CLI 脚本会自动将必须的 Tokens CSS、基础组件 CSS 以及 Icon SVG 精准复制到项目对应的* *`styles/`* *和* *`assets/`* *目录中。)*
3. **指导用户在入口引入**：
   脚本执行成功后，AI 需检查项目的入口 HTML 文件（如 `index.html`），并确保 `<head>` 标签内包含以下引入代码：
   ```html
   <link rel="stylesheet" href="./styles/xiaoyun-ds-tokens.css">
   <link rel="stylesheet" href="./styles/base.css">
   <link rel="stylesheet" href="./styles/components.css">
   ```

**注意事项：**

- 绝对不要试图通过 CDN 或手动编写变量的方式来模拟 Xiaoyun Design System，必须走正规的 `npm install` + `npx xiaoyun-ds init` 流程。
- 如果在执行 `npx xiaoyun-ds init` 时遇到权限问题，请使用 `chmod +x node_modules/@xiaoyun-ds/components-web/bin/cli.mjs` 赋予执行权限后重试。

***

## 2. 将 Xiaoyun Design System (xiaoyun-ds) 作为默认的设计系统

将 `@xiaoyun-ds `的组件和样式作为默认的实现路径。当要实现页面或者UI时，必须阅读对应组件的文档：

- token样式：[references/tokens.md](references/tokens.md)
- 图标：[references/icon.md](references/icon.md)
- 颜色：[references/color.md](references/color.md)
- 组件：[references/components.md](references/components.md)
- 动效：[references/motion.md](references/motion.md)

<br />

***

## 2.5. 布局框架

当准备生成页面时，你需要判断需要使用哪个类型的页面，对于大部分业务，必须基于一个标准的页面基础框架，并在内容区域填充内容，请阅读：

- [references/layout.md](references/layout.md)

***

## 2.6. 组件使用

当准备生成页面时，如果需要使用组件，必须阅读对应组件的文档并优先使用 `@xiaoyun-ds/components-web` 的 React 组件 API：

- 按钮 ：[references/button.md](references/button.md)
- 图标 ：[references/icon.md](references/icon.md)
- 标签页 ：[references/tabs.md](references/tabs.md)
- 分页器 ：[references/pagination.md](references/pagination.md)
- 表格 ：[references/table.md](references/table.md)
- 筛选器 ：[references/filter.md](references/filter.md)
- 标签 ：[references/tag.md](references/tag.md)
- 多选框 ：[references/checkbox.md](references/checkbox.md)

***

<br />

## 3. 需要时阅读图片指引

如果用户提供了截图、设计稿或其他视觉参考，也请阅读：

- [references/image-analysis.md](references/image-analysis.md)

使用图片来推断布局结构、层级、组件、Token 角色和状态 —— 然后使用 xiaoyun-ds 组件和 Tokens 进行实现。

如果追求像素级完美的克隆会导致糟糕的 Web 端实现效果，请不要这么做。在需要时使用占位图（例如 `https://picsum.photos/seed/reel-fashion/720/1280`）。

***

## 4. 优先使用可用的设计源数据

如果用户提供了设计稿、截图、标注、原型说明，或者仓库中已经存在对齐后的规范文档，请始终优先将其作为权威设计数据源：

1. **将设计样式 / Tokens / 变量映射到 @xiaoyun-ds/tokens。** 读取当前存在的任何形式的样式定义 —— 语义名称、变量别名、已有 token 或明确的设计说明 —— 并将其解析为对应的 `@xiaoyun-ds/tokens` 语义 Token（颜色、排版预设、圆角、阴影）。绝不要随意硬编码解析后的 hex/px 值；始终优先使用 `@xiaoyun-ds/tokens`，若设计中存在 token 体系未覆盖的圆角、间距或特殊视觉，请明确告知。
2. **将设计组件映射到 @xiaoyun-ds/components-web 组件。** 当某个设计元素明显对应 `Button`、`NavBar`、`Tabs` 等设计系统组件时，优先识别并复用匹配的 `@xiaoyun-ds/components-web` 组件，将设计变体转化为 **xiaoyun-ds** 的属性和变体类型。
3. **从设计资料提取布局。** 使用布局标注、自动布局、间距关系、对齐规则等信息指导 CSS/布局决策，并在适用时转换为 token 值。

如果某个设计样式 / Token / 组件没有明确对应的 `@xiaoyun-ds` 等效项，请明确记录此缺失，并按设计要求实现。

***

## 5. 实施开发

在编写代码之前，请检查代码仓库：检查 `@xiaoyun-ds/components-web`、`@xiaoyun-ds/tokens` 、`@xiaoyun-ds/icons` 和本地`@xiaoyun-ds`封装是否已经配置好。遵循现有的模式。

构建优先级：

1. 复用仓库中已有的实现
2. 使用经过验证的 `@xiaoyun-ds/components-web`、`@xiaoyun-ds/tokens`、`@xiaoyun-ds/icons` API
3. 仅当没有等效的 xiaoyun-ds 组件时，才进行最少的本地扩展

***

## 6. 交付可运行的 UI

保持分析简明扼要，将重心放在实现上。

除非用户只要求进行分析，否则需交付：

- 所选择的起始点
- （适用时）一份简明的结构读取分析
- 具体的代码实现或补丁 (patch)
- 重要的假设或阻断因素 (blockers)

***

## 合规性检查清单

在交付前，请验证：

- 所使用的所有 xiaoyun-ds组件 API 在已安装的依赖包中确实存在
- 颜色、排版、圆角和阴影全部使用了语义化 Tokens，特殊情况下圆角和间距可以硬编码，
- 所有字体族均使用token：--font-normal，你可以在全局层面使用这个字体族的token。只有用于数据展示的数字字体，才会使用--font-number。
- 图标来自于 `@xiaoyun-ds/icons` 且导出名称已核实
- 悬停 (Hover)、聚焦 (focus)、激活 (active)、禁用 (disabled) 和加载中 (loading) 状态均已处理
- 焦点可见性强
- 响应式行为能够自适应结构，而不仅仅是尺寸
- 动效用于阐明状态变化，而不是用于装饰
- 代码实现遵循了仓库现有的规范
