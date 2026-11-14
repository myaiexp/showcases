// Circle packing quick start: nested circles sized by weight
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { asSpec, pathOf, salesRoot, salesTree } from '../../shared/hierarchy-data.ts';

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, asSpec({
    type: 'circlePacking',
    data: [{ id: 'data', values: salesRoot() }],
    categoryField: 'name',
    valueField: 'value',
    circlePacking: { style: { fillOpacity: (d: { isLeaf?: boolean }) => (d.isLeaf ? 0.75 : 0.25) } },
    // Labels only on the country and region circles; the leaves are too small for text.
    label: { visible: !ctx.preview, style: { fontSize: 11, fill: '#fff', visible: (d: { depth: number }) => d.depth <= 2 } },
    tooltip: { mark: { title: { value: pathOf } } },
  }));

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
