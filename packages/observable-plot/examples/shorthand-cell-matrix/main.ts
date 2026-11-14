// cell over [name, name] pairs: a matrix of who reviewed whose code
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';
import { matrix } from '../../shared/shorthand-data.ts';

const mount: Mount = (el, ctx) => mountStatic(el, ctx, ({ width, height }) => Plot.cell(matrix).plot({ width, height }));

export default mount;
