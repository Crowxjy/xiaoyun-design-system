import React, { forwardRef, useState } from 'react';
import { clsx } from 'clsx';

const CHECKED_ICON_PATHS = {
  large: {
    viewBox: '0 0 22 22',
    path: 'M14.3926 7.28591C14.7382 6.85522 15.3681 6.78612 15.7989 7.13162C16.2295 7.47719 16.2987 8.10708 15.9532 8.53787L10.8399 14.9129C10.6581 15.1393 10.3869 15.2752 10.0967 15.2859C9.80655 15.2966 9.52606 15.181 9.32815 14.9685L6.26761 11.6814C5.89159 11.2773 5.91449 10.6446 6.31839 10.2683C6.72262 9.89203 7.35614 9.91392 7.73245 10.3181L10.003 12.7576L14.3926 7.28591Z',
  },
  'default-size': {
    viewBox: '0 0 20 20',
    path: 'M13.1746 6.48142C13.53 6.05876 14.161 6.00402 14.5837 6.35935C15.0064 6.71475 15.0611 7.34583 14.7058 7.76853L9.76538 13.6435C9.57861 13.8656 9.30457 13.9958 9.01441 14C8.72415 14.0041 8.44572 13.8818 8.25269 13.665L5.69312 10.79C5.32591 10.3775 5.36269 9.74515 5.77515 9.37791C6.18763 9.01074 6.82002 9.04749 7.18726 9.45994L8.97827 11.4717L13.1746 6.48142Z',
  },
  small: {
    viewBox: '0 0 18 18',
    path: 'M11.5469 5.93752C11.8574 5.54938 12.4244 5.48639 12.8125 5.79689C13.2006 6.1074 13.2636 6.67438 12.9531 7.06252L8.95312 12.0625C8.79321 12.2624 8.55539 12.3843 8.2998 12.3985C8.04419 12.4126 7.79429 12.3178 7.61327 12.1367L5.11327 9.63674C4.7618 9.28527 4.7618 8.71477 5.11327 8.3633C5.46475 8.01183 6.03524 8.01183 6.38671 8.3633L8.1748 10.1514L11.5469 5.93752Z',
  },
} as const;

const INDETERMINATE_ICON_PATHS = {
  large: {
    viewBox: '0 0 22 22',
    path: 'M15.5 10C16.0523 10 16.5 10.4477 16.5 11C16.5 11.5523 16.0523 12 15.5 12H6.5C5.94772 12 5.5 11.5523 5.5 11C5.5 10.4477 5.94772 10 6.5 10H15.5Z',
  },
  'default-size': {
    viewBox: '0 0 20 20',
    path: 'M14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H6C5.44772 11 5 10.5523 5 10C5 9.44772 5.44772 9 6 9H14Z',
  },
  small: {
    viewBox: '0 0 18 18',
    path: 'M12 8.25C12.4142 8.25 12.75 8.58579 12.75 9C12.75 9.41421 12.4142 9.75 12 9.75H6C5.58579 9.75 5.25 9.41421 5.25 9C5.25 8.58579 5.58579 8.25 6 8.25H12Z',
  },
} as const;

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
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

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size = 'default-size',
      indeterminate = false,
      showLabel = false,
      label,
      checked,
      disabled = false,
      readOnly = false,
      onChange,
      ...props
    },
    ref
  ) => {
    // 内部维护非受控状态
    const [internalChecked, setInternalChecked] = useState<boolean>(() => {
      return Boolean(props.defaultChecked);
    });

    // 判断是否受控
    const isControlled = checked !== undefined;
    const currentChecked = isControlled ? checked : internalChecked;
    const iconConfig = indeterminate ? INDETERMINATE_ICON_PATHS[size] : CHECKED_ICON_PATHS[size];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    };

    return (
      <label
        className={clsx(
          'xds-checkbox',
          `xds-checkbox--${size}`,
          {
            'xds-checkbox--checked': currentChecked && !indeterminate,
            'xds-checkbox--indeterminate': indeterminate,
            'xds-checkbox--disabled': disabled,
          },
          className
        )}
      >
        <span className="xds-checkbox__input-wrapper">
          <input
            type="checkbox"
            className="xds-checkbox__input"
            checked={currentChecked}
            disabled={disabled}
            readOnly={readOnly}
            aria-checked={indeterminate ? 'mixed' : currentChecked}
            onChange={handleChange}
            ref={ref}
            {...props}
          />
          <span className="xds-checkbox__inner">
            <span className="xds-checkbox__icon">
              <svg viewBox={iconConfig.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d={iconConfig.path} fill="currentColor" />
              </svg>
            </span>
          </span>
        </span>
        {showLabel && label ? <span className="xds-checkbox__label">{label}</span> : null}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
