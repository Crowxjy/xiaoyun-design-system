# page-generation-pipeline

> **目标**：把 [`templates/page-request-template.md`](../../templates/page-request-template.md) 填好的需求文件，稳定转换成 `demo/{需求名}/index.html` 死产物；全程只用白名单组件与 token，禁止 AI 自由写 DOM。
>
> **触发条件**：用户消息中出现 `templates/page-request-*.md` 路径，或显式要求「按 SKILL 与 page-generation-pipeline 处理该需求」。
>
> **输出物**（缺一不可）：
> ```
> demo/{需求名}/
>   ├─ index.html              死产物，双击即看
>   └─ README.md               包含图片解读 / 组件选型理由 / token 映射 / 自检结果
> ```

---

## 硬约束（Hard Constraints）

```
产物层
   ├─ 单文件 HTML           复用 skills/references/sample-page.html 的 ESM + importmap + Babel 模式
   ├─ 容器层白名单         仅 .app-container / .app-body / .app-content / .section / .section-title / .section-content / .subsection-title
   ├─ 组件白名单            仅 @xiaoyun-ds/components-web 的 23 个导出（见下方表）
   ├─ 禁写 DOM              不得出现 <div|section|article|header|aside|nav|main> 等业务标签；原子 <span|p|h1-h4> 仅在 section-title 等规范类下允许
   ├─ 禁写硬编码            #rrggbb / px / rem / em 一律映射到 token（<svg><path fill|stroke> 例外）
   └─ 禁装饰                无 emoji、面包屑、计数徽章、自由 shadow/gradient

token 层
   ├─ 颜色                  --text-gray-* / --bg-* / --primary-* / --data-card-* / --divider-* / --border-*
   ├─ 字号                  --font-size-xs / sm / md / lg / xl / 2xl 与 --font-weight-*
   ├─ 间距                  --spacing-xs / sm / md / lg / xl；内容层专用 --spacing-page-title-to-first-section / --spacing-between-sections / --spacing-section-content
   ├─ 圆角/阴影             --radius-* / --shadow-*
   └─ 最大宽度              描述区 --layout-content-max-width（960px）

三档标题
   ├─ 页面标题              22 / 600（PageHeader 自带，或 h1.doc-page-title）
   ├─ 章节 section-title    20 / 600 + 3×16 竖线前缀
   └─ 子章节 subsection     16 / 600

失败策略
   └─ 若需求涉及白名单外的交互/组件，必须升级提案（在 README 里显式提问），严禁自行写 DOM 补齐
```

---

## 6 步流水线

```
Step 1 ─ 解析需求模板
   目标   从 templates/page-request-{需求名}-YYYYMMDD.md 抽取 5 类结构化输入
   输入   需求 md 路径
   产出   内存结构：{元信息, 目标, 架构(树), 数据(表), 交互(列表), 视觉参考, 边界, 验收}
   约束
      ├─ 缺字段   立即停止，向用户回读缺失项，不要自行脑补
      ├─ 架构树   叶子节点必须是白名单组件名；若出现非白名单词汇（"卡片区块/侧栏/浮层…"），进入升级提案
      └─ 数据表   字段必须有"示例值"，否则向用户索取 mock 值

Step 2 ─ 选组件（决策树）
   目标   把每个架构叶子节点映射为唯一的白名单组件
   输入   Step 1 产出的架构树
   产出   {节点 → 组件名 + 引用文档} 表
   决策
      ├─ 页面顶部/tabs        → PageHeader  （含 tabs 时设置 props.tabs）
      ├─ 全站一级菜单         → Navbar      （规范站点默认使用，业务页一般不需要）
      ├─ 侧栏菜单              → Menu
      ├─ 页面级标签切换       → TabNav
      ├─ 区块级标签切换       → Tabs
      ├─ 筛选容器              → FilterGroup + 多个 Filter
      ├─ 时间筛选（统计/对比） → TimeFilter
      ├─ 表格 + 分页           → Table + Pagination
      ├─ 指标卡                → MetricCard（同组联动选中 → MetricCardGroup）
      ├─ 图表                  → Charts
      ├─ AI 诊断               → Diagnosis
      ├─ 浮层                  → Dropdown（独立使用，与 Select 并列）
      ├─ 下拉选择              → Select
      ├─ 输入                  → Input
      ├─ 多选                  → Checkbox
      ├─ 胶囊切换              → Capsule
      ├─ 动作按钮              → Button（variant 选择详见 button.md）
      ├─ 状态/标签             → Tag；成组时包 Tags
      ├─ 图标                  → Icon
      └─ 异步占位              → Loading
   失败策略
      └─ 未命中任何规则 → 升级提案（在 README "未解决项" 列出）

Step 3 ─ 装填数据
   目标   把"关键数据"与"关键交互"落到组件 props
   输入   Step 1 数据表 / 交互列表 + Step 2 组件映射
   产出   每个组件的 props 清单（React useState 初始值 + 常量）
   约束
      ├─ 所有数据写在产物 top 的 const MOCK = {...}，字段名与数据表 1:1 对齐
      ├─ 时间类字段使用 "YYYY-MM-DD HH:mm" 统一格式
      ├─ 状态 Tag 的 color 与需求里标注的色彩语义对齐（成功→green / 危险→red / 警示→orange / 信息→blue / 中性→gray）
      ├─ 交互按"动作→结果"逐条实现；涉及筛选的一律 useMemo 过滤 MOCK
      └─ 不允许 fetch / API 调用；MOCK 即最终数据源

Step 4 ─ 产出 HTML
   目标   写出 demo/{需求名}/index.html 单文件
   输入   Step 2 / 3 的组件 + props
   产出   一个单文件，骨架如下：
      ├─ <link> 三件套   tokens / base / components
      ├─ <script type="importmap">   react / react/jsx-runtime / react-dom/client / clsx / @xiaoyun-ds/components-web
      ├─ <script type="module">      icons sprite
      ├─ <div id="root"></div>
      └─ <script type="text/babel">  App 组件定义 + createRoot(root).render(<App/>)
   骨架约束
      ├─ 根结构       <App><div class="app-container"><Navbar? /><div class="app-body"><Menu? /><main class="app-content"><PageHeader /> ... </main></div></div></App>
      ├─ 章节结构     <section class="section"><h2 class="section-title">…</h2><div class="section-content">…</div></section>
      ├─ 禁止         任何 style={{...}} 内联硬编码；className 只能用规范里的语义类
      └─ 路径         <link>/importmap 路径全部相对指向仓库 packages/*，参考 skills/references/sample-page.html

Step 5 ─ 自检（sanity check）
   目标   产物必须通过 8 条硬检查，否则回到 Step 2/3 重做
   检查
      ├─ [1] 仅白名单 import   grep 'from "@xiaoyun-ds/components-web"' 之外无其他组件 import
      ├─ [2] 无业务 DOM        产物不含 <div className="xxx-card"/<section/<article/<header>（除规范类名白名单）
      ├─ [3] 无硬编码          正则匹配 #[0-9a-f]{3,8}|[0-9]+(px|rem|em) 仅命中 <svg><path>
      ├─ [4] 三档标题          h1 对应 22/600、.section-title 20/600 + ::before、.subsection-title 16/600
      ├─ [5] 描述区宽度        .doc-page-desc 或文档正文容器 max-width: var(--layout-content-max-width)
      ├─ [6] 数据 1:1         MOCK 字段集合 ⊇ 需求"关键数据"字段集合
      ├─ [7] 交互 1:1         需求"关键交互"每条都在代码里可定位（注释 // INTERACTION #N）
      └─ [8] 图片解读          README.md 含"图片解读 → token 映射表"段

Step 6 ─ 输出 README
   目标   demo/{需求名}/README.md 作为 AI 交付说明 + 人工验收清单
   结构
      ├─ 需求快照       原需求 md 的要点回显（目标 / 架构 / 数据字段）
      ├─ 组件选型理由   每个架构节点为什么选这个组件、有没有替代方案
      ├─ 图片解读表     | 图片 | 视觉元素 | 对齐 token | 最终组件/props |
      ├─ MOCK 数据说明  字段来源、边界值、异常情况
      ├─ 未解决项       升级提案、需用户回答的问题
      └─ 自检结果       Step 5 的 8 条 ✅/❌ 清单 + 证据定位
```

---

## 23 组件白名单（与 [index.ts](../../packages/components-web/src/index.ts) 同步）

```
容器/导航   PageHeader · Navbar · Menu · TabNav · Tabs
工具栏      FilterGroup · Filter · TimeFilter
数据展示    Table · Pagination · MetricCard(含 MetricCardGroup) · Charts · Diagnosis
表单原子    Input · Select · Dropdown · Checkbox · Capsule
通用原子    Button · Tag · Tags · Icon · Loading
```

> 任何 AI 必须先读 [components.md](./components.md) 与对应组件单独规范（button.md / filter.md / table.md / tabs.md / tag.md / checkbox.md / pagination.md / icon.md）再调用。

---

## 产物骨架参考（Step 4 模板）

```html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{需求名} · 销运设计系统</title>
  <link rel="stylesheet" href="../../packages/tokens/xiaoyun-ds-tokens.css">
  <link rel="stylesheet" href="../../packages/components-web/styles/base.css">
  <link rel="stylesheet" href="../../packages/components-web/styles/components.css">
  <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18.3.1",
        "react/jsx-runtime": "https://esm.sh/react@18.3.1/jsx-runtime",
        "react-dom/client": "https://esm.sh/react-dom@18.3.1/client",
        "clsx": "https://esm.sh/clsx@2.1.1",
        "@xiaoyun-ds/components-web": "../../packages/components-web/dist/index.mjs"
      }
    }
  </script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="../../packages/icons/index.js"></script>
  <script type="text/babel" data-type="module">
    import { createRoot } from 'react-dom/client';
    import {
      PageHeader, Tabs, FilterGroup, Filter, Button,
      Table, Pagination, Tag, MetricCard, Charts, Diagnosis
      /* 仅列实际用到的 */
    } from '@xiaoyun-ds/components-web';

    const MOCK = { /* 按需求"关键数据"字段填 */ };

    function App() {
      // INTERACTION #1 ...
      return (
        <div className="app-container">
          <div className="app-body">
            <main className="app-content">
              <PageHeader title="..." />
              <section className="section">
                <h2 className="section-title">章节一</h2>
                <div className="section-content">
                  {/* 仅白名单组件 */}
                </div>
              </section>
            </main>
          </div>
        </div>
      );
    }

    createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>
```

---

## SKILL 入口规则（AI 路由）

AI 处理用户消息时，按以下优先级判断：

```
若用户消息包含 templates/page-request-*.md
   → 立即按本流水线 6 步执行
   → 过程中只读不改 templates/**；产物写入 demo/{需求名}/
   → 交付前必须跑完 Step 5 的 8 条自检并把结果贴到 README

若用户仅描述页面需求但未提供模板文件
   → 先提示："请用 templates/page-request-template.md 填写后再提交，或允许我代填？"
   → 用户同意代填 → AI 生成 templates/page-request-{名}-{YYYYMMDD}.md
     → 再转入上面流程

若用户要求在规范站 index.html 内新增章节
   → 走现有 SKILL.md 的规范维护流程，不走本流水线
```

---

## 升级提案（当需求无法被白名单满足）

AI 遇到下列情况必须在 README 「未解决项」中显式提出，不得擅自写 DOM：

```
类型                 示例                                 应提案
─────────────────    ─────────────────────────────────    ──────────────────────────────
白名单缺组件         弹窗 / Modal / Toast                 建议扩充白名单并等待确认
交互组件不支持       Table 横向冻结列 / 行内编辑          给出 mock + 简化实现 + 明确告知
token 缺值           需求要求的圆角/间距不在 token        建议新增 token 或降级使用现有值
图片含规范外元素     渐变装饰、特殊品牌色                 禁止复刻，转为最接近的 token 并说明
数据规模越界         表格 >200 行 / 图表 >30 点           降级为 mock 小样 + 说明
```

---

## 常见错误与修正（来自历史 lessons）

```
❌ 在 .app-content 外新增 .page-container   → ✅ 直接用 .app-content 作为唯一外层
❌ <div className="card">…</div>             → ✅ <MetricCard />
❌ style={{ padding: '24px' }}               → ✅ className 走 layout.md 的间距规则
❌ 把图片 #5B65EC 直接写到 css               → ✅ 映射到 --primary-5 或最接近 token
❌ 自由写 <input>                            → ✅ <Filter type="input"/> 或 <Input/>
❌ 新增 tokens 里不存在的 font-family         → ✅ 默认 --font-normal，数字列用 --font-number
```

---

## 参考命令（便于 AI 自检与产出）

```
自检（Step 5）
   ├─ 白名单 import     grep -E "from ['\"]" demo/{需求名}/index.html | grep -v "@xiaoyun-ds/components-web\|react\|react-dom\|clsx"
   ├─ 硬编码色          grep -En "#[0-9a-fA-F]{3,8}" demo/{需求名}/index.html
   ├─ 硬编码 px         grep -En "[^-a-zA-Z0-9][0-9]+(px|rem|em)\b" demo/{需求名}/index.html
   └─ 业务 DOM          grep -En "<(div|section|article|header|aside|nav|main)\b" demo/{需求名}/index.html

预览（本地）
   └─ npx serve . → 浏览器打开 http://localhost:{port}/demo/{需求名}/index.html
```

---

## 关联文档

- [../SKILL.md](../SKILL.md)：入口规则、强制规则 1-7
- [layout.md](./layout.md)：页面骨架 / 容器层约束
- [tokens.md](./tokens.md)：token 总览
- [components.md](./components.md)：组件目录与决策树
- [image-analysis.md](./image-analysis.md)：图片解读流程
- [../../templates/page-request-template.md](../../templates/page-request-template.md)：需求模板
