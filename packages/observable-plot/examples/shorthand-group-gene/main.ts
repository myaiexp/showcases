// barY with a bare groupX: how often each base appears in a DNA string
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';
import { gene } from '../../shared/shorthand-data.ts';

const mount: Mount = (el, ctx) => mountStatic(el, ctx, ({ width, height }) => Plot.barY(gene, Plot.groupX()).plot({ width, height }));

export default mount;
