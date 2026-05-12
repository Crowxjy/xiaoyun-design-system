import React from 'react';
import { clsx } from 'clsx';
import { Icon } from '../Icon/Icon';

export type FilterType = 'input' | 'select' | 'date' | 'time';
export type FilterSize = 'default-size' | 'small';

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

export type FilterInputProps = CommonProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> & {
    type: 'input';
    value?: string;
    defaultValue?: string;
    onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
    inputProps?: Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'size' | 'value' | 'defaultValue' | 'disabled' | 'onChange' | 'placeholder' | 'className'
    >;
  };

export type FilterButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'value' | 'defaultValue'> & {
    type: Exclude<FilterType, 'input'>;
    value?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  };

export type FilterProps = FilterInputProps | FilterButtonProps;

const getDefaultRightIconName = (type: FilterType): string | null => {
  if (type === 'select') return 'ic-arrow-down-line';
  if (type === 'date') return 'ic-calendar-line';
  if (type === 'time') return 'ic-time-round-line';
  return null;
};

const isFilledValue = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
};

export const Filter = React.forwardRef<HTMLElement, FilterProps>((props, ref) => {
  const {
    size = 'default-size',
    label,
    placeholder,
    disabled = false,
    isActive = false,
    rightIcon,
    width,
  } = props;

  if (props.type === 'input') {
    const { className, value, defaultValue, onChange, inputProps, style, ...rest } = props;
    const filled = isFilledValue(value ?? defaultValue);

    return (
      <div
        ref={ref as unknown as React.Ref<HTMLDivElement>}
        className={clsx(
          'xds-filter',
          `xds-filter--${size}`,
          'xds-filter--input',
          {
            'is-disabled': disabled,
            'is-active': isActive,
            'is-filled': filled,
          },
          className
        )}
        style={{ ...(width !== undefined ? { width } : null), ...style }}
        onMouseDown={(e) => {
          // Make the whole pill clickable to focus input.
          if ((e.target as HTMLElement)?.closest('input')) return;
          const input = (e.currentTarget as HTMLElement).querySelector('input');
          input?.focus();
        }}
        {...rest}
      >
        <span className="xds-filter__label">{label}</span>
        <span className="xds-filter__divider" aria-hidden="true" />
        <span className="xds-filter__control">
          <input
            className="xds-filter__input"
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            placeholder={typeof placeholder === 'string' ? placeholder : undefined}
            onChange={(e) => onChange?.(e.target.value, e)}
            {...inputProps}
          />
        </span>
      </div>
    );
  }

  const { type, className, value, onClick, style, ...rest } = props;
  const filled = isFilledValue(value);
  const defaultIconName = getDefaultRightIconName(type);
  const iconNode =
    rightIcon ??
    (defaultIconName ? (
      <Icon name={defaultIconName} className="xds-filter__icon-svg" aria-hidden="true" />
    ) : null);

  return (
    <button
      ref={ref as unknown as React.Ref<HTMLButtonElement>}
      type="button"
      className={clsx(
        'xds-filter',
        `xds-filter--${size}`,
        `xds-filter--${type}`,
        {
          'is-disabled': disabled,
          'is-active': isActive,
          'is-filled': filled,
        },
        className
      )}
      style={{ ...(width !== undefined ? { width } : null), ...style }}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      <span className="xds-filter__label">{label}</span>
      <span className="xds-filter__divider" aria-hidden="true" />
      <span className="xds-filter__control">
        <span className="xds-filter__value">
          {filled ? value : placeholder ?? value}
        </span>
      </span>
      {iconNode ? <span className="xds-filter__icon">{iconNode}</span> : null}
    </button>
  );
});

Filter.displayName = 'Filter';
