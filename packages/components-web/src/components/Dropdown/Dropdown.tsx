import React from 'react';
import { clsx } from 'clsx';

export interface DropdownOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
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

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, options, value, open = false, closeOnClickOutside = true, onClose, onChange, ...props }, ref) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      if (!open || !closeOnClickOutside || !onClose) return;
      const handler = (event: MouseEvent) => {
        if (innerRef.current && !innerRef.current.contains(event.target as Node)) {
          onClose();
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open, closeOnClickOutside, onClose]);

    return (
      <div
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={clsx('xds-dropdown', open && 'is-open', className)}
        {...props}
      >
        <div className="xds-dropdown__list" role="listbox">
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                disabled={option.disabled}
                className={clsx('xds-dropdown__option', selected && 'is-selected')}
                onClick={() => onChange?.(option.value, option)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';
