// Named columns_config presets for the Datagrid column styles example
import type { ViewerConfigUpdate } from '../../shared/setup.ts';

type ColumnsConfig = NonNullable<ViewerConfigUpdate['columns_config']>;

export const STYLES: Record<string, ColumnsConfig> = {
  // Numeric fg_mode "bar" draws a proportional bar; "label-bar" keeps the number too.
  bars: {
    qty: { fg_mode: 'bar', fg_gradient: 2000 },
    chg: { fg_mode: 'label-bar', fg_gradient: 4 },
  },
  // Numeric bg_mode "gradient": fill intensity scaled to the value, sign pivot at 0.5.
  gradient: {
    chg: {
      bg_mode: 'gradient',
      bg_color: 'linear-gradient(to right, #e0533d, #1a1a1a, #3d9be0)',
      bg_gradient: 4,
    },
  },
  // bg_mode "pulse" flashes a cell when its value changes.
  pulse: {
    price: { bg_mode: 'pulse' },
    chg: { bg_mode: 'pulse' },
  },
  // String fg_mode "series": one palette entry per distinct value; palettes have no positions.
  'string series': {
    symbol: { fg_mode: 'series', fg_color: 'linear-gradient(to right, #ff7a2f, #f6c453, #7ad17a, #3d9be0, #b07ae0)' },
    client: { bg_mode: 'series', bg_color: 'linear-gradient(to right, #3a2820, #20323a, #2a3a20, #3a203a, #20203a)' },
  },
  // String bg_mode "color": a single colour.
  'single colour': {
    client: { bg_mode: 'color', bg_color: '#2a1d18' },
    symbol: { fg_mode: 'color', fg_color: '#f6c453', bold: true },
  },
  'all together': {
    symbol: { fg_mode: 'series', fg_color: 'linear-gradient(to right, #ff7a2f, #f6c453, #7ad17a, #3d9be0, #b07ae0)' },
    price: { bg_mode: 'pulse' },
    chg: { bg_mode: 'gradient', bg_color: 'linear-gradient(to right, #e0533d, #1a1a1a, #3d9be0)', bg_gradient: 4 },
    qty: { fg_mode: 'label-bar', fg_gradient: 2000 },
  },
};
