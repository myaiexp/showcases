// A hierarchy from slash-separated paths: treeLink draws bump-x links, treeNode the nodes
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';

const gods = ['Chaos/Gaia/Mountains', 'Chaos/Gaia/Pontus', 'Chaos/Gaia/Uranus', 'Chaos/Eros', 'Chaos/Erebus', 'Chaos/Tartarus'];

const mount: Mount = (el, ctx) =>
  mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height: preview ? height : 120,
      axis: null,
      inset: 20,
      insetRight: 120,
      marks: [
        Plot.link(gods, Plot.treeLink({ stroke: 'node:internal' })),
        Plot.dot(gods, Plot.treeNode({ fill: 'node:internal' })),
        Plot.text(gods, Plot.treeNode({ text: 'node:name', stroke: 'var(--plot-background)', fill: 'currentColor', dx: 6 })),
      ],
    }),
  );

export default mount;
