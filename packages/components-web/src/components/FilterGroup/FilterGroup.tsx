import React from 'react';
import { clsx } from 'clsx';
import type { FilterSize } from '../Filter/Filter';
import { Button } from '../Button/Button';

export interface FilterGroupProps extends React.HTMLAttributes<HTMLDivElement> {
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

export const FilterGroup = React.forwardRef<HTMLDivElement, FilterGroupProps>(
  (
    {
      className,
      size = 'small',
      minItemWidth = 294,
      gap = 12,
      onQuery,
      onReset,
      showActions,
      actions,
      queryText = '查询',
      resetText = '重置',
      children,
      style,
      ...props
    },
    ref
  ) => {
    const shouldShowDefaultActions = Boolean(showActions ?? (onQuery || onReset));
    const shouldRenderActionsRow = Boolean(actions || shouldShowDefaultActions);

    return (
      <div
        ref={ref}
        className={clsx('xds-filter-group', className)}
        style={
          {
            ...style,
            // CSS vars for responsive grid behaviour.
            ['--xds-filter-group-min-item-width' as any]: `${minItemWidth}px`,
            ['--xds-filter-group-gap' as any]: `${gap}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className="xds-filter-group__grid">{children}</div>
        {shouldRenderActionsRow ? (
          <div className="xds-filter-group__actions-row">
            {actions ? (
              actions
            ) : (
              <>
                {onQuery ? (
                  <Button variant="secondary" size={size} onClick={onQuery}>
                    {queryText}
                  </Button>
                ) : null}
                {onReset ? (
                  <Button variant="default" size={size} onClick={onReset}>
                    {resetText}
                  </Button>
                ) : null}
              </>
            )}
          </div>
        ) : null}
      </div>
    );
  }
);

FilterGroup.displayName = 'FilterGroup';
