// Hello, world: a frame mark and a text mark in one Plot.plot call
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) =>
  mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      marks: [Plot.frame(), Plot.text(['Hello, world!'], { frameAnchor: 'middle' })],
    }),
  );

export default mount;
