// Stacked waffles: weight brackets split by sex, 10 athletes per cell
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.waffleY(olympians, Plot.groupZ({ y: 'count' }, { fill: 'sex', sort: 'sex', fx: 'weight', unit: 10 })).plot({
      width,
      height,
      fx: { interval: 10 },
      color: { legend: !height },
    }),
  );
};

export default mount;
