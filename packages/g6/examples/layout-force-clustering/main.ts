// force layout clustering by a data field
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions, NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'force', preventOverlap: true, nodeSize: 16, clustering: true, nodeClusterBy: (d: NodeData) => String(d.data?.cluster), clusterNodeStrength: 20 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('cluster'),
        node: {
          style: { size: 16 },
          palette: { type: 'group', field: 'cluster' },
        },
        edge: { style: { stroke: '#667' } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      toggle(stage.bar, 'clustering', true, (clustering) => relayout(graph, layout, { clustering }));
      sliderOption(stage, graph, layout, 'clusterNodeStrength', [0, 100, 2], 20, []);
    } else {
      stage.every(2800, (i) => relayout(graph, layout, { clustering: i % 2 === 1 }));
    }
  });

export default mount;
