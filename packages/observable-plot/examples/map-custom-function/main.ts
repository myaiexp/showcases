// Map transform with a function: z-score and moving-difference maps per series
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { stocks } from '../../shared/normalize-stocks.ts';

const FNS = ['z-score', 'day-over-day change', 'running max'] as const;
type Fn = (typeof FNS)[number];

// Each map function receives one series' values and returns an array of the same length.
const maps: Record<Fn, (v: number[]) => number[]> = {
  'z-score': (v) => {
    const m = d3.mean(v) ?? 0;
    const s = d3.deviation(v) || 1;
    return v.map((d) => (d - m) / s);
  },
  'day-over-day change': (v) => v.map((d, i) => (i === 0 ? 0 : d - (v[i - 1] ?? d))),
  'running max': (v) => v.map((_, i) => d3.max(v.slice(0, i + 1)) ?? 0),
};

const mount: Mount = async (el, ctx) => {
  const all = await stocks();
  return mountPlot<{ fn: Fn }>(el, ctx, {
    initial: { fn: 'z-score' },
    render: ({ fn }, { width, height }) =>
      Plot.lineY(all, Plot.mapY(maps[fn], { x: 'Date', y: 'Close', stroke: 'Symbol' })).plot({
        width,
        height,
        y: { grid: true, label: fn },
        color: { legend: !ctx.preview },
      }),
    step: ({ fn }) => ({ fn: FNS[(FNS.indexOf(fn) + 1) % FNS.length] ?? 'z-score' }),
    controls: (bar, live) => {
      select(bar, 'map function', FNS, live.state.fn, (fn) => live.set({ fn }));
    },
  });
};

export default mount;
