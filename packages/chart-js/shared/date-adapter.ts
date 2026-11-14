// A small UTC date adapter, so time axes work without a date library
import { _adapters, type TimeUnit } from 'chart.js';

/**
 * time.md says the time scale needs a date library plus an adapter; the adapters it
 * links are other packages. This one implements the DateAdapter interface from
 * chart.js's own types (dist/core/core.adapters.d.ts) on plain UTC timestamps.
 *
 * Format tokens (used in time.displayFormats and time.tooltipFormat):
 *   yyyy year · MMM short month · MMMM month · MM month 01–12 · dd day 01–31 · d day ·
 *   EEE weekday · HH hour 00–23 · h hour 1–12 · mm minute · ss second · SSS ms · a am/pm.
 * Anything else is printed as is. Parsing takes timestamps, Dates and ISO strings.
 */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MS: Record<string, number> = {
  millisecond: 1,
  second: 1000,
  minute: 60_000,
  hour: 3_600_000,
  day: 86_400_000,
  week: 604_800_000,
};

const pad = (n: number, w = 2): string => String(n).padStart(w, '0');

function format(t: number, fmt: string): string {
  const d = new Date(t);
  const h = d.getUTCHours();
  const tokens: Record<string, () => string> = {
    yyyy: () => String(d.getUTCFullYear()),
    MMMM: () => MONTHS[d.getUTCMonth()] ?? '',
    MMM: () => (MONTHS[d.getUTCMonth()] ?? '').slice(0, 3),
    MM: () => pad(d.getUTCMonth() + 1),
    dd: () => pad(d.getUTCDate()),
    d: () => String(d.getUTCDate()),
    EEE: () => DAYS[d.getUTCDay()] ?? '',
    HH: () => pad(h),
    h: () => String(h % 12 || 12),
    mm: () => pad(d.getUTCMinutes()),
    ss: () => pad(d.getUTCSeconds()),
    SSS: () => pad(d.getUTCMilliseconds(), 3),
    a: () => (h < 12 ? 'am' : 'pm'),
  };
  return fmt.replace(/yyyy|MMMM|MMM|MM|dd|d|EEE|HH|h|mm|ss|SSS|a/g, (k) => tokens[k]?.() ?? k);
}

function addMonths(t: number, n: number): number {
  const d = new Date(t);
  d.setUTCMonth(d.getUTCMonth() + n);
  return d.getTime();
}

function monthsBetween(a: number, b: number): number {
  const da = new Date(a);
  const db = new Date(b);
  const whole = (da.getUTCFullYear() - db.getUTCFullYear()) * 12 + da.getUTCMonth() - db.getUTCMonth();
  // Count a partial month only once it is complete, as date libraries do.
  return addMonths(b, whole) > a ? whole - 1 : whole;
}

function startOf(t: number, unit: TimeUnit | 'isoWeek', weekday?: number | boolean): number {
  const d = new Date(t);
  switch (unit) {
    case 'year':
      return Date.UTC(d.getUTCFullYear(), 0, 1);
    case 'quarter':
      return Date.UTC(d.getUTCFullYear(), Math.floor(d.getUTCMonth() / 3) * 3, 1);
    case 'month':
      return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1);
    case 'week':
    case 'isoWeek': {
      const iso = typeof weekday === 'number' ? weekday % 7 : unit === 'isoWeek' ? 1 : 0;
      const day = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
      return day - ((d.getUTCDay() - iso + 7) % 7) * MS.day!;
    }
    default: {
      const size = MS[unit] ?? 1;
      return Math.floor(t / size) * size;
    }
  }
}

_adapters._date.override({
  formats: () => ({
    datetime: 'MMM d, yyyy, h:mm:ss a',
    millisecond: 'h:mm:ss.SSS a',
    second: 'h:mm:ss a',
    minute: 'h:mm a',
    hour: 'h a',
    day: 'MMM d',
    week: 'MMM d',
    month: 'MMM yyyy',
    quarter: 'MMM yyyy',
    year: 'yyyy',
  }),
  parse(value: unknown): number | null {
    if (value === null || value === undefined) return null;
    if (typeof value === 'number') return Number.isFinite(value) ? value : null;
    if (value instanceof Date) return value.getTime();
    if (typeof value === 'string') {
      const t = Date.parse(value);
      return Number.isNaN(t) ? null : t;
    }
    return null;
  },
  format: (t: number, fmt: string) => format(t, fmt),
  add(t: number, amount: number, unit: TimeUnit): number {
    if (unit === 'month') return addMonths(t, amount);
    if (unit === 'quarter') return addMonths(t, amount * 3);
    if (unit === 'year') return addMonths(t, amount * 12);
    return t + amount * (MS[unit] ?? 0);
  },
  diff(a: number, b: number, unit: TimeUnit): number {
    if (unit === 'month') return monthsBetween(a, b);
    if (unit === 'quarter') return Math.trunc(monthsBetween(a, b) / 3);
    if (unit === 'year') return Math.trunc(monthsBetween(a, b) / 12);
    return Math.trunc((a - b) / (MS[unit] ?? 1));
  },
  startOf,
  endOf(t: number, unit: TimeUnit): number {
    const next = this.add(startOf(t, unit), 1, unit);
    return next - 1;
  },
});
