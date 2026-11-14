// Sunburst quick start: nested data as concentric rings
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { asSpec, salesTree, sunburstBase } from '../../shared/hierarchy-data.ts';

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, asSpec(sunburstBase(ctx.preview)));

  // Same tree with new weights: the arcs grow and shrink to the new values.
  let seed = 9;
  let alive = true;
  const stop = every(2200, () => {
    if (alive) void vchart.updateData('data', salesTree(++seed) as never);
  });

  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
