// Hexbin partitioned by z: one overlapping set of hexagons per sex
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot<{ split: boolean }>(el, ctx, {
    initial: { split: true },
    render: ({ split }, { width, height }) =>
      Plot.dot(
        olympians,
        // With no z, fill or stroke input, all athletes in a bin share one hexagon.
        split
          ? Plot.hexbin({ stroke: 'mode', r: 'count' }, { x: 'weight', y: 'height', z: 'sex', stroke: 'sex' })
          : Plot.hexbin({ r: 'count' }, { x: 'weight', y: 'height', stroke: 'currentColor' }),
      ).plot({ width, height }),
    step: ({ split }) => ({ split: !split }),
    controls: (bar, live) => {
      toggle(bar, 'z: sex', live.state.split, (split) => live.set({ split }));
    },
  });
};

export default mount;
