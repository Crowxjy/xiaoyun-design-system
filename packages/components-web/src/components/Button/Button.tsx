import React from 'react';
import { clsx } from 'clsx';

export type ButtonSize = 'large' | 'default-size' | 'small';
export type ButtonVariant =
  | 'primary'
  | 'default'
  | 'secondary'
  | 'outline'
  | 'text'
  | 'text-primary'
  | 'text-secondary'
  | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The size of the button
   * @default 'default-size'
   */
  size?: ButtonSize;
  /**
   * The variant of the button
   * @default 'default'
   */
  variant?: ButtonVariant;
  /**
   * Optional icon to render inside the button. For 'icon' variant, this is the only content.
   */
  icon?: React.ReactNode;
  /**
   * Optional left icon. `icon` remains as a legacy alias.
   */
  leftIcon?: React.ReactNode;
  /**
   * Optional right icon.
   */
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size = 'default-size', variant = 'default', icon, leftIcon, rightIcon, children, ...props }, ref) => {
    const resolvedVariant =
      variant === 'default'
        ? 'secondary'
        : variant === 'text'
          ? 'text-secondary'
          : variant;
    const leadingIcon = leftIcon ?? icon;

    return (
      <button
        ref={ref}
        className={clsx(
          'xds-btn',
          `xds-btn--${size}`,
          `xds-btn--${resolvedVariant}`,
          className
        )}
        {...props}
      >
        {leadingIcon ? <span className="xds-btn__icon xds-btn__icon--left">{leadingIcon}</span> : null}
        {variant === 'icon' ? null : children}
        {rightIcon ? <span className="xds-btn__icon xds-btn__icon--right">{rightIcon}</span> : null}
      </button>
    );
  }
);

Button.displayName = 'Button';
