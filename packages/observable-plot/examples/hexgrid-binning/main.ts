// Hexgrid beneath a hexbin: binWidth sets both the cells and the bins
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountPlot<{ binWidth: number }>(el, ctx, {
    initial: { binWidth: 20 },
    render: ({ binWidth }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marks: [
          Plot.hexgrid({ binWidth }),
          Plot.dot(penguins, Plot.hexbin<Plot.DotOptions>({ r: 'count' }, { x: 'culmen_length_mm', y: 'culmen_depth_mm', fill: 'currentColor', binWidth })),
        ],
      }),
    step: ({ binWidth }) => ({ binWidth: binWidth >= 40 ? 12 : binWidth + 14 }),
    controls: (bar, live) => slider(bar, 'binWidth', [10, 50, 2], live.state.binWidth, (binWidth) => live.set({ binWidth })),
  });
};

export default mount;
