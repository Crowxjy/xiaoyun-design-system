import React from 'react';
import { clsx } from 'clsx';
import { Icon } from '../Icon/Icon';
import { Dropdown, DropdownOption } from '../Dropdown/Dropdown';

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  label?: React.ReactNode;
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, option: DropdownOption) => void;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    { className, label, placeholder = '请选择', options, value, defaultValue, onChange, ...props },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const activeValue = value !== undefined ? value : internalValue;
    const selectedOption = options.find((option) => option.value === activeValue);

    React.useEffect(() => {
      const handleDocumentClick = (event: MouseEvent) => {
        if (!containerRef.current?.contains(event.target as Node)) {
          setOpen(false);
        }
      };

      document.addEventListener('mousedown', handleDocumentClick);
      return () => document.removeEventListener('mousedown', handleDocumentClick);
    }, []);

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={clsx('xds-select', open && 'is-open', className)}
        {...props}
      >
        <button type="button" className="xds-select__trigger" onClick={() => setOpen((current) => !current)}>
          {label ? (
            <>
              <span className="xds-select__label">{label}</span>
              <span className="xds-select__divider" />
            </>
          ) : null}
          <span className={clsx('xds-select__value', selectedOption && 'has-value')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="xds-select__arrow" aria-hidden="true">
            <Icon name="ic-arrow-down-line" />
          </span>
        </button>

        <div className="xds-select__dropdown">
          <Dropdown
            options={options}
            value={activeValue}
            open={open}
            onChange={(nextValue, option) => {
              if (value === undefined) {
                setInternalValue(nextValue);
              }
              setOpen(false);
              onChange?.(nextValue, option);
            }}
          />
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
