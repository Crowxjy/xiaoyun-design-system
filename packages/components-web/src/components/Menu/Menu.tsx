import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Icon } from '../Icon/Icon';

type MenuDefaultItem = {
  key: string;
  label: string;
};

type MenuDefaultGroup = {
  key: string;
  title: string;
  icon: string;
  defaultCollapsed?: boolean;
  items: MenuDefaultItem[];
};

const DEFAULT_MENU_GROUPS: MenuDefaultGroup[] = [
  {
    key: 'common',
    title: '常用',
    icon: 'ic-all-line',
    items: [
      { key: 'common-store-management', label: '门店管理' },
      { key: 'common-group-buy-product-management', label: '团购商品管理' },
      { key: 'common-store-decoration', label: '店铺装修' },
      { key: 'common-review-management', label: '评价管理' },
    ],
  },
  {
    key: 'store',
    title: '店铺',
    icon: 'ic-store-line',
    items: [
      { key: 'store-merchant-info', label: '商家信息' },
      { key: 'store-store-management', label: '门店管理' },
      { key: 'store-area-management', label: '区域管理' },
      { key: 'store-auth-management', label: '授权管理' },
      { key: 'store-qualification-center', label: '资质中心' },
      { key: 'store-store-decoration', label: '店铺装修' },
      { key: 'store-cooperation-management', label: '合作管理' },
      { key: 'store-business-center', label: '业务中心' },
      { key: 'store-review-management', label: '评价管理' },
      { key: 'store-approval-center', label: '审批中心' },
      { key: 'store-service-app-auth', label: '服务应用授权' },
      { key: 'store-talent-management', label: '职人管理' },
      { key: 'store-official-douyin', label: '官方抖音号' },
      { key: 'store-charity-project', label: '公益项目' },
    ],
  },
  {
    key: 'order',
    title: '订单',
    icon: 'ic-menu-trade-line',
    items: [
      { key: 'order-group-buy-coupon', label: '团购券处理' },
      { key: 'order-after-sale', label: '售后处理' },
    ],
  },
  {
    key: 'finance',
    title: '财务',
    icon: 'ic-wallet-line',
    items: [
      { key: 'finance-daily-income', label: '每日收益' },
      { key: 'finance-daily-arrival', label: '每日到账' },
      { key: 'finance-withdraw-record', label: '提现记录' },
      { key: 'finance-service-fee-return', label: '服务费返还还' },
      { key: 'finance-payment-account', label: '收款账户' },
      { key: 'finance-deposit', label: '保证金' },
      { key: 'finance-relief-loan', label: '放心借' },
      { key: 'finance-marketing-account', label: '营销账户' },
      { key: 'finance-self-invoice', label: '自助开票' },
      { key: 'finance-merchant-invoice', label: '商家交票' },
    ],
  },
  {
    key: 'creator-commerce',
    title: '达人带货',
    icon: 'ic-commoditynew-line',
    items: [
      { key: 'creator-commerce-store-promotion', label: '全店推广' },
      { key: 'creator-commerce-plan-management', label: '计划管理' },
      { key: 'creator-commerce-creator-square', label: '达人广场' },
      { key: 'creator-commerce-ocean-engine-xingtu', label: '巨量星图' },
    ],
  },
  {
    key: 'content-promotion',
    title: '内容推广',
    icon: 'ic-trumpet-line',
    items: [
      { key: 'content-promotion-customer-card', label: '获客卡' },
      { key: 'content-promotion-video-management', label: '视频管理' },
      { key: 'content-promotion-live-management', label: '直播管理' },
      { key: 'content-promotion-live-pro', label: '直播专业版' },
      { key: 'content-promotion-live-assistant', label: '直播助手' },
      { key: 'content-promotion-cash-wallet', label: '现金钱包' },
    ],
  },
];

export interface MenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * 受控：当前激活的默认菜单项 key
   */
  activeItemKey?: string;
  /**
   * 非受控：默认激活的默认菜单项 key
   * @default 'store-store-management'
   */
  defaultActiveItemKey?: string;
  /**
   * 菜单项点击回调
   */
  onItemChange?: (itemKey: string) => void;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      className,
      activeItemKey,
      defaultActiveItemKey = 'store-store-management',
      onItemChange,
      ...props
    },
    ref
  ) => {
    const [innerActiveItemKey, setInnerActiveItemKey] = useState(defaultActiveItemKey);
    const [collapsedMap, setCollapsedMap] = useState<Record<string, boolean>>(() =>
      Object.fromEntries(DEFAULT_MENU_GROUPS.map((group) => [group.key, Boolean(group.defaultCollapsed)]))
    );

    const effectiveActiveItemKey = activeItemKey ?? innerActiveItemKey;

    return (
      <div ref={ref} className={clsx('xds-menu', className)} {...props}>
        {DEFAULT_MENU_GROUPS.map((group) => {
          const collapsed = collapsedMap[group.key] ?? false;

          return (
            <div key={group.key} className={clsx('xds-menu-group', collapsed && 'is-collapsed')}>
              <div
                className="xds-menu-group__header"
                onClick={() =>
                  setCollapsedMap((prev) => ({
                    ...prev,
                    [group.key]: !collapsed,
                  }))
                }
              >
                <Icon name={group.icon} />
                <span className="xds-menu-group__title">{group.title}</span>
                <Icon className="xds-menu-group__action" name={collapsed ? 'ic-arrow-down-line' : 'ic-arrow-up-line'} />
              </div>

              <div className="xds-menu-group__content">
                {group.items.map((item) => (
                  <div
                    key={item.key}
                    className={clsx(
                      'xds-menu-item',
                      item.key === effectiveActiveItemKey && 'is-active'
                    )}
                    onClick={() => {
                      if (activeItemKey === undefined) {
                        setInnerActiveItemKey(item.key);
                      }
                      onItemChange?.(item.key);
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
Menu.displayName = 'Menu';
