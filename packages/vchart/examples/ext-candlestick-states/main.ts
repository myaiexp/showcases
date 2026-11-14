// Candlestick rising, falling and doji styles, switched by a colour convention, hollow bodies and widths
import type { Mount } from '@/types.ts';
import { registerCandlestickChart } from '@visactor/vchart-extension';
import { mountLive } from '../../shared/live-spec.ts';
import { select, slider, type ISpec } from '../../shared/chart.ts';
import { candles, priceRange } from '../../shared/ext-data.ts';

registerCandlestickChart();

// Every third candle is a doji (open equals close), so the third state is visible.
const values = candles(22, 8).map((c, i) => (i % 5 === 2 ? { ...c, close: c.open } : c));

interface State {
  scheme: 'red up' | 'green up';
  hollow: boolean;
  boxWidth: number;
  lineWidth: number;
}

const COLORS = { red: '#e5484d', green: '#30a46c' };

function build(s: State, preview: boolean): ISpec {
  const up = s.scheme === 'red up' ? COLORS.red : COLORS.green;
  const down = s.scheme === 'red up' ? COLORS.green : COLORS.red;
  return {
    type: 'candlestick',
    animation: false,
    data: [{ id: 'k', values: preview ? values.slice(0, 14) : values }],
    xField: 'date',
    openField: 'open',
    highField: 'high',
    lowField: 'low',
    closeField: 'close',
    candlestick: { style: { boxWidth: s.boxWidth, lineWidth: s.lineWidth } },
    // boxFill left out of the style would fall back to the theme; 'transparent' hollows the body.
    rising: { style: { boxFill: s.hollow ? 'transparent' : up, stroke: up } },
    falling: { style: { boxFill: down, stroke: down } },
    doji: { style: { boxFill: '#d0d4dc', stroke: '#d0d4dc' } },
    axes: [{ orient: 'left', type: 'linear', ...priceRange(values), nice: false }, { orient: 'bottom', type: 'band' }],
  } as unknown as ISpec;
}

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { scheme: 'red up', hollow: false, boxWidth: 14, lineWidth: 1 },
    build: (s, p) => build(s, p),
    controls(bar, live) {
      select(bar, 'Colours', ['red up', 'green up'], (v) => live.set({ scheme: v as State['scheme'] }));
      select(bar, 'Rising body', ['filled', 'hollow'], (v) => live.set({ hollow: v === 'hollow' }));
      slider(bar, 'boxWidth', [4, 26, 1], 14, (v) => live.set({ boxWidth: v }));
      slider(bar, 'lineWidth', [1, 4, 1], 1, (v) => live.set({ lineWidth: v }));
    },
    step: (s, i) => ({
      scheme: i % 2 ? 'green up' : 'red up',
      hollow: i % 4 >= 2,
      boxWidth: i % 3 === 0 ? 8 : 12,
    }),
    previewMs: 1700,
    mode: 'rebuild',
  });

export default mount;
