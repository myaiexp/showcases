// Scatter points with built-in or SVG-path symbols and a symbolSize that is a function of the data
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, button, every } from '../../shared/chart.ts';

// Seeded generator: three clusters of [x, y, weight] points.
function cloud(seed: number): number[][][] {
  let s = seed;
  const next = (): number => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return ([[20, 30], [55, 60], [75, 25]] as const).map(([cx, cy]) =>
    Array.from({ length: 16 }, () => [Math.round(cx + (next() - 0.5) * 36), Math.round(cy + (next() - 0.5) * 36), Math.round(1 + next() * 99)]),
  );
}

// An SVG path as a symbol: 'path://' followed by the d attribute (a heart, in a 0-100 box).
const HEART = 'path://M50 88 C10 55 0 35 12 20 C25 5 45 12 50 28 C55 12 75 5 88 20 C100 35 90 55 50 88 Z';
const symbols = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', HEART];
const symbolLabels = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'path:// heart'];

// symbolSize can be a number, a [w, h] pair, or a function (value, params) => number | [w, h].
const sizers: Record<string, (v: number[]) => number> = {
  'fixed 14': () => 14,
  'by weight (linear)': (v) => 6 + (v[2] ?? 0) / 4,
  'by weight (area)': (v) => 4 + Math.sqrt(v[2] ?? 0) * 3,
};

function build(groups: number[][][], symbol: string | null, sizerName: string, preview: boolean): EChartsOption {
  const defaults = ['circle', 'triangle', 'diamond'];
  return {
    tooltip: { trigger: 'item' },
    legend: preview ? { show: false } : {},
    // ECharts 6 puts the legend at the bottom by default; the grid leaves room for it.
    grid: { top: preview ? 12 : 40, left: 36, right: 16, bottom: preview ? 24 : 60 },
    xAxis: { type: 'value', min: 0, max: 100 },
    yAxis: { type: 'value', min: 0, max: 100 },
    series: groups.map((data, i) => ({
      name: `group ${i + 1}`,
      type: 'scatter' as const,
      data,
      symbol: symbol ?? defaults[i],
      symbolSize: sizers[sizerName],
      itemStyle: { opacity: 0.8 },
    })),
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let seed = 21;
  let groups = cloud(seed);
  let symbol: string | null = null; // null: each group keeps its own default shape
  let sizerName = 'by weight (area)';
  const show = (): void => {
    chart.setOption(build(groups, symbol, sizerName, ctx.preview));
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    // Resample the clouds: the points glide to new positions and sizes.
    stop = every(1800, () => {
      seed += 1;
      groups = cloud(seed);
      show();
    });
  } else {
    select(bar!, 'symbol', ['per group', ...symbolLabels], (v) => {
      symbol = v === 'per group' ? null : (symbols[symbolLabels.indexOf(v)] ?? null);
      show();
    });
    select(bar!, 'symbolSize', Object.keys(sizers), (v) => {
      sizerName = v;
      show();
    });
    button(bar!, 'new data', () => {
      seed += 1;
      groups = cloud(seed);
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
