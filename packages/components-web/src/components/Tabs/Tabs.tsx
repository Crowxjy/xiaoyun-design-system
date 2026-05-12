import React, { createContext, useContext, useState } from 'react';
import { clsx } from 'clsx';

interface TabsContextType {
  activeValue?: string;
  onChange?: (value: string) => void;
}

const TabsContext = createContext<TabsContextType>({});

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  variant?: 'primary' | 'capsule' | 'filter';
  size?: 'large' | 'small';
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, variant = 'primary', size = 'small', defaultValue, value, onChange, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    
    // 支持受控模式(value)与非受控模式(defaultValue)
    const activeValue = value !== undefined ? value : internalValue;

    const handleChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    return (
      <TabsContext.Provider value={{ activeValue, onChange: handleChange }}>
        <div
          ref={ref}
          className={clsx('xds-tabs', `xds-tabs--${variant}`, `xds-tabs--${size}`, className)}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

export interface TabProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'value'> {
  value?: string;
  disabled?: boolean;
  // 保留外部传入 active 的能力以兼容老逻辑
  active?: boolean;
}

export const Tab = React.forwardRef<HTMLAnchorElement, TabProps>(
  ({ className, value, active, disabled, children, onClick, ...props }, ref) => {
    const context = useContext(TabsContext);
    
    // 如果 Tab 配置了 value，优先通过 Context 判断是否激活
    const isActive = (value !== undefined && context.activeValue === value) || active;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (value !== undefined) {
        context.onChange?.(value);
      }
      onClick?.(e);
    };

    return (
      <a
        ref={ref}
        className={clsx('xds-tab', isActive && 'is-active', disabled && 'is-disabled', className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Tab.displayName = 'Tab';
