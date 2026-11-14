// A grouped unit chart: penguins counted by sex, faceted by island with fy
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height,
      marginLeft: 60,
      marginRight: 60,
      label: null,
      x: { label: 'Frequency' },
      y: { padding: 0 },
      marks: [Plot.barX(penguins, { fy: 'island', y: 'sex', x: 1, inset: 0.5 }), Plot.ruleX([0])],
    }),
  );
};

export default mount;
