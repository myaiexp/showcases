// Sankey flat data: a nodes list plus links with source, target and value
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { asSpec, budgetFlat } from '../../shared/flow-data.ts';

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, asSpec({
    type: 'sankey',
    data: [{ id: 'data', values: budgetFlat() }],
    categoryField: 'nodeName',
    valueField: 'value',
    sourceField: 'source',
    targetField: 'target',
    nodeKey: 'nodeName',
    nodeAlign: 'justify',
    nodeGap: ctx.preview ? 6 : 10,
    nodeWidth: 12,
    minNodeHeight: 4,
    link: { style: { fillOpacity: 0.5 } },
    label: { visible: true, style: { fontSize: ctx.preview ? 8 : 11 } },
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
