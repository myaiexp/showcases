// Sankey flat data: a nodes list plus links with source, target and value
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { asSpec, budgetFlat, sankeyBase } from '../../shared/flow-data.ts';

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, asSpec({
    ...sankeyBase(ctx.preview),
    title: { visible: !ctx.preview, text: 'A household budget' },
  }));

  // Same nodes, new link amounts: the bands animate to their new widths.
  let seed = 4;
  let alive = true;
  const stop = every(2200, () => {
    if (alive) void vchart.updateData('data', budgetFlat(++seed) as never);
  });

  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
