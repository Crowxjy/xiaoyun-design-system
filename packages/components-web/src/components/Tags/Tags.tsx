import React from 'react';
import { clsx } from 'clsx';

export interface TagsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Tags = React.forwardRef<HTMLDivElement, TagsProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={clsx('xds-tags', className)} {...props} />;
});

Tags.displayName = 'Tags';
