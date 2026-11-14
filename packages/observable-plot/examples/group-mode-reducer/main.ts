// The mode reducer: which sex is more common in each sport
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
      color: { legend: !preview },
      // fill appears in both options and outputs, so mode reduces the raw sex values per group.
      marks: [Plot.cell(olympians, Plot.groupX({ fill: 'mode' }, { fill: 'sex', x: 'sport' }))],
    }),
  );
};

export default mount;
