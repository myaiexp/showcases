// One-dimensional cell: every episode a stripe, ticks only per season
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const simpsons = await csv('simpsons.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      x: {
        ticks: simpsons.filter((d) => d.number_in_season === 1 && (!preview || d.season % 3 === 1)).map((d) => d.id),
        tickFormat: (x: number) => simpsons.find((d) => d.id === x)?.season,
        label: 'Season',
        labelAnchor: 'right',
        labelArrow: true,
      },
      color: { type: 'linear', scheme: 'PiYG' },
      marks: [Plot.cell(simpsons, { x: 'id', fill: 'imdb_rating' })],
    }),
  );
};

export default mount;
