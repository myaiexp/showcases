// Cell with the group transform: max temperature by month and day
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const seattle = await csv('seattle-weather.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      padding: 0,
      y: { tickFormat: Plot.formatMonth('en', 'short') },
      marks: [
        Plot.cell(
          seattle,
          Plot.group(
            { fill: 'max' },
            {
              x: (d) => d.date.getUTCDate(),
              y: (d) => d.date.getUTCMonth(),
              fill: 'temp_max',
              inset: 0.5,
            },
          ),
        ),
      ],
    }),
  );
};

export default mount;
