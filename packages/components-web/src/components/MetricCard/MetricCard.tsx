import React from 'react';
import { clsx } from 'clsx';
import { Icon } from '../Icon/Icon';

export type MetricCardTheme =
  | 'color-1'
  | 'color-2'
  | 'color-3'
  | 'color-4'
  | 'color-5'
  | 'light-purple'
  | 'gray';

export type MetricCardSize = 'default-size' | 'small';

export interface MetricCardMetricValue {
  value: React.ReactNode;
  type?: 'success' | 'danger' | 'default';
}

export interface MetricCardMetricItem {
  label?: React.ReactNode;
  value: React.ReactNode | MetricCardMetricValue;
}

export interface MetricCardProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title' | 'value'> {
  title: React.ReactNode;
  value: React.ReactNode;
  currency?: React.ReactNode;
  unit?: React.ReactNode;
  metrics?: MetricCardMetricItem[];
  theme?: MetricCardTheme;
  size?: MetricCardSize;
  selected?: boolean;
  showInfo?: boolean;
  arrowDirection?: 'bottom' | 'right';
  /**
   * 是否可交互（hover 边框 / selected 边框 / 装饰图隐藏）。
   * 不传时按是否绑定 onClick 自动推断。
   */
  clickable?: boolean;
}

function getMetricValue(metric: MetricCardMetricItem): MetricCardMetricValue {
  if (typeof metric.value === 'object' && metric.value !== null && 'value' in metric.value) {
    return metric.value as MetricCardMetricValue;
  }

  return { value: metric.value };
}

export const MetricCard = React.forwardRef<HTMLButtonElement, MetricCardProps>(
  (
    {
      className,
      title,
      value,
      currency,
      unit,
      metrics = [],
      theme = 'color-1',
      size = 'default-size',
      selected = false,
      showInfo = false,
      arrowDirection = 'bottom',
      clickable,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const isClickable = clickable !== undefined ? clickable : Boolean(onClick);
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={clsx(
          'xds-metric-card',
          `xds-metric-card--theme-${theme}`,
          `xds-metric-card--${size}`,
          isClickable && 'is-clickable',
          selected && 'is-selected',
          `xds-metric-card--arrow-${arrowDirection}`,
          className
        )}
        {...props}
      >
        <div className="xds-metric-card__content">
          <div className="xds-metric-card__header">
            <div className="xds-metric-card__title-wrap">
              <span className="xds-metric-card__title">{title}</span>
              {showInfo ? (
                <span className="xds-metric-card__info" aria-hidden="true">
                  <Icon name="ic-question-line" />
                </span>
              ) : null}
            </div>
          </div>

          <div className="xds-metric-card__body">
            <div className="xds-metric-card__value-row">
              {currency ? <span className="xds-metric-card__currency">{currency}</span> : null}
              <span className="xds-metric-card__value">{value}</span>
              {unit ? <span className="xds-metric-card__unit">{unit}</span> : null}
            </div>

            {metrics.length ? (
              <div className="xds-metric-card__metrics">
                {metrics.map((metric, index) => {
                  const metricValue = getMetricValue(metric);
                  return (
                    <div key={index} className="xds-metric-card__metric">
                      {metric.label ? <span className="xds-metric-card__metric-label">{metric.label}</span> : null}
                      <span
                        className={clsx(
                          'xds-metric-card__metric-value',
                          metricValue.type && metricValue.type !== 'default' && `is-${metricValue.type}`
                        )}
                      >
                        {metricValue.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {children}
          </div>
        </div>

        <span className="xds-metric-card__arrow" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="12" viewBox="0 0 32 12" fill="none">
            <path
              d="M31.25 -7.75V0.75H25.9229C24.4799 0.75 23.1143 1.40549 22.2129 2.53223L16.9766 9.0791C16.4762 9.70461 15.5238 9.70461 15.0234 9.0791L9.78711 2.53223C8.88569 1.40549 7.5201 0.75 6.07715 0.75H0.75V-7.75H31.25Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </span>
      </button>
    );
  }
);

MetricCard.displayName = 'MetricCard';

export interface MetricCardGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  cards: Array<Omit<MetricCardProps, 'selected'> & { id: string }>;
  value?: string;
  defaultValue?: string;
  selectable?: boolean;
  onChange?: (value: string) => void;
}

export const MetricCardGroup = React.forwardRef<HTMLDivElement, MetricCardGroupProps>(
  ({ className, cards, value, defaultValue, selectable = true, onChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
    const activeValue = value !== undefined ? value : internalValue;

    const handleSelect = (nextValue: string) => {
      if (!selectable) return;
      if (value === undefined) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue);
    };

    return (
      <div ref={ref} className={clsx('xds-metric-card-group', className)} {...props}>
        {cards.map(({ id, onClick, clickable, ...card }) => (
          <MetricCard
            key={id}
            {...card}
            clickable={clickable !== undefined ? clickable : selectable}
            selected={id === activeValue}
            onClick={
              selectable
                ? (event) => {
                    handleSelect(id);
                    onClick?.(event);
                  }
                : onClick
            }
          />
        ))}
      </div>
    );
  }
);

MetricCardGroup.displayName = 'MetricCardGroup';
