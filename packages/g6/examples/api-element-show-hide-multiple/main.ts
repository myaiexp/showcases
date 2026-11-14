// hideElement and showElement with an array of ids, nodes and edges together, animated
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { steps, strip } from '../../shared/api-element-demo.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: strip(6, 44),
        node: { style: { size: 28, labelText: (d: NodeData) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { lineWidth: 2 } },
        autoFit: 'center',
      }),
    );
    await graph.render();

    steps(stage, el, [
      { label: "hideElement(['n2','n3','e1'], true)", run: () => graph.hideElement(['n2', 'n3', 'e1'], true) },
      { label: "hideElement(['n5','n6','e5'], true)", run: () => graph.hideElement(['n5', 'n6', 'e5'], true) },
      { label: "showElement(['n2','n3','e1'], true)", run: () => graph.showElement(['n2', 'n3', 'e1'], true) },
      { label: "showElement(['n5','n6','e5'], true)", run: () => graph.showElement(['n5', 'n6', 'e5'], true) },
    ]);
  });

export default mount;
