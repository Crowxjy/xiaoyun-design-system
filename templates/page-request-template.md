# 页面需求模板（page-request-template）

> 本文件用于把产品同事的页面需求转成 AI 可稳定解析的结构化输入。
>
> 使用方式：
> 1. 拷贝下方「模板原文」到新文件 `templates/page-request-{需求名}-{YYYYMMDD}.md`
> 2. 严格按字段填写，不要新增自由发挥的段落
> 3. 把文件路径发给 AI（在 Trae 对话框里粘贴），AI 会按 [page-generation-pipeline](../skills/references/page-generation-pipeline.md) 生成 `demo/{需求名}/index.html`

---

## 硬规则（产物侧）

- **页面只允许由 23 个白名单组件构造**（详见下方"组件白名单"表）。AI **禁止**写原生 `<div>/<section>/<article>/<header>/<aside>` 等业务标签，仅允许使用规范定义的容器层（`.app-container` / `.app-body` / `.app-content` / `.section` / `.section-title` / `.section-content`）。
- 所有视觉值（颜色、字号、行高、间距、圆角、阴影）必须映射到 [tokens.md](../skills/references/tokens.md) 的 token，**禁止硬编码** `#rrggbb`、`px`、`rem`、`em` 数值（`<svg>` 内部 `<path>` 的 `fill` / `stroke` 例外）。
- 标题层级硬约束：页面标题 22/600，section 标题 20/600 + 3×16 灰色竖线前缀，subsection 16/600。
- 页面描述最大宽度 960px，与 designsystem 对齐。
- 暂时禁止 emoji 装饰、面包屑、计数徽章等非规范元素。

---

## 组件白名单（23 项）

| 分类 | 组件名 | 用途速查 |
|---|---|---|
| 容器/导航 | `PageHeader` | 页面顶部，含标题与可选 Tabs |
| | `Navbar` | 全局顶部导航（一级菜单） |
| | `Menu` | 侧栏菜单 |
| | `TabNav` | 主导航标签（页面级） |
| | `Tabs` | 内容切换标签（区块级） |
| 工具栏 | `FilterGroup` | 响应式筛选容器，组合多个 `Filter` + 查询/重置 |
| | `Filter` | 单个筛选控件（input / select / date / time） |
| | `TimeFilter` | 两行式时间筛选（统计范围 + 对比范围） |
| 数据展示 | `Table` | 表格（含 `NormalTable` 等组合式 named export） |
| | `Pagination` | 分页 |
| | `MetricCard` | 指标卡（同文件 named export 含 `MetricCardGroup`） |
| | `Charts` | 图表（基于 VChart） |
| | `Diagnosis` | 诊断卡（AI 内容、单/多卡片） |
| 表单原子 | `Input` | 文本输入框 |
| | `Select` | 选择器；如需自定义浮层请配合并列的 `Dropdown` |
| | `Dropdown` | 下拉浮层（独立白名单组件） |
| | `Checkbox` | 多选框 |
| | `Capsule` | 胶囊形单选切换 |
| 通用原子 | `Button` | 按钮（5 种 variant） |
| | `Tag` | 标签（与 `Tags` 并列） |
| | `Tags` | 标签组容器（与 `Tag` 并列） |
| | `Icon` | 图标 |
| | `Loading` | 加载态 |

> 完整 props 与 variant 见 [components.md](../skills/references/components.md) 与各组件单独规范文档。

---

## 模板原文（请整段复制）

```markdown
# 页面需求：{需求名}

## 元信息
- 提交人：
- 提交日期：YYYY-MM-DD
- 业务模块：销运 / 数据看板 / 商家管理 / 其他
- 目标用户：BD / 销售 / 运营 / 商家 / 内部管理员

## 页面目标（1 句话 + 最多 3 条 KPI）
- 核心目标：{用一句话描述这个页面是给谁看、解决什么问题}
- 衡量指标（最多 3 条）：
  1.
  2.
  3.

## 信息架构（缩进树状，仅写"组件名 + 一句话作用"，不要写 DOM）
- PageHeader: {标题文案}
  - tabs: [{tab 名}, {tab 名}]    # 没有就删
- Section L1: {章节中文标题}
  - 组件名: {作用}
  - 组件名: {作用}
- Section L2: {章节中文标题}
  - 组件名: {作用}

> 约束：
> - 每个 Section 必须以"3×16 竖线 + 中文标题"渲染（h2，20/600）
> - 仅可使用上方"组件白名单"里的 22 个组件
> - 若白名单不能覆盖，请在"边界要求"里说明，由 AI 升级提案而非自己写 DOM

## 关键数据（每个数据来源都要写示例值；mock 即可）
| 字段名 | 类型 | 示例值 | 来源 |
|---|---|---|---|
| order_count | number | 12580 | mock |
| order_trend | percent | +12.4% | mock |
|  |  |  |  |

## 关键交互（按"动作 → 结果"列写，禁止描述 DOM）
1. 点击 {组件名} 的 {元素} → {结果}（例：点击 Table 的 "查看详情" → 弹出 Diagnosis 浮层）
2.

## 视觉参考（图片附件）
- 路径：`templates/_attachments/{需求名}/`
- 文件清单：
  - reference-1.png：{图片说明，例：整体页面布局参考}
  - reference-2.png：{图片说明，例：选中态参考}

> AI 必读：
> 图片仅作为「层级与组件选择参考」。AI 必须在产物 README 里输出"图片解读 → token 映射表"，
> 禁止用取色器从图片复制 hex 值，颜色一律映射到 tokens.md 的 token。

## 边界要求（硬约束 / 黑白名单）
- 必须使用：{列出强制要用的组件，例：MetricCardGroup + Table + Pagination}
- 禁止使用：{列出禁止的，例：Charts}
- 数据规模假设：表格 ≤ 200 行；指标卡 ≤ 5 张；筛选项 ≤ 6 个
- 响应式：仅做桌面端 ≥1280px，不做移动端

## 验收标准（AI 自检 + 人工复核都按这条清单跑）
- [ ] 产物为单文件 `demo/{需求名}/index.html`，双击即可打开
- [ ] 仅 import `@xiaoyun-ds/components-web` 的白名单组件，未出现原生业务 DOM
- [ ] 所有色值/字号/间距走 token，无硬编码
- [ ] 标题层级符合 22/600 + 20/600 + 16/600 三档
- [ ] 页面描述（若有）`max-width: 960px`
- [ ] 数据全部 mock，字段名与"关键数据"表一致
- [ ] AI 在 `demo/{需求名}/README.md` 输出：图片解读、组件选型理由、token 映射表、自检结果
```

---

## 范例 1：看板页（指标 + 图表 + 诊断）

```markdown
# 页面需求：商家经营看板

## 元信息
- 提交人：张三
- 提交日期：2026-05-12
- 业务模块：销运 / 数据看板
- 目标用户：BD

## 页面目标
- 核心目标：BD 一眼看清自己负责的商家本月经营关键指标，定位需要重点跟进的商家
- 衡量指标：
  1. GMV 月环比
  2. 解决率 vs 区域均值
  3. 待处理工单数

## 信息架构
- PageHeader: 商家经营看板
  - tabs: [本月, 本季]
- Section L1: 关键指标
  - MetricCardGroup: 4 张指标卡（GMV / 订单数 / 解决率 / 待处理工单），可选中切换下方图表
- Section L1: 趋势分析
  - Tabs: [按日, 按周, 按月]
  - Charts: 折线图，展示当前选中指标的时间序列
- Section L1: AI 诊断
  - Diagnosis: 单卡片多 sections，给出"现状/问题/建议"

## 关键数据
| 字段名 | 类型 | 示例值 | 来源 |
|---|---|---|---|
| gmv | currency | ¥ 88.6 万 | mock |
| gmv_trend | percent | +12.4% | mock |
| order_count | number | 12580 | mock |
| solve_rate | percent | 87.2% | mock |
| pending_ticket | number | 14 | mock |
| daily_series | number[] | [..30 条..] | mock |

## 关键交互
1. 点击 MetricCardGroup 的某张卡 → 下方 Charts 切换为该指标的趋势
2. 点击 Tabs 的"按日/按周/按月" → Charts 切换粒度
3. PageHeader 的 tabs 切换"本月/本季" → 全部数据 mock 切换

## 视觉参考
- 路径：`templates/_attachments/business-dashboard/`
- 文件清单：
  - reference-1.png：整体看板布局
  - reference-2.png：MetricCardGroup 选中态

## 边界要求
- 必须使用：MetricCardGroup + Charts + Diagnosis
- 禁止使用：Table（本期不要表格）
- 数据规模：daily_series ≤ 30 个点
- 响应式：桌面端 ≥1280px

## 验收标准
- [ ] 单文件产物 demo/business-dashboard/index.html
- [ ] 仅白名单组件，无原生业务 DOM
- [ ] 全 token，无硬编码
- [ ] 三档标题 22/20/16 + 600
- [ ] mock 数据齐全
- [ ] README 含图片解读 + 组件选型理由
```

---

## 范例 2：列表页（筛选 + 表格 + 分页）

```markdown
# 页面需求：工单列表

## 元信息
- 提交人：李四
- 提交日期：2026-05-12
- 业务模块：销运 / 商家管理
- 目标用户：BD / 内部管理员

## 页面目标
- 核心目标：BD 在工单列表中按状态/区域筛选并批量处理待解决工单
- 衡量指标：
  1. 列表加载时间
  2. 单次筛选切换时间
  3. 批量操作完成率

## 信息架构
- PageHeader: 工单列表
- Section L1: 筛选与操作
  - FilterGroup: 含 4 个 Filter（工单状态/区域/创建时间/关键词）
  - Button: 主按钮"批量处理"（Primary）
- Section L1: 工单列表
  - Table: 7 列（工单号/商家名/区域/状态/创建时间/优先级/操作）
  - Pagination: 默认每页 20 条

## 关键数据
| 字段名 | 类型 | 示例值 | 来源 |
|---|---|---|---|
| ticket_id | string | T20260512-0001 | mock |
| merchant_name | string | 川渝小面 | mock |
| region | enum | 川渝 / 华东 / 华北 | mock |
| status | enum(Tag) | 待处理(orange) / 处理中(blue) / 已解决(green) | mock |
| created_at | datetime | 2026-05-10 14:32 | mock |
| priority | enum(Tag) | 高(red) / 中(orange) / 低(gray) | mock |

## 关键交互
1. FilterGroup 任意 Filter 变化 → 列表 mock 数据按条件过滤
2. 点击 Table "查看详情"操作列 → console.log（无需弹层）
3. 点击 Pagination 页码 → 切换 mock 数据
4. 点击"批量处理"按钮 → console.log 选中行 ID

## 视觉参考
- 路径：`templates/_attachments/ticket-list/`
- 文件清单：
  - reference-1.png：列表整体
  - reference-2.png：状态 Tag 配色

## 边界要求
- 必须使用：FilterGroup + Filter + Table + Pagination + Tag
- 禁止使用：Charts / MetricCard
- 数据规模：mock 60 条工单，分 3 页
- 响应式：桌面端 ≥1280px

## 验收标准
- [ ] 单文件产物 demo/ticket-list/index.html
- [ ] 仅白名单组件
- [ ] 全 token
- [ ] 三档标题
- [ ] mock 60 条 + 分页正确
- [ ] README 含图片解读
```

---

## 范例 3：详情页（信息分块 + AI 诊断）

```markdown
# 页面需求：商家详情

## 元信息
- 提交人：王五
- 提交日期：2026-05-12
- 业务模块：销运 / 商家管理
- 目标用户：BD

## 页面目标
- 核心目标：BD 打开单个商家详情时，能快速看清基础信息、近期表现、AI 诊断与待办
- 衡量指标：
  1. 信息查找时间
  2. AI 诊断点击率
  3. 待办处理及时率

## 信息架构
- PageHeader: 商家详情 - {商家名}
  - tabs: [概览, 经营数据, 工单, 联系记录]
- Section L1: 基础信息
  - 由 4 个并排的 MetricCard（非可选中，theme=gray）展示：商家ID / 入驻时间 / 等级 / 联系人
- Section L1: 经营趋势
  - Tabs: [GMV, 订单数, 解决率]
  - Charts: 折线图
- Section L1: AI 诊断
  - Diagnosis: layout=multiple，3 张并列子卡片（现状 / 问题 / 建议）
- Section L1: 待办工单
  - Table: 5 列简表（工单号/状态/优先级/创建时间/操作）
  - Pagination: 每页 10 条

## 关键数据
| 字段名 | 类型 | 示例值 | 来源 |
|---|---|---|---|
| merchant_id | string | M-2024-0089 | mock |
| join_date | date | 2024-08-15 | mock |
| level | enum | 钻石 / 金牌 / 普通 | mock |
| contact | string | 张老板 138****0089 | mock |
| trend_series | number[] | [..30 条..] | mock |
| pending_tickets | object[] | [{id, status, priority, time}] × 12 | mock |

## 关键交互
1. PageHeader 的 tabs 切换 → 主体内容 mock 切换（本期仅"概览"实现，其余 tab 显示 Loading 占位）
2. Tabs（GMV/订单/解决率） → Charts 切指标
3. Diagnosis 内的"查看详细"按钮 → console.log

## 视觉参考
- 路径：`templates/_attachments/merchant-detail/`
- 文件清单：
  - reference-1.png：详情页骨架
  - reference-2.png：Diagnosis 多卡片样式

## 边界要求
- 必须使用：PageHeader + MetricCard(theme=gray, 不可选中) + Tabs + Charts + Diagnosis + Table + Pagination
- 禁止使用：FilterGroup（详情页不出现筛选）
- 数据规模：trend_series 30 个点；pending_tickets 12 条，分 2 页
- 响应式：桌面端 ≥1280px

## 验收标准
- [ ] 单文件产物 demo/merchant-detail/index.html
- [ ] 仅白名单组件
- [ ] 全 token
- [ ] 三档标题
- [ ] gray 主题 MetricCard 默认不可点（is-clickable 不应出现）
- [ ] Diagnosis layout=multiple 三卡并列
- [ ] README 含图片解读
```

---

## 附：常见错误与"硬约束 → 应这样改"对照

| ❌ 错误写法 | ✅ 应这样改 | 依据 |
|---|---|---|
| `<div className="card">…</div>` | `<MetricCard ... />` | 仅白名单组件 |
| `<button style={{background:'#5171FF'}}>` | `<Button variant="primary">` | 全 token |
| `style={{padding: '24px'}}` | 走 `var(--spacing-page-padding-*)` 或 `--spacing-*` token | 全 token |
| `<h2 style={{fontSize:'20px'}}>` | `<h2 className="section-title">` 走 layout.md 内置规则 | 三档标题硬约束 |
| 在 `.app-content` 外再嵌一层 `.page-container` | 直接用 `.app-content` 内放 `.section` | 不破坏 base.css 框架 |
| 把图片里的 `#5B65EC` 直接写到 css | 映射到 `--primary-5` 或最接近的 token | 图片解读规则 |

---

## 附：模板填写后的提交动线

```
1. 用 templates/_attachments/{需求名}/ 放图片
2. 复制本文件「模板原文」段到 templates/page-request-{需求名}-YYYYMMDD.md，按字段填写
3. 在 Trae 对话框输入：「按 SKILL 与 page-generation-pipeline 处理 templates/page-request-xxx.md，输出到 demo/xxx/」
4. AI 生成 demo/xxx/index.html 与 demo/xxx/README.md
5. 双击 index.html 验收，不满意继续在 Trae 对话框迭代
```
