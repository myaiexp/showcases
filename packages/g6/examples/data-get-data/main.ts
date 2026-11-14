// getData() returns every node, edge and combo currently in the graph
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { callList, json } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'a', combo: 'c', style: { x: 80, y: 80 } },
            { id: 'b', combo: 'c', style: { x: 150, y: 120 } },
            { id: 'd', style: { x: 280, y: 90 } },
          ],
          edges: [{ id: 'a-b', source: 'a', target: 'b' }, { id: 'b-d', source: 'b', target: 'd' }],
          combos: [{ id: 'c' }],
        },
        node: { style: { size: 24, labelText: (d) => d.id } },
        combo: { style: { labelText: (d) => d.id } },
        edge: { style: { endArrow: true } },
        autoFit: 'view',
      }),
    );
    await graph.render();

    // The result has three arrays; each call highlights the ids of one of them.
    callList(stage, graph, el, [
      { label: 'getData().nodes', run: () => ({ found: graph.getData().nodes.map((n) => String(n.id)), text: json(graph.getData().nodes) }) },
      { label: 'getData().edges', run: () => ({ found: graph.getData().edges.map((e) => String(e.id)), text: json(graph.getData().edges) }) },
      { label: 'getData().combos', run: () => ({ found: graph.getData().combos.map((c) => String(c.id)), text: json(graph.getData().combos) }) },
    ]);
  });

export default mount;
