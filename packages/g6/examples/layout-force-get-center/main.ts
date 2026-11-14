// force layout getCenter pulls clusters to their own points
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions, NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { clusterGraph, toggleOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const W = stage.container.clientWidth;
    const H = stage.container.clientHeight;
    const layout: BaseLayoutOptions = { type: 'force', preventOverlap: true, nodeSize: 14 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        padding: 24,
        data: clusterGraph(3, 7),
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

    const spots: Record<string, [number, number]> = { a: [W * 0.2, H * 0.5], b: [W * 0.5, H * 0.5], c: [W * 0.8, H * 0.5] };
    const pulled = { getCenter: (d: NodeData) => [...spots[String(d.data?.cluster)]!, 40] };
    toggleOption(stage, graph, layout, 'getCenter', pulled, { getCenter: undefined }, false, 3000);
  });

export default mount;
