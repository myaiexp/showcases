// getEdgeData() with no argument, one id, or an array of ids
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { callList, json, people } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: people(),
        node: { style: { size: 24, labelText: (d) => d.id } },
        edge: { style: { endArrow: true, lineWidth: 2, labelText: (d) => d.id, labelBackground: true } },
        autoFit: 'view',
        padding: 24,
      }),
    );
    await graph.render();

    callList(stage, graph, el, [
      { label: 'getEdgeData()', run: () => ({ found: graph.getEdgeData().map((e) => String(e.id)), text: json(graph.getEdgeData()) }) },
      {
        label: "getEdgeData('e1')",
        run: () => {
          const edge = graph.getEdgeData('e1');
          return { found: [String(edge.id)], text: `source ${edge.source}, target ${edge.target}` };
        },
      },
      {
        label: "getEdgeData(['e2', 'e5'])",
        run: () => {
          const [a, b] = graph.getEdgeData(['e2', 'e5']);
          return { found: [String(a!.id), String(b!.id)], text: json([a, b]) };
        },
      },
    ]);
  });

export default mount;
