import React from 'react';
import { clsx } from 'clsx';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  tabs?: React.ReactNode;
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, title, tabs, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('xds-page-header', className)} {...props}>
        <h1 className="xds-page-header__title">{title}</h1>
        {tabs && <div className="xds-page-header__tabs">{tabs}</div>}
      </div>
    );
  }
);

PageHeader.displayName = 'PageHeader';
