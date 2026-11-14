// Formatter plugin options: timeMode, numeric and custom formatter
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

type Mode = 'defaults' | 'timeMode utc' | 'numericFormatter' | 'customFormatter';
const MODES: Mode[] = ['defaults', 'timeMode utc', 'numericFormatter', 'customFormatter'];

const rows = [
  { time: new Date(2024, 5, 1, 1, 30).getTime(), value: 1234.5 },
  { time: new Date(2024, 5, 2, 1, 30).getTime(), value: 20345.25 },
  { time: new Date(2024, 5, 3, 1, 30).getTime(), value: 998.125 },
  { time: new Date(2024, 5, 4, 1, 30).getTime(), value: 45000 },
];

/** The `formatter` option object for a mode (the plugin reads it from the chart spec). */
function options(mode: Mode): unknown {
  switch (mode) {
    case 'timeMode utc':
      // Dates are formatted in UTC instead of the browser's time zone.
      return { timeMode: 'utc' };
    case 'numericFormatter':
      // Replaces how number specifiers are evaluated: here Intl instead of d3-format.
      return { numericFormatter: (_specifier: string, value: number) => new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 }).format(Number(value)) };
    case 'customFormatter':
      // Replaces the whole plugin logic: every formatter string goes through this function.
      return { customFormatter: (specifier: string, text: unknown) => '[' + specifier + '] ' + String(text) };
    default:
      return {};
  }
}

const mount: Mount = (el, ctx) =>
  mountLive<{ mode: Mode }>(el, ctx, {
    initial: { mode: 'defaults' },
    build: ({ mode }) =>
      ({
        type: 'bar',
        data: [{ id: 'rows', values: rows }],
        xField: 'time',
        yField: 'value',
        formatter: options(mode),
        label: { visible: true, formatter: '{value:,.1f}', style: { fill: '#E6E9F2', fontSize: ctx.preview ? 9 : 13 } },
        axes: [
          { orient: 'bottom', type: 'band', label: { formatter: '{label:%d %b %H:%M}', autoRotate: true } },
          { orient: 'left', type: 'linear', label: { formatter: '{label:~s}' } },
        ],
        animation: false,
      }) as never,
    controls(bar, live) {
      select(bar, 'spec.formatter', MODES, (mode) => live.set({ mode: mode as Mode }));
    },
    step: (_, i) => ({ mode: MODES[i % MODES.length] as Mode }),
    mode: 'rebuild',
    previewMs: 1700,
  });

export default mount;
