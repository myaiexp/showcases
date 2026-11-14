// legend trigger: hover or click highlights the elements of a category
import { Graph } from '@antv/g6';
import type { EdgeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { legendData } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: legendData(),
        node: { style: { size: 24 }, palette: { field: 'cluster' } },
        edge: { style: { lineWidth: 2, stroke: (d: EdgeData) => (d.data?.cluster === 'edge-type1' ? '#1783ff' : '#f08f56') } },
        layout: { type: 'grid', cols: 2 },
        autoFit: 'view',
        padding: [20, 20, 20, stage.preview ? 80 : 120],
        plugins: [
          { type: 'legend', key: 'legend', trigger: 'hover', nodeField: 'cluster', edgeField: 'cluster', itemLabelFill: '#d6dcea', position: 'left-top', orientation: 'vertical', gridCol: 1, gridRow: 8 },
        ],
      }),
    );
    await graph.render();

    if (stage.bar) {
      select(stage.bar, 'trigger', ['hover', 'click'], 'hover', (trigger) => graph.updatePlugin({ key: 'legend', trigger }));
    } else {
      // A real hover has no pointer here: apply the 'active' state the legend would set.
      const groups = [['node-1', 'node-3'], ['node-2'], ['node-4'], []];
      stage.every(1200, (i) => {
        const on = groups[i % groups.length]!;
        const all = graph.getNodeData().map((n) => n.id);
        graph.setElementState(Object.fromEntries(all.map((id) => [id, on.includes(id) ? 'active' : []])));
      });
    }
  });

export default mount;
