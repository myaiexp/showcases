// Tip: the channels option adds name and sport to what a tip shows
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 4) : all;
  return mountPlot<{ extra: boolean }>(el, ctx, {
    initial: { extra: true },
    render: ({ extra }, { width, height }) =>
      Plot.dot(olympians, {
        x: 'weight',
        y: 'height',
        stroke: 'sex',
        channels: extra ? { name: 'name', sport: 'sport' } : {},
        tip: true,
      }).plot({ width, height }),
    step: ({ extra }) => ({ extra: !extra }),
    previewMs: 3500,
    after: (root, _live, size) => (size.preview ? sweepPointer(root, (t) => [0.3 + 0.4 * t, 0.3 + 0.4 * (1 - t)], 3500) : undefined),
    controls: (bar, live) => {
      toggle(bar, 'channels: name, sport', live.state.extra, (extra) => live.set({ extra }));
    },
  });
};

export default mount;
