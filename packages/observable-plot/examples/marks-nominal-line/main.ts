// A line over nominal values: Plot draws it, but it means nothing
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) =>
  mountStatic(el, ctx, ({ width, height }) =>
    // Shorthand: x is the index, y is the string itself, so y becomes an ordinal scale.
    Plot.lineY(['please', 'don’t', 'do', 'this']).plot({ width, height }),
  );

export default mount;
