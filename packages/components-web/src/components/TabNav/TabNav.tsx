import React from 'react';
import { clsx } from 'clsx';

export interface TabNavItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface TabNavProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items?: TabNavItem[];
  value?: string;
  defaultValue?: string;
  size?: 'default-size' | 'large';
  onChange?: (value: string) => void;
  rightContent?: React.ReactNode;
}

export const TabNav = React.forwardRef<HTMLDivElement, TabNavProps>(
  ({ className, items = [], value, defaultValue, size = 'default-size', onChange, rightContent, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue ?? items[0]?.value);
    const activeValue = value !== undefined ? value : internalValue;

    const handleSelect = (nextValue: string, disabled?: boolean) => {
      if (disabled) return;
      if (value === undefined) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue);
    };

    return (
      <div ref={ref} className={clsx('xds-tab-nav', `xds-tab-nav--${size}`, className)} {...props}>
        <div className="xds-tab-nav__items" role="tablist">
          {items.map((item) => {
            const active = item.value === activeValue;
            return (
              <button
                key={item.value}
                type="button"
                role="tab"
                aria-selected={active}
                disabled={item.disabled}
                className={clsx('xds-tab-nav__item', active && 'is-active')}
                onClick={() => handleSelect(item.value, item.disabled)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        {rightContent ? <div className="xds-tab-nav__right">{rightContent}</div> : null}
      </div>
    );
  }
);

TabNav.displayName = 'TabNav';
