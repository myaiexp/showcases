// Treemap quick start: nested name/value/children data drawn as rectangles
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { asSpec, moduleTree, reseed, treemapBase } from '../../shared/hierarchy-data.ts';

const mount: Mount = (el, ctx) => {
  // The Getting Started spec: hierarchical data, a category field and a weight field.
  const { vchart, release } = createChart(el, ctx, asSpec({
    ...treemapBase(ctx.preview),
    data: [{ id: 'data', values: moduleTree() }],
    title: { visible: !ctx.preview, text: 'Module sizes' },
  }));

  // New weights, same tree: the rectangles animate to their new sizes.
  let seed = 5;
  let alive = true;
  const stop = every(2200, () => {
    if (alive) void vchart.updateData('data', reseed(++seed) as never);
  });

  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
