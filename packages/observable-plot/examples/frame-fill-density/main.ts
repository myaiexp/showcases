// Frame fill as an abstract value: 0 on the colour scale paints zero density
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { tsv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const faithful = await tsv('faithful.tsv');
  return mountPlot<{ filled: boolean }>(el, ctx, {
    initial: { filled: true },
    render: ({ filled }, { width, height }) =>
      Plot.plot({
        width,
        height,
        inset: 30,
        marks: [
          // fill: 0 is run through the same colour scale as the density: the scale's lowest colour.
          Plot.frame(filled ? { fill: 0 } : {}),
          Plot.density(faithful, { x: 'waiting', y: 'eruptions', fill: 'density' }),
        ],
      }),
    step: ({ filled }) => ({ filled: !filled }),
    controls: (bar, live) => toggle(bar, 'fill the frame with 0', live.state.filled, (filled) => live.set({ filled })),
  });
};

export default mount;
