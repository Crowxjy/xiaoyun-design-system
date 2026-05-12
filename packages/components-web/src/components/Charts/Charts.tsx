import React from 'react';
import { clsx } from 'clsx';

declare global {
  interface Window {
    VChart?: {
      new (spec: Record<string, unknown>, options: { dom: HTMLElement }): {
        renderSync?: () => void;
        render?: () => void;
        release?: () => void;
      };
    };
  }
}

export type ChartType = 'line' | 'bar' | 'bar-horizontal' | 'pie' | 'scatter' | 'waterfall';

export interface ChartsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'data'> {
  type?: ChartType;
  spec?: Record<string, unknown>;
  data?: Array<Record<string, unknown>>;
  height?: number;
  emptyText?: React.ReactNode;
}

function readVar(name: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function getCategoricalColors(): string[] {
  return [
    readVar('--data-chart-1b'),
    readVar('--data-chart-2'),
    readVar('--data-chart-3'),
    readVar('--data-chart-4'),
    readVar('--data-chart-7'),
    readVar('--data-chart-8'),
    readVar('--data-chart-9')
  ].filter(Boolean);
}

function getCategoricalColorsWithPrimary(): string[] {
  return [
    readVar('--data-chart-1a'),
    readVar('--data-chart-2'),
    readVar('--data-chart-3'),
    readVar('--data-chart-4'),
    readVar('--data-chart-7'),
    readVar('--data-chart-8'),
    readVar('--data-chart-9')
  ].filter(Boolean);
}

function getSequentialColors(): string[] {
  return [
    readVar('--data-chart-1a'),
    readVar('--data-chart-1b'),
    readVar('--data-chart-2'),
    readVar('--data-chart-3'),
    readVar('--data-chart-4'),
    readVar('--data-chart-5'),
    readVar('--data-chart-6'),
    readVar('--data-chart-7'),
    readVar('--data-chart-8'),
    readVar('--data-chart-9')
  ].filter(Boolean);
}

function getWaterfallColors() {
  return {
    positive: readVar('--data-chart-8'),
    negative: readVar('--data-chart-9')
  };
}

const DEFAULT_LINE_VALUES = [
  { month: '1月', value: 22, series: '系列1' }, { month: '2月', value: 13, series: '系列1' },
  { month: '3月', value: 25, series: '系列1' }, { month: '4月', value: 29, series: '系列1' },
  { month: '5月', value: 38, series: '系列1' }, { month: '6月', value: 32, series: '系列1' },
  { month: '7月', value: 35, series: '系列1' },
  { month: '1月', value: 18, series: '系列2' }, { month: '2月', value: 25, series: '系列2' },
  { month: '3月', value: 18, series: '系列2' }, { month: '4月', value: 32, series: '系列2' },
  { month: '5月', value: 28, series: '系列2' }, { month: '6月', value: 35, series: '系列2' },
  { month: '7月', value: 29, series: '系列2' }
];

const DEFAULT_BAR_VALUES = [
  { category: '产品A', value: 200 }, { category: '产品B', value: 150 },
  { category: '产品C', value: 120 }, { category: '产品D', value: 80 },
  { category: '产品E', value: 70 }
];

const DEFAULT_BAR_HORIZONTAL_VALUES = [
  { category: '商家自播+代播', value: 290 },
  { category: '达人一带多', value: 230 },
  { category: '达人一带多2', value: 200 },
  { category: '达人一带一', value: 170 },
  { category: '服务商代播', value: 150 }
];

const DEFAULT_PIE_VALUES = [
  { type: '直播', value: 35 }, { type: '视频', value: 25 },
  { type: '商品', value: 20 }, { type: '其他', value: 20 }
];

const DEFAULT_SCATTER_VALUES = Array.from({ length: 30 }, (_, i) => ({
  x: i + Math.random() * 6,
  y: 20 + Math.random() * 60,
  series: i % 3 === 0 ? '系列A' : i % 3 === 1 ? '系列B' : '系列C'
}));

const DEFAULT_WATERFALL_VALUES = [
  { name: '初始', value: 100 },
  { name: '增加A', value: 30 },
  { name: '增加B', value: 20 },
  { name: '减少A', value: -25 },
  { name: '减少B', value: -10 },
  { name: '最终', value: 115 }
];

function getLineSpec(values?: Array<Record<string, unknown>>): Record<string, unknown> {
  return {
    type: 'line',
    data: [{ id: 'lineData', values: values?.length ? values : DEFAULT_LINE_VALUES }],
    xField: 'month',
    yField: 'value',
    seriesField: 'series',
    color: { type: 'ordinal', range: getCategoricalColors() },
    point: { visible: true, size: 6 },
    line: { style: { lineWidth: 2 } },
    crosshair: { xField: { visible: true } },
    tooltip: { visible: true }
  };
}

function getBarSpec(values?: Array<Record<string, unknown>>): Record<string, unknown> {
  return {
    type: 'bar',
    data: [{ id: 'barData', values: values?.length ? values : DEFAULT_BAR_VALUES }],
    xField: 'category',
    yField: 'value',
    seriesField: 'category',
    color: { type: 'ordinal', range: getCategoricalColorsWithPrimary() },
    crosshair: { yField: { visible: true } },
    tooltip: { visible: true }
  };
}

function getBarHorizontalSpec(values?: Array<Record<string, unknown>>): Record<string, unknown> {
  return {
    type: 'bar',
    data: [{ id: 'barhData', values: values?.length ? values : DEFAULT_BAR_HORIZONTAL_VALUES }],
    xField: 'value',
    yField: 'category',
    direction: 'horizontal',
    seriesField: 'category',
    color: { type: 'ordinal', range: getSequentialColors() },
    tooltip: { visible: true }
  };
}

function getPieSpec(values?: Array<Record<string, unknown>>): Record<string, unknown> {
  return {
    type: 'pie',
    data: [{ id: 'pieData', values: values?.length ? values : DEFAULT_PIE_VALUES }],
    valueField: 'value',
    categoryField: 'type',
    outerRadius: 0.8,
    innerRadius: 0.5,
    color: { type: 'ordinal', range: getCategoricalColorsWithPrimary() },
    tooltip: { visible: true },
    legends: { visible: true, position: 'right' as const }
  };
}

function getScatterSpec(values?: Array<Record<string, unknown>>): Record<string, unknown> {
  return {
    type: 'scatter',
    data: [{ id: 'scatterData', values: values?.length ? values : DEFAULT_SCATTER_VALUES }],
    xField: 'x',
    yField: 'y',
    seriesField: 'series',
    color: { type: 'ordinal', range: getCategoricalColors() },
    tooltip: { visible: true }
  };
}

function getWaterfallSpec(values?: Array<Record<string, unknown>>): Record<string, unknown> {
  const colors = getWaterfallColors();
  return {
    type: 'waterfall',
    data: [{ id: 'waterfallData', values: values?.length ? values : DEFAULT_WATERFALL_VALUES }],
    xField: 'name',
    yField: 'value',
    total: { type: 'end' as const },
    bar: {
      style: {
        fill: (datum: { value: number }) => (datum.value >= 0 ? colors.positive : colors.negative)
      }
    },
    tooltip: { visible: true }
  };
}

function getSpecByType(type: ChartType, values?: Array<Record<string, unknown>>): Record<string, unknown> {
  switch (type) {
    case 'line': return getLineSpec(values);
    case 'bar': return getBarSpec(values);
    case 'bar-horizontal': return getBarHorizontalSpec(values);
    case 'pie': return getPieSpec(values);
    case 'scatter': return getScatterSpec(values);
    case 'waterfall': return getWaterfallSpec(values);
    default: return getBarSpec(values);
  }
}

export const Charts = React.forwardRef<HTMLDivElement, ChartsProps>(
  ({ className, type = 'bar', spec, data, height = 400, emptyText = 'VChart 未加载', ...props }, ref) => {
    const chartRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      const container = chartRef.current;
      const Constructor = window.VChart;
      if (!container || !Constructor) return;
      const finalSpec = spec ?? getSpecByType(type, data);
      const chart = new Constructor(finalSpec, { dom: container });
      chart.renderSync?.();
      chart.render?.();
      return () => chart.release?.();
    }, [spec, type, data]);

    return (
      <div className={clsx('xds-chart', className)} {...props}>
        <div
          ref={(node) => {
            chartRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          className="xds-chart__canvas"
          style={{ height }}
        />
        {!window.VChart ? <div className="xds-chart__empty">{emptyText}</div> : null}
      </div>
    );
  }
);

Charts.displayName = 'Charts';
