// groupX can output to any channel: r makes dots sized by athlete count
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
      marginBottom: preview ? 10 : 100,
      x: { label: null, tickRotate: 90, axis: preview ? null : 'bottom' },
      r: { range: [0, preview ? 9 : 14] },
      marks: [Plot.dot(olympians, Plot.groupX({ r: 'count' }, { x: 'sport' }))],
    }),
  );
};

export default mount;
