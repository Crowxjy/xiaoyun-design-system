import React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

type ButtonSize = 'large' | 'default-size' | 'small';
type ButtonVariant = 'primary' | 'default' | 'secondary' | 'outline' | 'text' | 'text-primary' | 'text-secondary' | 'icon';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The size of the button
     * @default 'default-size'
     */
    size?: ButtonSize;
    /**
     * The variant of the button
     * @default 'default'
     */
    variant?: ButtonVariant;
    /**
     * Optional icon to render inside the button. For 'icon' variant, this is the only content.
     */
    icon?: React.ReactNode;
    /**
     * Optional left icon. `icon` remains as a legacy alias.
     */
    leftIcon?: React.ReactNode;
    /**
     * Optional right icon.
     */
    rightIcon?: React.ReactNode;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

declare global {
    interface Window {
        VChart?: {
            new (spec: Record<string, unknown>, options: {
                dom: HTMLElement;
            }): {
                renderSync?: () => void;
                render?: () => void;
                release?: () => void;
            };
        };
    }
}
type ChartType = 'line' | 'bar' | 'bar-horizontal' | 'pie' | 'scatter' | 'waterfall';
interface ChartsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'data'> {
    type?: ChartType;
    spec?: Record<string, unknown>;
    data?: Array<Record<string, unknown>>;
    height?: number;
    emptyText?: React.ReactNode;
}
declare const Charts: React.ForwardRefExoticComponent<ChartsProps & React.RefAttributes<HTMLDivElement>>;

interface IconProps extends React.SVGProps<SVGSVGElement> {
    /**
     * The ID of the icon in the SVG sprite (e.g., 'ic-add-round-line')
     */
    name: string;
}
declare const Icon: React.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React.RefAttributes<SVGSVGElement>>;

interface CapsuleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: 'large' | 'default-size' | 'small';
    label: React.ReactNode;
}
declare const Capsule: React.ForwardRefExoticComponent<CapsuleProps & React.RefAttributes<HTMLInputElement>>;

interface DiagnosisButton {
    text: React.ReactNode;
    type?: ButtonVariant;
}
interface DiagnosisContentPart {
    text: React.ReactNode;
    bold?: boolean;
    color?: 'primary' | 'danger' | 'success';
    customColor?: string;
    title?: boolean;
    link?: {
        url?: string;
        onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    };
    button?: boolean;
    buttonType?: ButtonVariant;
    buttonSize?: ButtonSize;
    iconRight?: React.ReactNode;
    onButtonClick?: (part: DiagnosisContentPart) => void;
}
interface DiagnosisListItem {
    title?: React.ReactNode;
    text?: React.ReactNode;
    parts?: DiagnosisContentPart[];
}
interface DiagnosisSection {
    title?: React.ReactNode;
    items: DiagnosisListItem[];
}
interface DiagnosisCard {
    sections: DiagnosisSection[];
    buttons?: DiagnosisButton[];
}
interface DiagnosisProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    title?: React.ReactNode;
    cards: DiagnosisCard[];
    buttons?: DiagnosisButton[];
    layout?: 'single' | 'multiple';
    onButtonClick?: (buttonIndex: number, button: DiagnosisButton, cardIndex?: number) => void;
    onPartClick?: (part: DiagnosisContentPart) => void;
}
declare const Diagnosis: React.ForwardRefExoticComponent<DiagnosisProps & React.RefAttributes<HTMLDivElement>>;

interface DropdownOption {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
}
interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    options: DropdownOption[];
    value?: string;
    open?: boolean;
    /**
     * 点击列表外部时自动关闭。默认开启；仅在受控（提供了 onClose）时生效。
     * @default true
     */
    closeOnClickOutside?: boolean;
    /**
     * 关闭回调。配合 closeOnClickOutside 与受控 open 使用。
     */
    onClose?: () => void;
    onChange?: (value: string, option: DropdownOption) => void;
}
declare const Dropdown: React.ForwardRefExoticComponent<DropdownProps & React.RefAttributes<HTMLDivElement>>;

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
    size?: 'large' | 'default-size' | 'small';
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    clearable?: boolean;
    onClear?: () => void;
    wrapperClassName?: string;
    isFocused?: boolean;
    error?: boolean;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

type FilterType = 'input' | 'select' | 'date' | 'time';
type FilterSize = 'default-size' | 'small';
type CommonProps = {
    /**
     * 筛选器类型
     */
    type: FilterType;
    /**
     * 尺寸
     * @default 'default-size'
     */
    size?: FilterSize;
    /**
     * 左侧字段标题
     */
    label: React.ReactNode;
    /**
     * 占位文案（未填充时展示）
     */
    placeholder?: React.ReactNode;
    /**
     * 禁用
     * @default false
     */
    disabled?: boolean;
    /**
     * 强制激活态（用于文档页/受控外观）
     * @default false
     */
    isActive?: boolean;
    /**
     * 覆盖右侧图标（默认按 type 选择）
     */
    rightIcon?: React.ReactNode;
    /**
     * 组件宽度（默认 294px，符合当前组件规范）
     */
    width?: number | string;
};
type FilterInputProps = CommonProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> & {
    type: 'input';
    value?: string;
    defaultValue?: string;
    onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
    inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue' | 'disabled' | 'onChange' | 'placeholder' | 'className'>;
};
type FilterButtonProps = CommonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'value' | 'defaultValue'> & {
    type: Exclude<FilterType, 'input'>;
    value?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
type FilterProps = FilterInputProps | FilterButtonProps;
declare const Filter: React.ForwardRefExoticComponent<FilterProps & React.RefAttributes<HTMLElement>>;

interface FilterGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 过滤项尺寸（用于按钮尺寸对齐；筛选项本身由使用方传入）
     * @default 'small'
     */
    size?: FilterSize;
    /**
     * Grid 单元最小宽度。默认按当前组件规范的 294px 让容器自适应 3/4/更多列。
     * @default 294
     */
    minItemWidth?: number;
    /**
     * 间距（px）
     * @default 12
     */
    gap?: number;
    /**
     * 点击查询
     */
    onQuery?: () => void;
    /**
     * 点击重置
     */
    onReset?: () => void;
    /**
     * 是否显示默认 Query/Reset 操作区
     * 当传入 onQuery 或 onReset 时，默认展示对应按钮
     */
    showActions?: boolean;
    /**
     * 覆盖操作区（若传入则完全自定义）
     */
    actions?: React.ReactNode;
    /**
     * 查询按钮文案
     * @default '查询'
     */
    queryText?: string;
    /**
     * 重置按钮文案
     * @default '重置'
     */
    resetText?: string;
}
declare const FilterGroup: React.ForwardRefExoticComponent<FilterGroupProps & React.RefAttributes<HTMLDivElement>>;

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'small' | 'default-size' | 'large';
    text?: React.ReactNode;
    minHeight?: number | string;
}
declare const Loading: React.ForwardRefExoticComponent<LoadingProps & React.RefAttributes<HTMLDivElement>>;

type MetricCardTheme = 'color-1' | 'color-2' | 'color-3' | 'color-4' | 'color-5' | 'light-purple' | 'gray';
type MetricCardSize = 'default-size' | 'small';
interface MetricCardMetricValue {
    value: React.ReactNode;
    type?: 'success' | 'danger' | 'default';
}
interface MetricCardMetricItem {
    label?: React.ReactNode;
    value: React.ReactNode | MetricCardMetricValue;
}
interface MetricCardProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title' | 'value'> {
    title: React.ReactNode;
    value: React.ReactNode;
    currency?: React.ReactNode;
    unit?: React.ReactNode;
    metrics?: MetricCardMetricItem[];
    theme?: MetricCardTheme;
    size?: MetricCardSize;
    selected?: boolean;
    showInfo?: boolean;
    arrowDirection?: 'bottom' | 'right';
    /**
     * 是否可交互（hover 边框 / selected 边框 / 装饰图隐藏）。
     * 不传时按是否绑定 onClick 自动推断。
     */
    clickable?: boolean;
}
declare const MetricCard: React.ForwardRefExoticComponent<MetricCardProps & React.RefAttributes<HTMLButtonElement>>;
interface MetricCardGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    cards: Array<Omit<MetricCardProps, 'selected'> & {
        id: string;
    }>;
    value?: string;
    defaultValue?: string;
    selectable?: boolean;
    onChange?: (value: string) => void;
}
declare const MetricCardGroup: React.ForwardRefExoticComponent<MetricCardGroupProps & React.RefAttributes<HTMLDivElement>>;

interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    variant?: 'primary' | 'capsule' | 'filter';
    size?: 'large' | 'small';
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
}
declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
interface TabProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'value'> {
    value?: string;
    disabled?: boolean;
    active?: boolean;
}
declare const Tab: React.ForwardRefExoticComponent<TabProps & React.RefAttributes<HTMLAnchorElement>>;

interface TabNavItem {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
}
interface TabNavProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    items?: TabNavItem[];
    value?: string;
    defaultValue?: string;
    size?: 'default-size' | 'large';
    onChange?: (value: string) => void;
    rightContent?: React.ReactNode;
}
declare const TabNav: React.ForwardRefExoticComponent<TabNavProps & React.RefAttributes<HTMLDivElement>>;

declare const Navbar: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

interface MenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * 受控：当前激活的默认菜单项 key
     */
    activeItemKey?: string;
    /**
     * 非受控：默认激活的默认菜单项 key
     * @default 'store-store-management'
     */
    defaultActiveItemKey?: string;
    /**
     * 菜单项点击回调
     */
    onItemChange?: (itemKey: string) => void;
}
declare const Menu: React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLDivElement>>;

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: React.ReactNode;
    tabs?: React.ReactNode;
}
declare const PageHeader: React.ForwardRefExoticComponent<PageHeaderProps & React.RefAttributes<HTMLDivElement>>;

declare const NormalTableWrapper: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const NormalTable: React.ForwardRefExoticComponent<React.TableHTMLAttributes<HTMLTableElement> & React.RefAttributes<HTMLTableElement>>;
declare const Thead: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const Tbody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
declare const Tr: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
declare const Th: React.ForwardRefExoticComponent<React.ThHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const Td: React.ForwardRefExoticComponent<React.TdHTMLAttributes<HTMLTableCellElement> & React.RefAttributes<HTMLTableCellElement>>;
declare const TableCellProduct: ({ img, title, tag, tagVariant, id }: any) => react_jsx_runtime.JSX.Element;
declare const TableCellAmount: ({ children }: any) => react_jsx_runtime.JSX.Element;
declare const TableCellOperation: ({ children }: any) => react_jsx_runtime.JSX.Element;
interface TableCellActionProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    danger?: boolean;
}
declare const TableCellAction: React.ForwardRefExoticComponent<TableCellActionProps & React.RefAttributes<HTMLAnchorElement>>;
type TableCellMetricType = 'success' | 'danger' | 'default';
interface TableCellSubMetric {
    label?: React.ReactNode;
    value?: React.ReactNode | {
        value: React.ReactNode;
        type?: TableCellMetricType;
    };
    values?: Array<React.ReactNode | {
        value: React.ReactNode;
        type?: TableCellMetricType;
    }>;
    type?: TableCellMetricType;
}
interface TableCellStandardValue {
    main?: React.ReactNode;
    sub?: React.ReactNode | TableCellSubMetric[];
}
interface TableCellMetricValue {
    currency?: React.ReactNode;
    number?: React.ReactNode;
    unit?: React.ReactNode;
    sub?: React.ReactNode | TableCellSubMetric[];
}
interface TableColumn {
    key?: string;
    title: React.ReactNode;
    children?: TableColumn[];
    isMetric?: boolean;
    metricStyle?: 'enhanced' | 'plain';
    render?: (value: any, row: TableRowData, rowIndex: number) => React.ReactNode;
}
interface TableRowData {
    [key: string]: any;
    isSummary?: boolean;
}
interface TableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    data: TableRowData[];
    columns: TableColumn[];
    frozenColumnCount?: number;
    multiLevelHeader?: boolean;
    lastRowBorder?: boolean;
    groupDividerLeafIndices?: number[];
}
declare const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLDivElement>>;

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * 尺寸大小
     * @default 'default-size'
     */
    size?: 'large' | 'default-size' | 'small';
    /**
     * 是否半选
     * @default false
     */
    indeterminate?: boolean;
    /**
     * 是否显示右侧文案
     * @default false
     */
    showLabel?: boolean;
    /**
     * 右侧文案内容
     */
    label?: React.ReactNode;
}
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;

type TagSize = 'large' | 'default-size' | 'small';
type TagVariant = 'fill' | 'light' | 'outline';
type TagColor = 'blue' | 'green' | 'orange' | 'red' | 'gray';
type TagSpecial = 'special-1' | 'special-2' | 'special-3';
interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    /**
     * 标签尺寸
     * @default 'default-size'
     */
    size?: TagSize;
    /**
     * 标签样式类型
     * @default 'light'
     */
    variant?: TagVariant;
    /**
     * 标签语义色
     * @default 'gray'
     */
    color?: TagColor;
    /**
     * 左侧图标，可选
     */
    leftIcon?: React.ReactNode;
    /**
     * 右侧图标，可选
     */
    rightIcon?: React.ReactNode;
    /**
     * 特殊样式，来自 designsystem 的品牌标签。
     */
    special?: TagSpecial;
}
declare const Tag: React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLSpanElement>>;

interface TagsProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const Tags: React.ForwardRefExoticComponent<TagsProps & React.RefAttributes<HTMLDivElement>>;

type PaginationSize = 'default-size' | 'small';
interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
    /**
     * 尺寸
     * @default 'default-size'
     */
    size?: PaginationSize;
    /**
     * 总条数
     */
    total: number;
    /**
     * 受控：当前页（从 1 开始）
     */
    current?: number;
    /**
     * 非受控：默认当前页（从 1 开始）
     * @default 1
     */
    defaultCurrent?: number;
    /**
     * 受控：每页条数
     */
    pageSize?: number;
    /**
     * 非受控：默认每页条数
     */
    defaultPageSize?: number;
    /**
     * 每页条数候选
     * @default [10, 20, 50]
     */
    pageSizeOptions?: number[];
    /**
     * 是否显示每页条数切换
     * @default true
     */
    showSizeChanger?: boolean;
    /**
     * 是否显示快速跳页
     * @default true
     */
    showQuickJumper?: boolean;
    /**
     * 单页时隐藏
     * @default true
     */
    hideOnSinglePage?: boolean;
    /**
     * 是否禁用整组交互
     * @default false
     */
    disabled?: boolean;
    /**
     * 折叠显示时，当前页两侧保留的页码数量
     * @default 1
     */
    siblingCount?: number;
    /**
     * 页码/条数变化回调
     */
    onChange?: (page: number, pageSize: number) => void;
    /**
     * 仅每页条数变化回调
     */
    onPageSizeChange?: (pageSize: number) => void;
    /**
     * 自定义总数展示
     */
    showTotal?: (total: number, range: [number, number]) => React.ReactNode;
}
declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLElement>>;

interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    label?: React.ReactNode;
    placeholder?: string;
    options: DropdownOption[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string, option: DropdownOption) => void;
}
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLDivElement>>;

interface TimeFilterOption {
    value: string;
    label: React.ReactNode;
}
interface TimeFilterChangePayload {
    stat: string;
    compare: string;
    statRange?: {
        start: Date;
        end: Date;
    } | null;
    compareRange?: {
        start: Date;
        end: Date;
    } | null;
}
interface TimeFilterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    statOptions?: TimeFilterOption[];
    compareOptionsMap?: Record<string, TimeFilterOption[]>;
    defaultStat?: string;
    defaultCompare?: string;
    emphasis?: boolean;
    onChange?: (value: TimeFilterChangePayload) => void;
}
declare const TimeFilter: React.ForwardRefExoticComponent<TimeFilterProps & React.RefAttributes<HTMLDivElement>>;

export { Button, type ButtonProps, type ButtonSize, type ButtonVariant, Capsule, type CapsuleProps, type ChartType, Charts, type ChartsProps, Checkbox, type CheckboxProps, Diagnosis, type DiagnosisButton, type DiagnosisCard, type DiagnosisContentPart, type DiagnosisListItem, type DiagnosisProps, type DiagnosisSection, Dropdown, type DropdownOption, type DropdownProps, Filter, type FilterButtonProps, FilterGroup, type FilterGroupProps, type FilterInputProps, type FilterProps, type FilterSize, type FilterType, Icon, type IconProps, Input, type InputProps, Loading, type LoadingProps, Menu, type MenuProps, MetricCard, MetricCardGroup, type MetricCardGroupProps, type MetricCardMetricItem, type MetricCardMetricValue, type MetricCardProps, type MetricCardSize, type MetricCardTheme, Navbar, NormalTable, NormalTableWrapper, PageHeader, type PageHeaderProps, Pagination, type PaginationProps, type PaginationSize, Select, type SelectProps, Tab, TabNav, type TabNavItem, type TabNavProps, type TabProps, Table, TableCellAction, type TableCellActionProps, TableCellAmount, type TableCellMetricType, type TableCellMetricValue, TableCellOperation, TableCellProduct, type TableCellStandardValue, type TableCellSubMetric, type TableColumn, type TableProps, type TableRowData, Tabs, type TabsProps, Tag, type TagColor, type TagProps, type TagSize, type TagSpecial, type TagVariant, Tags, type TagsProps, Tbody, Td, Th, Thead, TimeFilter, type TimeFilterChangePayload, type TimeFilterOption, type TimeFilterProps, Tr };
