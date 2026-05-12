import React from 'react';
import { clsx } from 'clsx';

export type TagSize = 'large' | 'default-size' | 'small';
export type TagVariant = 'fill' | 'light' | 'outline';
export type TagColor = 'blue' | 'green' | 'orange' | 'red' | 'gray';
export type TagSpecial = 'special-1' | 'special-2' | 'special-3';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 标签尺寸
   * @default 'default-size'
   */
  size?: TagSize;
  /**
   * 标签样式类型
   * @default 'light'
   */
  variant?: TagVariant;
  /**
   * 标签语义色
   * @default 'gray'
   */
  color?: TagColor;
  /**
   * 左侧图标，可选
   */
  leftIcon?: React.ReactNode;
  /**
   * 右侧图标，可选
   */
  rightIcon?: React.ReactNode;
  /**
   * 特殊样式，来自 designsystem 的品牌标签。
   */
  special?: TagSpecial;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      size = 'default-size',
      variant = 'light',
      color = 'gray',
      leftIcon,
      rightIcon,
      special,
      children,
      ...props
    },
    ref
  ) => {
    const isInteractive = typeof props.onClick === 'function';

    return (
      <span
        ref={ref}
        className={clsx(
          'xds-tag',
          `xds-tag--${size}`,
          `xds-tag--${variant}`,
          `xds-tag--${color}`,
          special && `xds-tag--${special}`,
          {
            'xds-tag--interactive': isInteractive,
            'xds-tag--special': Boolean(special),
          },
          className
        )}
        {...props}
      >
        {leftIcon ? <span className="xds-tag__icon xds-tag__icon--left">{leftIcon}</span> : null}
        {children ? <span className="xds-tag__content">{children}</span> : null}
        {rightIcon ? <span className="xds-tag__icon xds-tag__icon--right">{rightIcon}</span> : null}
      </span>
    );
  }
);

Tag.displayName = 'Tag';
