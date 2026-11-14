// Several curves over the same Apple prices, switched on one by one
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const CURVES = ['linear', 'step', 'monotone-x', 'natural', 'basis'] as const;
type CurveName = (typeof CURVES)[number];

const mount: Mount = async (el, ctx) => {
  const aapl = (await csv('aapl.csv')).slice(-14);
  return mountPlot<{ on: readonly CurveName[] }>(el, ctx, {
    initial: { on: ['linear', 'natural'] },
    render: ({ on }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, label: 'Close' },
        color: { domain: [...CURVES], legend: !preview },
        marks: [
          Plot.dot(aapl, { x: 'Date', y: 'Close', fill: 'currentColor', r: 2.5 }),
          ...CURVES.filter((c) => on.includes(c)).map((curve) =>
            Plot.line(aapl, { x: 'Date', y: 'Close', curve, stroke: () => curve, strokeWidth: 2 }),
          ),
        ],
      }),
    // The card adds one curve per tick, then starts over.
    step: (_s, i) => ({ on: CURVES.slice(0, (i % CURVES.length) + 1) }),
    previewMs: 1300,
    controls: (bar, live) => {
      for (const c of CURVES)
        toggle(bar, c, live.state.on.includes(c), (v) => live.set({ on: CURVES.filter((k) => (k === c ? v : live.state.on.includes(k))) }));
    },
  });
};

export default mount;
