// rectY with a bare binX: a histogram of the numbers
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';
import { numbers } from '../../shared/shorthand-data.ts';

const mount: Mount = (el, ctx) => mountStatic(el, ctx, ({ width, height }) => Plot.rectY(numbers, Plot.binX()).plot({ width, height }));

export default mount;
