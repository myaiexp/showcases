// Circle packing quick start: nested circles sized by weight
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { asSpec, packingBase, salesTree } from '../../shared/hierarchy-data.ts';

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, asSpec(packingBase(ctx.preview)));

  let seed = 9;
  let alive = true;
  const stop = every(2200, () => {
    if (alive) void vchart.updateData('data', [{ name: 'All sales', children: salesTree(++seed) }] as never);
  });

  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
