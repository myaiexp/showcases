// A timeline: barX from x1 to x2, labelled by a text mark instead of a y axis
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const civilizations = await csv('civilizations.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      marginLeft: preview ? 10 : 130,
      axis: null,
      x: {
        axis: 'top',
        grid: true,
        tickFormat: (x: number) => (x < 0 ? `${-x} BC` : `${x} AD`),
      },
      marks: [
        Plot.barX(civilizations, { x1: 'start', x2: 'end', y: 'civilization', sort: { y: 'x1' } }),
        // Forty labels cannot fit in a 200px card, so only the full view has them.
        preview ? null : Plot.text(civilizations, { x: 'start', y: 'civilization', text: 'civilization', textAnchor: 'end', dx: -3 }),
      ],
    }),
  );
};

export default mount;
