// addNodeData() adds one node, several nodes, or the nodes a function returns
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
        data: ring(4, 'n', 80),
        node: { style: { size: 24, labelText: (d) => String(d.data?.label ?? d.id) } },
        autoFit: 'view',
        padding: 30,
      }),
    );
    await graph.render();

    callList(stage, graph, el, [
      { label: 'addNodeData([one node])', run: () => graph.addNodeData([{ id: 'node1', style: { x: 160, y: 0 }, data: { label: 'Node 1' } }]) },
      {
        label: 'addNodeData([two nodes])',
        run: () => graph.addNodeData([{ id: 'node2', style: { x: 200, y: -60 } }, { id: 'node3', style: { x: 200, y: 60 } }]),
      },
      {
        // prev is the current node list; return only the new nodes, not prev again.
        label: 'addNodeData(prev => [...])',
        run: () => graph.addNodeData((prev) => [{ id: `node${prev.length}`, style: { x: 250, y: 0 } }]),
      },
      { label: 'Reset', run: () => graph.setData(ring(4, 'n', 80)) },
    ]);
  });

export default mount;
