import React from 'react';
import { clsx } from 'clsx';
import { Icon } from '../Icon/Icon';

export interface TimeFilterOption {
  value: string;
  label: React.ReactNode;
}

export interface TimeFilterChangePayload {
  stat: string;
  compare: string;
  statRange?: { start: Date; end: Date } | null;
  compareRange?: { start: Date; end: Date } | null;
}

export interface TimeFilterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  statOptions?: TimeFilterOption[];
  compareOptionsMap?: Record<string, TimeFilterOption[]>;
  defaultStat?: string;
  defaultCompare?: string;
  emphasis?: boolean;
  onChange?: (value: TimeFilterChangePayload) => void;
}

const DEFAULT_STAT_OPTIONS: TimeFilterOption[] = [
  { value: '7d', label: '近7天' },
  { value: '30d', label: '近30天' },
  { value: 'week', label: '本周' },
  { value: 'month', label: '本月' },
];

const DEFAULT_COMPARE_OPTIONS_MAP: Record<string, TimeFilterOption[]> = {
  '7d': [
    { value: 'last-period', label: '临期环比' },
  ],
  '30d': [
    { value: 'last-period', label: '临期环比' },
  ],
  week: [
    { value: 'last-week', label: '较上周' },
  ],
  month: [
    { value: 'last-month', label: '较上月' },
    { value: 'last-month-end', label: '较上月末' },
  ],
  custom: [
    { value: 'last-period', label: '临期环比' },
  ],
};

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function formatDate(date: Date) {
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
}

function formatDateRange(start: Date, end: Date) {
  const currentYear = new Date().getFullYear();
  const formatShort = (d: Date) => `${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
  if (start.getFullYear() === currentYear && end.getFullYear() === currentYear) {
    return `${formatShort(start)}-${formatShort(end)}`;
  }
  return `${formatDate(start)}-${formatDate(end)}`;
}

function getStatRange(value: string, customStart?: Date | null, customEnd?: Date | null): { start: Date; end: Date } | null {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let start: Date | null = null;
  let end: Date | null = null;

  switch (value) {
    case '7d':
      start = new Date(today);
      start.setDate(start.getDate() - 6);
      end = today;
      break;
    case '30d':
      start = new Date(today);
      start.setDate(start.getDate() - 29);
      end = today;
      break;
    case 'week': {
      const dow = today.getDay();
      const offset = dow === 0 ? -6 : 1 - dow;
      start = new Date(today);
      start.setDate(start.getDate() + offset);
      end = today;
      break;
    }
    case 'month':
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = today;
      break;
    case 'custom':
      if (customStart && customEnd) {
        start = customStart;
        end = customEnd;
      }
      break;
  }
  return start && end ? { start, end } : null;
}

function getCompareRange(
  statValue: string,
  compareValue: string,
  statCustomStart?: Date | null,
  statCustomEnd?: Date | null,
  compareCustomStart?: Date | null,
  compareCustomEnd?: Date | null
): { start: Date; end: Date } | null {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let start: Date | null = null;
  let end: Date | null = null;

  if (compareValue === 'custom') {
    if (compareCustomStart && compareCustomEnd) return { start: compareCustomStart, end: compareCustomEnd };
    return null;
  }

  switch (statValue) {
    case '7d':
      if (compareValue === 'last-period') {
        start = new Date(today);
        start.setDate(start.getDate() - 13);
        end = new Date(today);
        end.setDate(end.getDate() - 7);
      }
      break;
    case '30d':
      if (compareValue === 'last-period') {
        start = new Date(today);
        start.setDate(start.getDate() - 59);
        end = new Date(today);
        end.setDate(end.getDate() - 30);
      }
      break;
    case 'week':
      if (compareValue === 'last-week') {
        const dow = today.getDay();
        const offset = dow === 0 ? -6 : 1 - dow;
        start = new Date(today);
        start.setDate(start.getDate() + offset - 7);
        end = new Date(start);
        end.setDate(end.getDate() + 6);
      }
      break;
    case 'month':
      if (compareValue === 'last-month') {
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      } else if (compareValue === 'last-month-end') {
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
      }
      break;
    case 'custom':
      if (compareValue === 'last-period' && statCustomStart && statCustomEnd) {
        const days = Math.ceil((statCustomEnd.getTime() - statCustomStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        end = new Date(statCustomStart);
        end.setDate(end.getDate() - 1);
        start = new Date(end);
        start.setDate(start.getDate() - days + 1);
      }
      break;
  }
  return start && end ? { start, end } : null;
}

interface DatePickerProps {
  initialStart?: Date | null;
  initialEnd?: Date | null;
  onConfirm: (start: Date, end: Date) => void;
  onCancel: () => void;
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

const DatePicker: React.FC<DatePickerProps> = ({ initialStart, initialEnd, onConfirm, onCancel }) => {
  const [currentMonth, setCurrentMonth] = React.useState(() => initialStart || new Date());
  const [start, setStart] = React.useState<Date | null>(initialStart ?? null);
  const [end, setEnd] = React.useState<Date | null>(initialEnd ?? null);
  const [selectingStart, setSelectingStart] = React.useState(true);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const today = React.useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const cells: Array<{ date: Date; otherMonth: boolean }> = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, prevMonthLastDay - i), otherMonth: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), otherMonth: false });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ date: new Date(year, month + 1, d), otherMonth: true });
  }

  const handleDayClick = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    if (selectingStart || !start) {
      setStart(d);
      setEnd(null);
      setSelectingStart(false);
    } else {
      if (d < start) {
        setEnd(start);
        setStart(d);
      } else {
        setEnd(d);
      }
      setSelectingStart(true);
    }
  };

  const navMonth = (delta: number) => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + delta);
    setCurrentMonth(next);
  };
  const navYear = (delta: number) => {
    const next = new Date(currentMonth);
    next.setFullYear(next.getFullYear() + delta);
    setCurrentMonth(next);
  };

  return (
    <div className="xds-date-picker-popup" onClick={(e) => e.stopPropagation()}>
      <div className="xds-date-picker__header">
        <div className="xds-date-picker__nav">
          <button type="button" className="xds-date-picker__nav-btn" onClick={() => navYear(-1)} aria-label="上一年">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="xds-date-picker__nav-btn" onClick={() => navMonth(-1)} aria-label="上一月">
            <Icon name="ic-arrow-left-line" />
          </button>
        </div>
        <div className="xds-date-picker__title">{`${year}年 ${month + 1}月`}</div>
        <div className="xds-date-picker__nav">
          <button type="button" className="xds-date-picker__nav-btn" onClick={() => navMonth(1)} aria-label="下一月">
            <Icon name="ic-arrow-right-line" />
          </button>
          <button type="button" className="xds-date-picker__nav-btn" onClick={() => navYear(1)} aria-label="下一年">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <path d="M13 17l5-5-5-5M6 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <div className="xds-date-picker__calendar">
        {WEEKDAYS.map((d) => (
          <div key={d} className="xds-date-picker__weekday">
            {d}
          </div>
        ))}
        {cells.map(({ date, otherMonth }, idx) => {
          const isToday = date.toDateString() === today.toDateString();
          const isSelectedStart = start && date.toDateString() === start.toDateString();
          const isSelectedEnd = end && date.toDateString() === end.toDateString();
          const inRange = start && end && date > start && date < end;
          return (
            <button
              type="button"
              key={idx}
              className={clsx(
                'xds-date-picker__day',
                otherMonth && 'is-other-month',
                isToday && 'is-today',
                (isSelectedStart || isSelectedEnd) && 'is-selected',
                inRange && 'is-in-range'
              )}
              onClick={() => handleDayClick(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
      <div className="xds-date-picker__footer">
        <button type="button" className="xds-date-picker__btn xds-date-picker__btn--cancel" onClick={onCancel}>
          取消
        </button>
        <button
          type="button"
          className="xds-date-picker__btn xds-date-picker__btn--confirm"
          disabled={!start || !end}
          onClick={() => start && end && onConfirm(start, end)}
        >
          确定
        </button>
      </div>
    </div>
  );
};

export const TimeFilter = React.forwardRef<HTMLDivElement, TimeFilterProps>(
  (
    {
      className,
      statOptions = DEFAULT_STAT_OPTIONS,
      compareOptionsMap = DEFAULT_COMPARE_OPTIONS_MAP,
      defaultStat = '7d',
      defaultCompare,
      emphasis = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const [selectedStat, setSelectedStat] = React.useState(defaultStat);
    const compareList = React.useMemo(
      () => compareOptionsMap[selectedStat] ?? compareOptionsMap.custom ?? [],
      [compareOptionsMap, selectedStat]
    );
    const [selectedCompare, setSelectedCompare] = React.useState<string>(
      defaultCompare ?? compareList[0]?.value ?? 'last-period'
    );
    const [statCustom, setStatCustom] = React.useState<{ start: Date; end: Date } | null>(null);
    const [compareCustom, setCompareCustom] = React.useState<{ start: Date; end: Date } | null>(null);
    const [openPicker, setOpenPicker] = React.useState<'stat' | 'compare' | null>(null);

    const containerRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    React.useEffect(() => {
      if (!openPicker) return;
      const handler = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setOpenPicker(null);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [openPicker]);

    const statRange = React.useMemo(
      () => getStatRange(selectedStat, statCustom?.start, statCustom?.end),
      [selectedStat, statCustom]
    );
    const compareRange = React.useMemo(
      () =>
        getCompareRange(
          selectedStat,
          selectedCompare,
          statCustom?.start,
          statCustom?.end,
          compareCustom?.start,
          compareCustom?.end
        ),
      [selectedStat, selectedCompare, statCustom, compareCustom]
    );

    const fireChange = (
      nextStat: string,
      nextCompare: string,
      nextStatCustom = statCustom,
      nextCompareCustom = compareCustom
    ) => {
      const sr = getStatRange(nextStat, nextStatCustom?.start, nextStatCustom?.end);
      const cr = getCompareRange(
        nextStat,
        nextCompare,
        nextStatCustom?.start,
        nextStatCustom?.end,
        nextCompareCustom?.start,
        nextCompareCustom?.end
      );
      onChange?.({ stat: nextStat, compare: nextCompare, statRange: sr, compareRange: cr });
    };

    const selectStat = (value: string) => {
      const nextCompareList = compareOptionsMap[value] ?? compareOptionsMap.custom ?? [];
      const nextCompare = nextCompareList[0]?.value ?? 'last-period';
      setSelectedStat(value);
      setSelectedCompare(nextCompare);
      setOpenPicker(null);
      fireChange(value, nextCompare);
    };

    const selectCompare = (value: string) => {
      setSelectedCompare(value);
      setOpenPicker(null);
      fireChange(selectedStat, value);
    };

    const handleStatCustomConfirm = (start: Date, end: Date) => {
      const nextStatCustom = { start, end };
      const nextCompareList = compareOptionsMap.custom ?? [];
      const nextCompare = nextCompareList[0]?.value ?? 'last-period';
      setStatCustom(nextStatCustom);
      setSelectedStat('custom');
      setSelectedCompare(nextCompare);
      setOpenPicker(null);
      fireChange('custom', nextCompare, nextStatCustom);
    };

    const handleCompareCustomConfirm = (start: Date, end: Date) => {
      const nextCompareCustom = { start, end };
      setCompareCustom(nextCompareCustom);
      setSelectedCompare('custom');
      setOpenPicker(null);
      fireChange(selectedStat, 'custom', statCustom, nextCompareCustom);
    };

    const renderOption = (
      option: TimeFilterOption,
      group: 'stat' | 'compare',
      active: boolean,
      range: { start: Date; end: Date } | null
    ) => {
      const label = active && range ? `${option.label}(${formatDateRange(range.start, range.end)})` : option.label;
      return (
        <button
          key={option.value}
          type="button"
          className={clsx(
            'xds-time-filter__option',
            active && 'is-active',
            active && emphasis && 'is-emphasis'
          )}
          onClick={() => (group === 'stat' ? selectStat(option.value) : selectCompare(option.value))}
        >
          {label}
        </button>
      );
    };

    const statCustomActive = selectedStat === 'custom';
    const statCustomLabel = statCustomActive && statCustom ? formatDateRange(statCustom.start, statCustom.end) : '自定义';
    const compareCustomActive = selectedCompare === 'custom';
    const compareCustomLabel =
      compareCustomActive && compareCustom ? formatDateRange(compareCustom.start, compareCustom.end) : '自定义';

    return (
      <div ref={containerRef} className={clsx('xds-time-filter', className)} {...props}>
        <div className="xds-time-filter__section">
          <div className="xds-time-filter__options">
            {statOptions.map((option) => renderOption(option, 'stat', selectedStat === option.value, statRange))}
            <div className="xds-time-filter__custom-wrap">
              <button
                type="button"
                className={clsx(
                  'xds-time-filter__option',
                  'is-custom',
                  statCustomActive && 'is-active',
                  statCustomActive && emphasis && 'is-emphasis'
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenPicker(openPicker === 'stat' ? null : 'stat');
                }}
              >
                <span>{statCustomLabel}</span>
                <span className="xds-time-filter__icon" aria-hidden="true">
                  <Icon name="ic-arrow-down-line" />
                </span>
              </button>
              {openPicker === 'stat' ? (
                <DatePicker
                  initialStart={statCustom?.start}
                  initialEnd={statCustom?.end}
                  onConfirm={handleStatCustomConfirm}
                  onCancel={() => setOpenPicker(null)}
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className="xds-time-filter__divider" />

        <div className="xds-time-filter__section">
          <div className="xds-time-filter__options">
            {compareList.map((option) => renderOption(option, 'compare', selectedCompare === option.value, compareRange))}
            <div className="xds-time-filter__custom-wrap">
              <button
                type="button"
                className={clsx(
                  'xds-time-filter__option',
                  'is-custom',
                  compareCustomActive && 'is-active',
                  compareCustomActive && emphasis && 'is-emphasis'
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenPicker(openPicker === 'compare' ? null : 'compare');
                }}
              >
                <span>{compareCustomLabel}</span>
                <span className="xds-time-filter__icon" aria-hidden="true">
                  <Icon name="ic-arrow-down-line" />
                </span>
              </button>
              {openPicker === 'compare' ? (
                <DatePicker
                  initialStart={compareCustom?.start}
                  initialEnd={compareCustom?.end}
                  onConfirm={handleCompareCustomConfirm}
                  onCancel={() => setOpenPicker(null)}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TimeFilter.displayName = 'TimeFilter';
