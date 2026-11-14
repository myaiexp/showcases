// Counting athletes by sex with groupX and a waffleY
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.waffleY(olympians, Plot.groupX({ y: 'count' }, { x: 'sex' })).plot({ width, height, x: { label: null } }),
  );
};

export default mount;
