import React from 'react';
import { clsx } from 'clsx';
import { Icon } from '../Icon/Icon';
import { Input } from '../Input/Input';

export const Navbar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('xds-navbar', className)} {...props}>
      <div className="xds-navbar__left">
        <div className="xds-navbar__logo" aria-label="来客 Logo">
          <span className="xds-navbar__logo-image" aria-hidden="true" />
        </div>
      </div>

      <div className="xds-navbar__middle">
        <div className="xds-navbar__search">
          <Input
            size="default-size"
            prefixIcon={<Icon name="ic-search-line" />}
            placeholder="你可以问：在哪里修改官方抖音号"
            readOnly
          />
        </div>

        <nav className="xds-navbar__nav">
          <a href="#" className="xds-navbar__nav-item is-active">首页</a>
          <a href="#" className="xds-navbar__nav-item">生意经</a>
          <a href="#" className="xds-navbar__nav-item">本地推</a>
          <a href="#" className="xds-navbar__nav-item">学习中心</a>
        </nav>
      </div>

      <div className="xds-navbar__right">
        <div className="xds-navbar__action">
          <Icon name="ic-reset-line" />
          <span>返回旧版</span>
        </div>
        <div className="xds-navbar__divider" />
        <div className="xds-navbar__action">
          <Icon name="ic-mobile-line" />
          <span>App下载</span>
        </div>
        <div className="xds-navbar__divider" />
        <div className="xds-navbar__user">
          <div className="xds-navbar__avatar xds-navbar__avatar--preset" aria-hidden="true">
            85
          </div>
          <div className="xds-navbar__user-info">
            <span className="xds-navbar__username">北京八十五度...</span>
            <Icon name="ic-arrow-down-line" />
          </div>
        </div>
      </div>
    </div>
  )
);
Navbar.displayName = 'Navbar';
