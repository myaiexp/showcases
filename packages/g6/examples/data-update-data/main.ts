// updateData() changes only the fields given, on nodes and edges in one call
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { callList, ring } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ring(6, 'n', 90),
        node: { style: { size: 24, labelText: (d) => d.id } },
        edge: { style: { stroke: '#4a5a7a' } },
        autoFit: 'view',
        animation: { duration: 600 },
      }),
    );
    await graph.render();

    callList(stage, graph, el, [
      {
        label: 'updateData({ nodes: [{ id, style }], edges: [{ id, style }] })',
        run: () =>
          graph.updateData({
            nodes: [{ id: 'n0', style: { x: 0, y: 0, fill: '#ff9f43' } }],
            edges: [{ id: 'n0-n1', style: { lineWidth: 5, stroke: '#ff9f43' } }],
          }),
      },
      {
        label: 'updateData(prev => ...) enlarge every node',
        run: () => graph.updateData((prev) => ({ nodes: (prev.nodes ?? []).map((n) => ({ id: n.id, style: { size: 34 } })) })),
      },
      {
        label: 'Reset',
        run: () =>
          graph.updateData({
            nodes: ring(6, 'n', 90).nodes.map((n) => ({ ...n, style: { ...n.style, size: 24, fill: '#1783ff' } })),
            edges: [{ id: 'n0-n1', style: { lineWidth: 1, stroke: '#4a5a7a' } }],
          }),
      },
    ]);
  });

export default mount;
