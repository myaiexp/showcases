// Named columns_config presets for the date and number formats example
import type { ViewerConfigUpdate } from '../../shared/setup.ts';

type ColumnsConfig = NonNullable<ViewerConfigUpdate['columns_config']>;

// save_restore.md § Datetime formats: either the dateStyle/timeStyle presets or per-part
// fields, never both, plus optional timeZone and hour12. A field left out is not shown.
// Order Date is a date column, and the date formatter honours only dateStyle (see
// createDateFormatter in the viewer's column-format.d.ts); per-part fields need a
// datetime column such as Shipped.
export const FORMATS: Record<string, ColumnsConfig> = {
  'plugin defaults': {},
  'dateStyle long, UTC': {
    'Order Date': { date_format: { dateStyle: 'long', timeZone: 'UTC' } },
    Shipped: { date_format: { dateStyle: 'long', timeStyle: 'short', timeZone: 'UTC' } },
  },
  'per-part: weekday, day, time': {
    'Order Date': { date_format: { dateStyle: 'full' } },
    Shipped: { date_format: { weekday: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Helsinki' } },
  },
  'time only, 12-hour, New York': {
    Shipped: { date_format: { timeStyle: 'medium', hour12: true, timeZone: 'America/New_York' } },
  },
  // number_format options follow Intl.NumberFormat: style, currency, notation, digits.
  'currency EUR and percent': {
    Sales: { number_format: { style: 'currency', currency: 'EUR' } },
    Discount: { number_format: { style: 'percent' } },
  },
  'compact notation': {
    Sales: { number_format: { notation: 'compact', compactDisplay: 'short' } },
    // One digit bound inherits the other from the plugin (config_defaults.md § Formats),
    // whose minimum is 2 for floats: a lone maximumFractionDigits of 0 cannot render.
    Discount: { number_format: { minimumFractionDigits: 0, maximumFractionDigits: 0 } },
  },
  'four fraction digits': {
    Sales: { number_format: { minimumFractionDigits: 4, maximumFractionDigits: 4 } },
  },
};
