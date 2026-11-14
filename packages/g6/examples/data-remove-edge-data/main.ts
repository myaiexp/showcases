// removeEdgeData() drops edges by id or by a function; the nodes stay
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
        edge: { style: { lineWidth: 2, labelText: (d) => d.id, labelFontSize: 9, labelBackground: true } },
        autoFit: 'view',
      }),
    );
    await graph.render();

    callList(stage, graph, el, [
      { label: "removeEdgeData(['n0-n1'])", run: () => graph.removeEdgeData(['n0-n1']) },
      { label: 'removeEdgeData(edges => every other edge)', run: () => graph.removeEdgeData((edges) => edges.filter((_, i) => i % 2).map((e) => String(e.id))) },
      { label: 'Reset', run: () => graph.setData(ring(8, 'n', 90)) },
    ]);
  });

export default mount;
