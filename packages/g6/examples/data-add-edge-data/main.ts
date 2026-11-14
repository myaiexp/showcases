// addEdgeData() adds one edge, several edges, or the edges a function returns
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
        node: { style: { size: 22, labelText: (d) => d.id } },
        edge: { style: { lineWidth: 2, labelText: (d) => d.data?.label as string | undefined, labelBackground: true } },
        autoFit: 'view',
      }),
    );
    await graph.render();

    callList(stage, graph, el, [
      {
        label: 'addEdgeData([one edge])',
        run: () => graph.addEdgeData([{ id: 'edge1', source: 'n0', target: 'n3', data: { weight: 1, label: 'Relation' } }]),
      },
      {
        label: 'addEdgeData([two edges])',
        run: () =>
          graph.addEdgeData([
            { id: 'edge2', source: 'n1', target: 'n4' },
            { id: 'edge3', source: 'n2', target: 'n5' },
          ]),
      },
      {
        label: 'addEdgeData(prev => [...])',
        run: () => graph.addEdgeData((prev) => [{ id: `edge${prev.length}`, source: 'n0', target: 'n2' }]),
      },
      { label: 'Reset', run: () => graph.setData(ring(6, 'n', 90)) },
    ]);
  });

export default mount;
