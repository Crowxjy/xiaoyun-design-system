import React from 'react';
import { clsx } from 'clsx';
import { Tag } from '../Tag/Tag';

export const NormalTableWrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={clsx('xds-table-wrapper', className)} {...props} />
);
NormalTableWrapper.displayName = 'NormalTableWrapper';

export const NormalTable = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => <table ref={ref} className={clsx('xds-table', className)} {...props} />
);
NormalTable.displayName = 'NormalTable';

export const Thead = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={clsx('xds-table__thead', className)} {...props} />
);
Thead.displayName = 'Thead';

export const Tbody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  (props, ref) => <tbody ref={ref} {...props} />
);
Tbody.displayName = 'Tbody';

export const Tr = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => <tr ref={ref} className={clsx('xds-table__row', className)} {...props} />
);
Tr.displayName = 'Tr';

export const Th = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => <th ref={ref} className={clsx('xds-table__th', className)} {...props} />
);
Th.displayName = 'Th';

export const Td = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => <td ref={ref} className={clsx('xds-table__td', className)} {...props} />
);
Td.displayName = 'Td';

export const TableCellProduct = ({ img, title, tag, tagVariant = 'default', id }: any) => (
  <div className="xds-table-cell--product">
    <img src={img} alt="商品图" className="xds-table-cell__product-img" />
    <div className="xds-table-cell__product-info">
      <div className="xds-table-cell__product-title-wrap">
        <h4 className="xds-table-cell__product-title">{title}</h4>
        {tag && (
          <Tag
            size="small"
            variant={tagVariant === 'default' ? 'outline' : 'light'}
            color={tagVariant === 'orange' ? 'orange' : tagVariant === 'red' ? 'red' : 'gray'}
          >
            {tag}
          </Tag>
        )}
      </div>
      <div className="xds-table-cell__product-meta">
        <span className="xds-table-cell__product-id">商品ID：{id}</span>
      </div>
    </div>
  </div>
);

export const TableCellAmount = ({ children }: any) => <div className="xds-table-cell--amount">{children}</div>;
export const TableCellOperation = ({ children }: any) => <div className="xds-table-cell--operation">{children}</div>;

export interface TableCellActionProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  danger?: boolean;
}
export const TableCellAction = React.forwardRef<HTMLAnchorElement, TableCellActionProps>(
  ({ className, danger, ...props }, ref) => (
    <a ref={ref} className={clsx('xds-table-cell__action', danger && 'is-danger', className)} {...props} />
  )
);
TableCellAction.displayName = 'TableCellAction';

/* ----------------------------------------------------------------------------
 * Data-driven Table (aligned with designsystem)
 * -------------------------------------------------------------------------- */

export type TableCellMetricType = 'success' | 'danger' | 'default';

export interface TableCellSubMetric {
  label?: React.ReactNode;
  value?: React.ReactNode | { value: React.ReactNode; type?: TableCellMetricType };
  values?: Array<React.ReactNode | { value: React.ReactNode; type?: TableCellMetricType }>;
  type?: TableCellMetricType;
}

export interface TableCellStandardValue {
  main?: React.ReactNode;
  sub?: React.ReactNode | TableCellSubMetric[];
}

export interface TableCellMetricValue {
  currency?: React.ReactNode;
  number?: React.ReactNode;
  unit?: React.ReactNode;
  sub?: React.ReactNode | TableCellSubMetric[];
}

export interface TableColumn {
  key?: string;
  title: React.ReactNode;
  children?: TableColumn[];
  isMetric?: boolean;
  metricStyle?: 'enhanced' | 'plain';
  render?: (value: any, row: TableRowData, rowIndex: number) => React.ReactNode;
}

export interface TableRowData {
  [key: string]: any;
  isSummary?: boolean;
}

export interface TableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  data: TableRowData[];
  columns: TableColumn[];
  frozenColumnCount?: number;
  multiLevelHeader?: boolean;
  lastRowBorder?: boolean;
  groupDividerLeafIndices?: number[];
}

interface InternalColumn extends TableColumn {
  parent?: InternalColumn | null;
  children?: InternalColumn[];
}

interface HeaderCellInfo {
  title: React.ReactNode;
  colSpan: number;
  rowSpan: number;
  isLeaf: boolean;
  originalCol: InternalColumn;
  leafStartIndex: number;
}

function getStickyCellStyle(leafIndex: number, frozenColumnCount: number) {
  if (leafIndex >= frozenColumnCount) return undefined;
  return {
    left: `${leafIndex * 200}px`,
  } as React.CSSProperties;
}

function getLeafCount(col: InternalColumn): number {
  if (!col.children || col.children.length === 0) return 1;
  return col.children.reduce((sum, child) => sum + getLeafCount(child), 0);
}

function getMaxDepth(columns: InternalColumn[], depth = 1): number {
  let max = depth;
  columns.forEach((col) => {
    if (col.children && col.children.length > 0) {
      max = Math.max(max, getMaxDepth(col.children, depth + 1));
    }
  });
  return max;
}

function getLeafColumns(columns: InternalColumn[]): InternalColumn[] {
  const leaves: InternalColumn[] = [];
  const collect = (cols: InternalColumn[]) => {
    cols.forEach((col) => {
      if (col.children && col.children.length > 0) {
        collect(col.children);
      } else {
        leaves.push(col);
      }
    });
  };
  collect(columns);
  return leaves;
}

function collectLevelColumns(
  columns: InternalColumn[],
  targetDepth: number,
  level: HeaderCellInfo[],
  maxDepth: number,
  currentDepth: number,
  leafStartIndex: { value: number },
  parent: InternalColumn | null = null
) {
  columns.forEach((col) => {
    col.parent = parent;
    if (currentDepth === targetDepth) {
      const isLeaf = !col.children || col.children.length === 0;
      const colSpan = getLeafCount(col);
      const rowSpan = isLeaf ? maxDepth - currentDepth : 1;
      level.push({
        title: col.title,
        colSpan,
        rowSpan,
        isLeaf,
        originalCol: col,
        leafStartIndex: leafStartIndex.value,
      });
      leafStartIndex.value += colSpan;
    } else if (col.children && col.children.length > 0) {
      collectLevelColumns(col.children, targetDepth, level, maxDepth, currentDepth + 1, leafStartIndex, col);
    }
  });
}

function getHeaderLevels(columns: InternalColumn[]): HeaderCellInfo[][] {
  const levels: HeaderCellInfo[][] = [];
  const maxDepth = getMaxDepth(columns);
  for (let depth = 0; depth < maxDepth; depth++) {
    const level: HeaderCellInfo[] = [];
    const leafStartIndex = { value: 0 };
    collectLevelColumns(columns, depth, level, maxDepth, 0, leafStartIndex);
    levels.push(level);
  }
  return levels;
}

function isMultiLevel(columns: InternalColumn[]): boolean {
  return columns.some((col) => !!col.children && col.children.length > 0);
}

function renderSubMetrics(subItems: TableCellSubMetric[]) {
  return (
    <div className="xds-table-cell__sub-metrics">
      {subItems.map((subItem, index) => {
        let values: Array<{ value: React.ReactNode; type?: TableCellMetricType }> = [];
        if (Array.isArray(subItem.values)) {
          values = subItem.values.map((v) =>
            typeof v === 'object' && v !== null && 'value' in v ? (v as any) : { value: v }
          );
        } else if (subItem.value !== undefined) {
          const v = subItem.value;
          values = [typeof v === 'object' && v !== null && 'value' in v ? (v as any) : { value: v as React.ReactNode }];
        }
        if (subItem.type !== undefined) {
          values = values.map((v) => ({ ...v, type: v.type ?? subItem.type }));
        }
        return (
          <div key={index} className="xds-table-cell__sub-metric-item">
            {subItem.label ? <span className="xds-table-cell__sub-metric-label">{subItem.label}</span> : null}
            {values.map((v, i) => (
              <span
                key={i}
                className={clsx('xds-table-cell__sub-metric-value', v.type && v.type !== 'default' && `is-${v.type}`)}
              >
                {v.value}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function renderStandardCell(value: any) {
  if (typeof value === 'object' && value !== null) {
    const v = value as TableCellStandardValue;
    return (
      <>
        {v.main !== undefined ? <div className="xds-table-cell__main">{v.main}</div> : null}
        {v.sub !== undefined
          ? Array.isArray(v.sub)
            ? renderSubMetrics(v.sub)
            : <div className="xds-table-cell__sub">{v.sub}</div>
          : null}
      </>
    );
  }
  return <div className="xds-table-cell__main">{value}</div>;
}

function renderMetricCell(value: TableCellMetricValue) {
  return (
    <div className="xds-table-cell__metric-wrapper">
      <div className="xds-table-cell__metric">
        <div className="xds-table-cell__metric-value-group">
          {value.currency ? <span className="xds-table-cell__metric-currency">{value.currency}</span> : null}
          {value.number !== undefined ? <span className="xds-table-cell__metric-number">{value.number}</span> : null}
        </div>
        {value.unit ? <span className="xds-table-cell__metric-unit">{value.unit}</span> : null}
      </div>
      {value.sub !== undefined
        ? Array.isArray(value.sub)
          ? renderSubMetrics(value.sub)
          : <div className="xds-table-cell__metric-sub">{value.sub}</div>
        : null}
    </div>
  );
}

export const Table = React.forwardRef<HTMLDivElement, TableProps>(
  (
    {
      className,
      data,
      columns,
      frozenColumnCount = 0,
      multiLevelHeader,
      lastRowBorder = true,
      groupDividerLeafIndices = [],
      ...props
    },
    ref
  ) => {
    const internalColumns = columns as InternalColumn[];
    const useMultiLevel = multiLevelHeader !== undefined ? multiLevelHeader : isMultiLevel(internalColumns);
    const leafColumns = getLeafColumns(internalColumns);

    const headerLevels = useMultiLevel ? getHeaderLevels(internalColumns) : null;

    return (
      <div
        ref={ref}
        className={clsx(
          'xds-table-wrapper',
          'xds-table-container',
          frozenColumnCount > 0 && 'has-frozen-column',
          !lastRowBorder && 'no-last-row-border',
          className
        )}
        {...props}
      >
        <table className="xds-table">
          <thead className="xds-table__thead">
            {useMultiLevel && headerLevels
              ? headerLevels.map((level, levelIndex) => {
                  let currentLeafIndex = 0;
                  return (
                    <tr key={levelIndex} className="xds-table__row xds-table__row--head">
                      {level.map((cell, cellIndex) => {
                        const colSpan = cell.colSpan || 1;
                        const isFrozen = currentLeafIndex < frozenColumnCount;
                        const partiallyFrozen =
                          currentLeafIndex < frozenColumnCount && currentLeafIndex + colSpan > frozenColumnCount;
                        const isLastColumn = cellIndex === level.length - 1;
                        const isGroupLastLeaf =
                          cell.isLeaf &&
                          cell.originalCol.parent &&
                          cell.originalCol.parent.children &&
                          cell.originalCol.parent.children.indexOf(cell.originalCol) ===
                            cell.originalCol.parent.children.length - 1;
                        const className = clsx(
                          'xds-table__th',
                          isFrozen && !partiallyFrozen && 'is-frozen',
                          cell.isLeaf && 'is-leaf-header',
                          !isLastColumn && !cell.isLeaf && 'has-right-border',
                          cell.isLeaf && !isLastColumn && (isGroupLastLeaf || !cell.originalCol.parent) && 'has-right-border'
                        );
                        const th = (
                          <th
                            key={cellIndex}
                            colSpan={colSpan}
                            rowSpan={cell.rowSpan || 1}
                            className={className}
                            style={isFrozen && !partiallyFrozen ? getStickyCellStyle(currentLeafIndex, frozenColumnCount) : undefined}
                          >
                            {cell.title}
                          </th>
                        );
                        currentLeafIndex += colSpan;
                        return th;
                      })}
                    </tr>
                  );
                })
              : (
                <tr className="xds-table__row xds-table__row--head">
                  {leafColumns.map((col, colIndex) => (
                    <th
                      key={colIndex}
                      className={clsx(
                        'xds-table__th',
                        'is-leaf-header',
                        colIndex < frozenColumnCount && 'is-frozen',
                        groupDividerLeafIndices.includes(colIndex) && 'is-group-divider'
                      )}
                      style={colIndex < frozenColumnCount ? getStickyCellStyle(colIndex, frozenColumnCount) : undefined}
                    >
                      {col.title}
                    </th>
                  ))}
                </tr>
              )}
          </thead>
          <tbody className="xds-table__tbody">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={clsx('xds-table__row', row.isSummary && 'is-summary-row')}>
                {leafColumns.map((col, colIndex) => {
                  const value = col.key !== undefined ? row[col.key] : undefined;
                  const cellContent = col.render
                    ? col.render(value, row, rowIndex)
                    : col.isMetric && col.metricStyle === 'enhanced'
                      ? renderMetricCell(value as TableCellMetricValue)
                      : renderStandardCell(value);
                  return (
                    <td
                      key={colIndex}
                      className={clsx(
                        'xds-table__td',
                        col.isMetric && col.metricStyle === 'enhanced' && 'xds-table__metric-cell',
                        colIndex < frozenColumnCount && 'is-frozen',
                        groupDividerLeafIndices.includes(colIndex) && 'is-group-divider'
                      )}
                      style={colIndex < frozenColumnCount ? getStickyCellStyle(colIndex, frozenColumnCount) : undefined}
                    >
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

Table.displayName = 'Table';
