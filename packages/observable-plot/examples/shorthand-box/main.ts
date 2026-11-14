// boxX: a horizontal box plot from a bare array of numbers
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';
import { numbers } from '../../shared/shorthand-data.ts';

const mount: Mount = (el, ctx) => mountStatic(el, ctx, ({ width, height }) => Plot.boxX(numbers).plot({ width, height }));

export default mount;
