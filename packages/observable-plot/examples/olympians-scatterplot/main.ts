// What is Plot? opener: athletes' weight against height, stroked by sex
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.dot(olympians, { x: 'weight', y: 'height', stroke: 'sex' }).plot({
      width,
      height,
      // The legend would crowd a 200px card.
      color: { legend: !preview },
    }),
  );
};

export default mount;
