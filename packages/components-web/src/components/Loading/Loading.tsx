import React from 'react';
import { clsx } from 'clsx';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'default-size' | 'large';
  text?: React.ReactNode;
  minHeight?: number | string;
}

export const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, size = 'default-size', text, minHeight = 200, style, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('xds-loading', className)} style={{ minHeight, ...style }} {...props}>
        <span className={clsx('xds-loading__spinner', `xds-loading__spinner--${size}`)} aria-hidden="true">
          <span className="xds-loading__spinner-circle" />
        </span>
        {text ? <span className="xds-loading__text">{text}</span> : null}
      </div>
    );
  }
);

Loading.displayName = 'Loading';
