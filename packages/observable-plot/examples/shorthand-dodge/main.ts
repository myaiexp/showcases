// dotX with a bare dodgeY: a beeswarm of the numbers
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';
import { numbers } from '../../shared/shorthand-data.ts';

const mount: Mount = (el, ctx) => mountStatic(el, ctx, ({ width, height }) => Plot.dotX(numbers, Plot.dodgeY()).plot({ width, height }));

export default mount;
