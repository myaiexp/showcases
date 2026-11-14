// A simple waffleY: four counts, one cell per unit
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) =>
  mountStatic(el, ctx, ({ width, height }) =>
    Plot.waffleY([212, 207, 315, 11], { x: ['apples', 'bananas', 'oranges', 'pears'] }).plot({ width, height: height ?? 420 }),
  );

export default mount;
