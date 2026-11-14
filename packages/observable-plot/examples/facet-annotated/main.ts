// A text annotation in one facet only: fy is a single-element array
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      marginLeft: 60,
      marginRight: 60,
      grid: true,
      y: { label: null },
      fy: { label: null },
      color: { legend: !preview },
      marks: [
        Plot.barX(penguins, Plot.groupY({ x: 'count' }, { fy: 'species', y: 'island', fill: 'sex' })),
        Plot.text(['While Chinstrap and Gentoo penguins were each observed on only one island, Adelie penguins were observed on all three islands.'], {
          fy: ['Adelie'],
          frameAnchor: 'top-right',
          lineWidth: preview ? 12 : 18,
          fontSize: preview ? 8 : 10,
          dx: -6,
          dy: 6,
        }),
        Plot.frame(),
      ],
    }),
  );
};

export default mount;
