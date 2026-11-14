// A one-dimensional heatmap: cell with groupX outputting fill: count
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      marginBottom: preview ? 10 : 80,
      x: { tickRotate: 90, axis: preview ? null : 'bottom' },
      color: { scheme: 'turbo' },
      // No y channel, so a cell (not a bar) draws each group, coloured by its count.
      marks: [Plot.cell(olympians, Plot.groupX({ fill: 'count' }, { x: 'sport' }))],
    }),
  );
};

export default mount;
