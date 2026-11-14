// cellX: the numbers become fill colour along an ordinal x axis
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';
import { numbers } from '../../shared/shorthand-data.ts';

const mount: Mount = (el, ctx) => mountStatic(el, ctx, ({ width, height }) => Plot.cellX(numbers).plot({ width, height }));

export default mount;
