// Sunburst quick start: nested data as concentric rings
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { asSpec, pathOf, salesTree } from '../../shared/hierarchy-data.ts';

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, asSpec({
    type: 'sunburst',
    data: [{ id: 'data', values: salesTree() }],
    categoryField: 'name',
    valueField: 'value',
    outerRadius: 0.95,
    sunburst: { style: { fillOpacity: (d: { isLeaf?: boolean }) => (d.isLeaf ? 0.45 : 0.85) } },
    // Cards are too small for arc labels.
    label: { visible: !ctx.preview, style: { fontSize: 11 } },
    tooltip: { mark: { title: { value: pathOf } } },
  }));

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
