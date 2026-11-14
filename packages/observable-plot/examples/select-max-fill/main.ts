// Select transform on fill: max or min keeps the extreme volume day
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { stocks } from '../../shared/normalize-stocks.ts';

const PICKS = ['max', 'min'] as const;
type Pick = (typeof PICKS)[number];

const mount: Mount = async (el, ctx) => {
  const all = await stocks();
  return mountPlot<{ pick: Pick }>(el, ctx, {
    initial: { pick: 'max' },
    render: ({ pick }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { type: 'log', grid: true },
        color: { scheme: 'viridis', legend: !ctx.preview, label: 'Volume' },
        marks: [
          Plot.line(all, { x: 'Date', y: 'Close', z: 'Symbol', stroke: 'currentColor', strokeOpacity: 0.3 }),
          // The selector names the channel to compare: the point with the extreme fill value.
          Plot.dot(all, Plot.select({ fill: pick }, { x: 'Date', y: 'Close', z: 'Symbol', fill: 'Volume', r: 6, stroke: 'currentColor' })),
        ],
      }),
    step: ({ pick }) => ({ pick: pick === 'max' ? 'min' : 'max' }),
    controls: (bar, live) => {
      select(bar, 'select on fill', PICKS, live.state.pick, (pick) => live.set({ pick }));
    },
  });
};

export default mount;
