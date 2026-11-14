// hasNode(), hasEdge() and hasCombo() test whether an id is in the graph
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { callList, hierarchy } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hierarchy('combo').data,
        node: { style: { size: 18, labelText: (d) => d.id } },
        combo: { style: { labelText: (d) => d.id } },
        autoFit: 'view',
      }),
    );
    await graph.render();

    // Each call highlights the element when the answer is true.
    callList(stage, graph, el, [
      { label: "hasNode('n1')", run: () => ({ found: graph.hasNode('n1') ? ['n1'] : [], text: String(graph.hasNode('n1')) }) },
      { label: "hasNode('missing')", run: () => ({ text: String(graph.hasNode('missing')) }) },
      { label: "hasEdge('n2-n4')", run: () => ({ found: graph.hasEdge('n2-n4') ? ['n2-n4'] : [], text: String(graph.hasEdge('n2-n4')) }) },
      { label: "hasCombo('alpha')", run: () => ({ found: graph.hasCombo('alpha') ? ['alpha'] : [], text: String(graph.hasCombo('alpha')) }) },
      { label: "hasCombo('n1')", run: () => ({ text: `${graph.hasCombo('n1')}  (n1 is a node, not a combo)` }) },
    ]);
  });

export default mount;
