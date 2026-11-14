// removeData() takes ids per type, or a function that picks them from the current data
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
        data: ring(8, 'n', 90),
        node: { style: { size: 22, labelText: (d) => d.id } },
        edge: { style: { lineWidth: 2 } },
        autoFit: 'view',
      }),
    );
    await graph.render();

    callList(stage, graph, el, [
      { label: "removeData({ nodes: ['n0', 'n1'], edges: ['n4-n5'] })", run: () => graph.removeData({ nodes: ['n0', 'n1'], edges: ['n4-n5'] }) },
      {
        // The function sees the data and returns the ids to drop: here every odd-numbered node.
        label: 'removeData(data => ({ nodes: odd ids }))',
        run: () => graph.removeData((data) => ({ nodes: (data.nodes ?? []).map((n) => n.id).filter((id) => Number(id.slice(1)) % 2) })),
      },
      { label: 'Reset', run: () => graph.setData(ring(8, 'n', 90)) },
    ]);
  });

export default mount;
