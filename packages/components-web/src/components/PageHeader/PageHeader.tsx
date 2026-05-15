import React from 'react';
import { clsx } from 'clsx';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: React.ReactNode;
  tabs?: React.ReactNode;
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, title, description, tabs, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('xds-page-header', className)} {...props}>
        <div className="xds-page-header__heading">
          <h1 className="xds-page-header__title">{title}</h1>
          {description ? <p className="xds-page-header__description">{description}</p> : null}
        </div>
        {tabs && <div className="xds-page-header__tabs">{tabs}</div>}
      </div>
    );
  }
);

PageHeader.displayName = 'PageHeader';
