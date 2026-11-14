// Tip: the format option orders, relabels, formats or hides tip channels
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 4) : all;
  return mountPlot<{ formatted: boolean }>(el, ctx, {
    initial: { formatted: true },
    render: ({ formatted }, { width, height }) =>
      Plot.dot(olympians, {
        x: 'weight',
        y: 'height',
        stroke: 'sex',
        channels: {
          name: 'name',
          nationality: { value: 'nationality', label: 'country' },
          sport: 'sport',
        },
        tip: formatted
          ? {
              // Key order sets the order in the tip; false hides a channel.
              format: {
                name: true,
                sport: true,
                nationality: true,
                y: (d: number) => `${d}m`,
                x: (d: number) => `${d}kg`,
                stroke: false,
              },
            }
          : true,
      }).plot({ width, height }),
    step: ({ formatted }) => ({ formatted: !formatted }),
    previewMs: 3500,
    after: (root, _live, size) => (size.preview ? sweepPointer(root, (t) => [0.3 + 0.4 * t, 0.35 + 0.3 * (1 - t)], 3500) : undefined),
    controls: (bar, live) => {
      toggle(bar, 'format option', live.state.formatted, (formatted) => live.set({ formatted }));
    },
  });
};

export default mount;
