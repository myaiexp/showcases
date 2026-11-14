// getNodeData() with no argument, one id, or an array of ids
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
        node: { style: { size: 30, labelText: (d) => d.id } },
        autoFit: 'view',
        padding: 24,
      }),
    );
    await graph.render();

    callList(stage, graph, el, [
      { label: 'getNodeData()', run: () => ({ found: graph.getNodeData().map((n) => String(n.id)), text: json(graph.getNodeData()) }) },
      {
        label: "getNodeData('alice')",
        run: () => {
          const node = graph.getNodeData('alice');
          return { found: [node.id], text: `${json(node)}, position ${Math.round(node.style?.x as number)}, ${Math.round(node.style?.y as number)}` };
        },
      },
      {
        label: "getNodeData(['bob', 'carol'])",
        run: () => {
          const [bob, carol] = graph.getNodeData(['bob', 'carol']);
          return { found: [bob!.id, carol!.id], text: json([bob, carol]) };
        },
      },
    ]);
  });

export default mount;
