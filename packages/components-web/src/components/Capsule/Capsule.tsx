import React from 'react';
import { clsx } from 'clsx';

export interface CapsuleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'large' | 'default-size' | 'small';
  label: React.ReactNode;
}

export const Capsule = React.forwardRef<HTMLInputElement, CapsuleProps>(
  ({ className, size = 'default-size', label, disabled, ...props }, ref) => {
    return (
      <label className={clsx('xds-capsule-wrapper', className, disabled && 'is-disabled')}>
        <input type="radio" ref={ref} disabled={disabled} {...props} />
        <span className={clsx('xds-capsule', `xds-capsule--${size}`)}>
          {label}
        </span>
      </label>
    );
  }
);

Capsule.displayName = 'Capsule';
