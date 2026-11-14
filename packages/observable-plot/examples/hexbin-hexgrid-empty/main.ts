// Hexgrid under a hexbin: the grid shows the bins that hold no athletes
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(all, 3) : all;
  return mountPlot<{ grid: boolean }>(el, ctx, {
    initial: { grid: true },
    render: ({ grid }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          grid ? Plot.hexgrid() : null,
          Plot.dot(olympians, Plot.hexbin({ r: 'count' }, { x: 'weight', y: 'height', fill: 'currentColor' })),
        ],
      }),
    step: ({ grid }) => ({ grid: !grid }),
    controls: (bar, live) => {
      toggle(bar, 'hexgrid mark', live.state.grid, (grid) => live.set({ grid }));
    },
  });
};

export default mount;
