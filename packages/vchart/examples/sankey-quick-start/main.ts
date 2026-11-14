// Sankey quick start: nested children data becomes columns of nodes and links
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { asSpec, budgetNested } from '../../shared/flow-data.ts';

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, asSpec({
    type: 'sankey',
    data: [{ id: 'data', values: budgetNested() }],
    categoryField: 'name',
    valueField: 'value',
    nodeAlign: 'left',
    nodeGap: ctx.preview ? 6 : 10,
    nodeWidth: 12,
    minNodeHeight: 4,
    // Nested data has no source/target columns; the node name is the key.
    nodeKey: (datum: { name: string }) => datum.name,
    label: { visible: true, style: { fontSize: ctx.preview ? 8 : 11 } },
    emphasis: { enable: true, effect: 'adjacency' },
  }));

  let seed = 4;
  let alive = true;
  const stop = every(2200, () => {
    if (alive) void vchart.updateData('data', budgetNested(++seed) as never);
  });

  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
