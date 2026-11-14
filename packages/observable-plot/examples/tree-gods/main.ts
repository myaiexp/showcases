// A family tree of Greek gods from slash-separated paths with Plot.tree
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';

const gods = ['Chaos/Gaia/Mountains', 'Chaos/Gaia/Pontus', 'Chaos/Gaia/Uranus', 'Chaos/Eros', 'Chaos/Erebus', 'Chaos/Tartarus'];

const mount: Mount = (el, ctx) =>
  mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height: height ?? 100,
      axis: null,
      margin: 10,
      marginLeft: 40,
      marginRight: 120,
      marks: [Plot.tree(gods, { textStroke: 'var(--plot-background)' })],
    }),
  );

export default mount;
