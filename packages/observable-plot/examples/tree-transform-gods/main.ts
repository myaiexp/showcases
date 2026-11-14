// A tree built by hand from link, dot and text marks and the tree transforms
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';

const gods = [
  'Chaos/Gaia/Mountains',
  'Chaos/Gaia/Pontus',
  'Chaos/Gaia/Uranus',
  'Chaos/Eros',
  'Chaos/Erebus',
  'Chaos/Tartarus',
];

const mount: Mount = (el, ctx) =>
  mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height: height ?? 160,
      axis: null,
      margin: 20,
      marginRight: 120,
      marks: [
        Plot.link(gods, Plot.treeLink()),
        Plot.dot(gods, Plot.treeNode()),
        Plot.text(gods, Plot.treeNode({ text: 'node:name', dx: 6 })),
      ],
    }),
  );

export default mount;
