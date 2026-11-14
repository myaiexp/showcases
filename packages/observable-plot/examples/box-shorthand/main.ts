// A single boxplot from an array of numbers; the 7 is an outlier dot
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) =>
  mountStatic(el, ctx, ({ width, height }) => Plot.boxX([0, 3, 4.4, 4.5, 4.6, 5, 7]).plot({ width, height }));

export default mount;
