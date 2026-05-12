import React from 'react';
import { clsx } from 'clsx';
import { Icon } from '../Icon/Icon';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: 'large' | 'default-size' | 'small';
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  wrapperClassName?: string;
  isFocused?: boolean;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      size = 'default-size',
      prefixIcon,
      suffixIcon,
      clearable,
      onClear,
      disabled,
      isFocused,
      error = false,
      type,
      ...props
    },
    ref
  ) => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const hasPasswordToggle = type === 'password';
    const renderedType = hasPasswordToggle ? (passwordVisible ? 'text' : 'password') : type;

    return (
      <div
        className={clsx(
          'xds-input-wrapper',
          `xds-input-wrapper--${size}`,
          prefixIcon && 'has-prefix',
          (suffixIcon || clearable || hasPasswordToggle) && 'has-suffix',
          disabled && 'is-disabled',
          isFocused && 'is-focused',
          error && 'is-error',
          type === 'search' && 'is-search',
          type === 'password' && 'is-password',
          wrapperClassName
        )}
      >
        {prefixIcon && <span className="xds-input__prefix">{prefixIcon}</span>}
        <input
          ref={ref}
          className={clsx('xds-input', className)}
          disabled={disabled}
          type={renderedType}
          {...props}
        />
        {clearable && (
          <button type="button" className="xds-input__clear" onClick={onClear} aria-label="Clear input">
            <span aria-hidden="true">×</span>
          </button>
        )}
        {hasPasswordToggle && (
          <button
            type="button"
            className="xds-input__toggle"
            onClick={() => setPasswordVisible((current) => !current)}
            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
          >
            <Icon name="ic-hide-line" />
          </button>
        )}
        {suffixIcon && <span className="xds-input__suffix">{suffixIcon}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
