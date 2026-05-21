# 布局 (Layout)

适用于不同类型的布局模式。每个页面请选择一种模式，切勿混用。

### 页面基础框架

除非是全屏页面、弹框等非典型页面类型，否则必须使用这个基础结构构建页面的基础框架。包含顶部导航、左侧菜单和中间内容区域，对于大部分页面，均需要遵循此结构，且不要对组件和样式进行修改！

在 React 项目中，必须优先使用 `@xiaoyun-ds/components-web` 提供的 `Navbar`、`Menu`、`Input`、`PageHeader`、`Tabs` 等现成组件来搭建基础框架，禁止手写 `.xds-navbar`、`.xds-menu`、`.xds-tabs`、`.xds-input` 等 DOM 结构与 class 组合。

其中 `Navbar` 已内置默认的 logo、搜索区、导航项、右侧操作区和用户区内容，页面中直接使用 `<Navbar />` 即可，不要自行修改图标、logo、导航文案、选中项和用户区内容。`Navbar` 不再提供 `NavbarLeft`、`NavbarMiddle`、`NavbarRight`、`NavbarLogo`、`NavbarSearch`、`NavbarNav`、`NavbarNavItem`、`NavbarAction`、`NavbarDivider`、`NavbarUser` 等组合式子组件。

其中 `Menu` 已内置默认的 6 组侧边导航内容，页面中直接使用 `<Menu />` 即可，不要自行增删菜单组、菜单项数量或修改默认文案。默认分组为：`常用`、`店铺`、`订单`、`财务`、`达人带货`、`内容推广`。

实现结构请参考以下 React 示例，其中 `.app-content` 里的内容仅为参考内容，其他部分则为固定结构：

```tsx
import React from 'react';
import {
  Icon,
  Menu,
  Navbar,
  PageHeader,
  Tab,
  Tabs,
} from '@xiaoyun-ds/components-web';

export function AppLayoutDemo() {
  return (
    <div className="app-container">
      <header className="app-navbar">
        <Navbar />
      </header>

      <div className="app-main-wrapper">
        <aside className="app-sidebar">
          <div className="app-sidebar__menu">
            <Menu />
          </div>
        </aside>

        <div className="app-body">
          <PageHeader
            title="页面标题"
            tabs={
              <Tabs variant="primary" size="small" defaultValue="tab-1">
                <Tab value="tab-1">标签一</Tab>
                <Tab value="tab-2">标签二</Tab>
              </Tabs>
            }
          />

          <div className="app-content">
            {/* 核心业务内容放在这里 */}
          </div>
        </div>
      </div>
    </div>
  );
}
```

<br />

1. **初始化结构**：始终从 `.app-container` 开始构建页面。
2. **内容填充**：将具体业务逻辑放入 `.app-content` 中，并根据 [布局模式](#布局模式) 选择合适的布局。
3. **样式覆盖**：除非用户明确要求，否则不要修改 `base.css` 中核心框架的 `width`、`z-index` 和 `flex` 属性。
4. **阴影处理**：严格遵循base.css与基础框架示例代码，`.app-body` 的 `z-index` 高于侧边栏和导航栏，以保证 `shadow-large` 投影效果正常显示。

## 页面类型

### 列表页 (List Page)

适用场景：列表页是后台管理系统中最为常见的页面类型，主要用于展示、搜索和操作大批量数据。

- 当用户明确提出是列表页时使用此类型；

#### 页面结构层级 (Tree Structure)

以下是一个典型的列表页结构层级：

```text
.app-body (列表页主容器)
└── .app-content (页面滚动内容区)
    ├── <PageHeader /> (页面标题区)
    ├── <FilterGroup /> (搜索/筛选区，可选)
    ├── .xds-action-bar (状态与操作工具栏)
    │   ├── <Tabs variant="capsule" /> (左侧: 数据状态页签)
    │   └── .xds-actions (右侧: 新建/导出等全局操作)
    ├── <TableWrapper /> (数据表格区域)
    │   └── <Table /> (核心数据表格)
    │       ├── <Thead /> (表头)
    │       └── <Tbody /> (数据行)
    └── .xds-pagination-wrapper (分页器区域)
        └── <Pagination /> (分页组件)
```



#### 标准结构示例

```tsx
import React from 'react';
import {
  Button,
  Filter,
  FilterGroup,
  PageHeader,
  Pagination,
  Tab,
  Table,
  TableCellAction,
  TableCellAmount,
  TableCellOperation,
  TableCellProduct,
  TableWrapper,
  Tabs,
  Tbody,
  Thead,
  Th,
  Td,
  Tr,
} from '@xiaoyun-ds/components-web';

export function ListPageLayoutDemo() {
  return (
    <div className="app-content">
      <PageHeader
        title="团购商品管理"
        tabs={
          <Tabs variant="primary" size="small" defaultValue="all">
            <Tab value="all">全部商品</Tab>
            <Tab value="selling">出售中</Tab>
            <Tab value="off">已下架</Tab>
            <Tab value="review">审核中</Tab>
          </Tabs>
        }
      />

      <div style={{ marginBottom: '24px' }}>
        <FilterGroup size="small" onQuery={() => {}} onReset={() => {}}>
          <Filter type="input" size="small" label="商品名称" placeholder="请输入" value="" onChange={() => {}} />
          <Filter type="select" size="small" label="商品状态" placeholder="请选择" onClick={() => {}} />
          <Filter type="date" size="small" label="售卖日期" placeholder="请选择" onClick={() => {}} />
          <Filter type="time" size="small" label="售卖时间" placeholder="请选择" onClick={() => {}} />
        </FilterGroup>
      </div>

      <div className="xds-action-bar">
        <Tabs variant="capsule" size="small" defaultValue="all-member">
          <Tab value="all-member">全部会员可领</Tab>
          <Tab value="target-member">定向会员发放</Tab>
        </Tabs>
        <div className="xds-actions">
          <Button variant="primary" size="default-size" leftIcon={<Icon name="ic-plus-line" />}>
            新建会员优惠券
          </Button>
        </div>
      </div>

      <TableWrapper>
        <Table>
          <Thead>
            <Tr>
              <Th>商品信息</Th>
              <Th>价格（元）</Th>
              <Th>售卖时间</Th>
              <Th>剩余库存</Th>
              <Th>待核销</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td><TableCellProduct img="../../assets/images/shangpin.png" title="【节假日通用】资生堂烫染护理" tag="团购" tagVariant="default" id="23468723648223" /></Td>
              <Td><TableCellAmount>￥508.00</TableCellAmount></Td>
              <Td>2023.08.01 12:00</Td>
              <Td>10,000</Td>
              <Td>500</Td>
              <Td>
                <TableCellOperation>
                  <TableCellAction>上架</TableCellAction>
                  <TableCellAction>编辑</TableCellAction>
                </TableCellOperation>
              </Td>
            </Tr>
            <Tr>
              <Td><TableCellProduct img="../../assets/images/shangpin.png" title="【工作日可用】高级洗剪吹套餐" tag="热销" tagVariant="orange" id="89345723648224" /></Td>
              <Td><TableCellAmount>￥128.00</TableCellAmount></Td>
              <Td>2023.08.02 14:30</Td>
              <Td>8,500</Td>
              <Td>240</Td>
              <Td>
                <TableCellOperation>
                  <TableCellAction>下架</TableCellAction>
                  <TableCellAction danger>删除</TableCellAction>
                </TableCellOperation>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableWrapper>

      <div className="xds-pagination-wrapper">
        <Pagination
          total={500}
          defaultCurrent={2}
          defaultPageSize={10}
          pageSizeOptions={[10, 20, 50]}
          showSizeChanger
          showQuickJumper
        />
      </div>
    </div>
  );
}
```

---

## 页面规范使用指南（规范/文档/详情页通用）

> **不要新增容器层。** 业务页面的最外层容器永远是基础框架的 `.app-container` → `.app-body` → `.app-content`，`.app-content` 已经在 [base.css](../packages/components-web/styles/base.css) 中统一处理了 padding（`0 32px 32px`）、`overflow-y: auto`、圆角投影背景，**严禁在 `.app-content` 内部再嵌套自定义的 `.page-container`、`.layout-wrap` 等带 padding/background/min-height 的容器层** —— 否则会出现双重 padding、滚动嵌套、投影被遮等视觉错乱。
>
> 本节规定的是 `.app-content` **内部的"内容层"** 文字层级与模块结构，适用于「规范展示页」「文档页」「设置/详情页」等需要清晰文字层级和模块分隔的页面。列表页继续使用上方的 `<PageHeader>` + `<FilterGroup>` + `<Table>` + `<Pagination>` 结构即可。

### 文字层级（严格遵循 token，禁止 hardcoded）

| 层级 | 字号 / 行高 | 字重 | token | 用途 |
|---|---|---|---|---|
| 页面标题 | 22 / 36 | Bold (600) | `--font-size-2xl` + `--line-height-2xl` | 页面主标题 (`.page-title`)，**通常已由 `<PageHeader title=...>` 提供，不需要手写** |
| 一级模块标题 | 20 / 30 | Bold (600) | `--font-size-xl` + `--line-height-xl` | 模块主标题 (`.section-title`)，**前置 3×16px 竖线** |
| 二级标题 | 16 / 24 | Bold (600) | `--font-size-lg` + `--line-height-lg` | 子模块标题 (`.subsection-title`) |
| 三级标题 | 14 / 22 | Medium (500) | `--font-size-md` + `--line-height-md` | 小节标题 (`.subtitle`) |
| 正文 | 14 / 22 | Regular (400) | `--font-size-md` + `--line-height-md` | 正文 (`.body-text`) |
| 辅助信息 | 12 / 18 | Regular (400) | `--font-size-xs` + `--line-height-xs` | 次要说明 (`.secondary-text`) |

### 模块间距 token

> 以下 token 仅用于 `.app-content` **内部** 的模块/标题间距，**不要**用它们去重新设置外层 padding（外层 padding 由 `.app-content` 自己负责）。

| token | 值 | 用途 |
|---|---|---|
| `--spacing-page-title-to-first-section` | 20px | 页面标题与第一个模块间间距（仅当不使用 `<PageHeader>` 时用） |
| `--spacing-between-sections` | 32px | 各模块之间间距 |
| `--spacing-section-content` | 20px | 模块标题与模块内容之间间距 |
| `--layout-content-max-width` | 960px | 正文段落最大宽度上限（避免超长行降低可读性） |

### 推荐结构（内嵌在 `.app-content` 内部）

```tsx
import React from 'react';
import { PageHeader } from '@xiaoyun-ds/components-web';

export function SpecPage() {
  return (
    <div className="app-content">
      <PageHeader title="页面标题" />

      <div className="section">
        <h2 className="section-title">一级模块标题</h2>
        <div className="section-content">
          <h3 className="subsection-title">二级标题</h3>
          <p className="body-text">模块正文内容</p>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">另一个模块</h2>
        <div className="section-content">...</div>
      </div>
    </div>
  );
}
```

### 标准 CSS（**只定义内容层语义**，不动外层容器）

```css
/* —— 不要再写 .page-container —— */
/* .app-content 的 padding/overflow/background 由 base.css 统一负责，禁止覆盖 */

.section {
  margin-bottom: var(--spacing-between-sections);
}
.section:last-child { margin-bottom: 0; }

.section-title {
  font-size: var(--font-size-xl);
  line-height: var(--line-height-xl);
  font-weight: 600;
  color: var(--text-gray-5);
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 6px;
  margin: 0;
}
.section-title::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 16px;
  background: var(--text-gray-5);
  border-radius: 4px;
  margin-right: 6px;
  flex-shrink: 0;
}

.section-content {
  padding-top: var(--spacing-section-content);
}

.subsection-title {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-lg);
  font-weight: 600;
  color: var(--text-gray-5);
  margin: 0 0 12px;
}

.subtitle {
  font-size: var(--font-size-md);
  line-height: var(--line-height-md);
  font-weight: 500;
  color: var(--text-gray-5);
  margin: 0 0 8px;
}

.body-text {
  font-size: var(--font-size-md);
  line-height: var(--line-height-md);
  color: var(--text-gray-4);
  max-width: var(--layout-content-max-width);
}

.secondary-text {
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
  color: var(--text-gray-2);
}

/* 仅当不使用 <PageHeader> 时，才需要这个标题块（普通业务页应优先用 <PageHeader>） */
.page-header {
  margin-bottom: var(--spacing-page-title-to-first-section);
}
.page-title {
  font-size: var(--font-size-2xl);
  line-height: var(--line-height-2xl);
  font-weight: 600;
  color: var(--text-gray-5);
  margin: 0 0 var(--spacing-sm);
}
.page-summary {
  font-size: var(--font-size-md);
  line-height: var(--line-height-md);
  color: var(--text-gray-3);
  max-width: var(--layout-content-max-width);
  margin: 0;
}
```

### 关键约束

1. **不要新增外层容器**：`.app-content` 已经包好了 padding/scroll/background，规范层只能在它内部加内容元素，不要再包 `.page-container` / `.wrapper` 等带 padding/min-height 的层。
2. **不要 hardcoded**：字号/行高/间距/颜色全部走 token，禁止 `font-size: 24px` / `margin: 80px` / `color: #333` 等魔法值。
3. **section-title 必须带竖线**：`::before` 3×16px 竖线是规范的视觉标识。
4. **正文宽度上限 960px**：`max-width: var(--layout-content-max-width)`，避免超长行。
5. **优先 `<PageHeader>` 而非自写 `.page-title`**：业务页面用 `<PageHeader title="...">`；只有完全独立的非业务页面（如设计系统自身的预览页）才需要自定义 `.page-header` + `.page-title` 结构。
6. **不要 breadcrumb / 装饰性 emoji**：规范页面不用面包屑，标题前不加 🎨📝 等 emoji。


