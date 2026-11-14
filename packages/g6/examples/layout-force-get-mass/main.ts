// force layout getMass callback
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions, NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { clusterGraph, toggleOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'force', preventOverlap: true, nodeSize: 14, getMass: () => 1 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: clusterGraph(3, 6),
        node: {
          style: { size: 14 },
          palette: { type: 'group', field: (d) => String(d.data?.cluster) },
        },
        edge: { style: { stroke: '#667' } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    const heavyHubs = { getMass: (d: NodeData) => (String(d.id).endsWith('0') ? 20 : 1) };
    toggleOption(stage, graph, layout, 'heavy hubs', heavyHubs, { getMass: () => 1 }, false, 3000);
  });

export default mount;
