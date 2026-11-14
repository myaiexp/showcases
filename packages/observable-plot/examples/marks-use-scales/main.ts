// Marks use scales: one line on a log or linear y scale
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';
import { after } from '../../shared/marks-data.ts';

const TYPES = ['log', 'linear'] as const;
type ScaleType = (typeof TYPES)[number];

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ type: ScaleType }>(el, ctx, {
    initial: { type: 'log' },
    render: ({ type }, { width, height }) =>
      Plot.plot({
        width,
        height,
        // Changing the scale's type or domain changes every mark that uses it.
        y: { type, domain: [30, 300], grid: true },
        marks: [Plot.lineY(aapl, { x: 'Date', y: 'Close' })],
      }),
    step: ({ type }) => ({ type: after(TYPES, type) }),
    controls: (bar, live) => {
      select(bar, 'y type', TYPES, 'log', (type) => live.set({ type }));
    },
  });
};

export default mount;
