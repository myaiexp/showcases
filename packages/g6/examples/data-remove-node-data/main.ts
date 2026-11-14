// removeNodeData() drops nodes by id or by a function; the edges on them go with them
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
      { label: "removeNodeData(['n0', 'n1'])", run: () => graph.removeNodeData(['n0', 'n1']) },
      { label: 'removeNodeData(nodes => ids of the last two)', run: () => graph.removeNodeData((nodes) => nodes.slice(-2).map((n) => n.id)) },
      { label: 'Reset', run: () => graph.setData(ring(8, 'n', 90)) },
    ]);
  });

export default mount;
