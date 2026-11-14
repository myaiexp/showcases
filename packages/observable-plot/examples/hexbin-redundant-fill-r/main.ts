// Hexbin with both fill and r outputs: a redundant encoding of the count
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot<{ stroke: boolean }>(el, ctx, {
    initial: { stroke: true },
    render: ({ stroke }, { width, height }) =>
      Plot.dot(
        olympians,
        Plot.hexbin({ fill: 'count', r: 'count' }, { x: 'weight', y: 'height', stroke: stroke ? 'currentColor' : undefined }),
      ).plot({ width, height, color: { scheme: 'YlGnBu' } }),
    step: ({ stroke }) => ({ stroke: !stroke }),
    controls: (bar, live) => {
      toggle(bar, 'stroke (keeps the smallest hexagons visible)', live.state.stroke, (stroke) => live.set({ stroke }));
    },
  });
};

export default mount;
