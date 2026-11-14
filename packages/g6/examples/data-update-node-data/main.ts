// updateNodeData() merges new fields into nodes: position, size, colour or data
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
        node: { style: { size: 24, labelText: (d) => String(d.data?.label ?? d.id) } },
        autoFit: 'view',
        animation: { duration: 600 },
      }),
    );
    await graph.render();

    callList(stage, graph, el, [
      { label: "updateNodeData([{ id: 'n0', style: { x: 0, y: 0 } }])", run: () => graph.updateNodeData([{ id: 'n0', style: { x: 0, y: 0 } }]) },
      { label: "updateNodeData([{ id: 'n3', data: { label } }])", run: () => graph.updateNodeData([{ id: 'n3', data: { label: 'renamed' }, style: { fill: '#ff9f43', size: 40 } }]) },
      {
        label: 'updateNodeData(prev => ...) move every node',
        run: () => graph.updateNodeData((prev) => prev.map((n, i) => ({ id: n.id, style: { x: i * 40 - 100, y: 0 } }))),
      },
      { label: 'Reset', run: () => graph.setData(ring(6, 'n', 90)) },
    ]);
  });

export default mount;
