// translateElementBy with an id-to-offset map: each node moves by its own distance, animated
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
        data: strip(4, 70),
        node: { style: { size: 30, labelText: (d: NodeData) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { lineWidth: 2 } },
        autoFit: 'center',
      }),
    );
    await graph.render();

    steps(stage, el, [
      { label: '{ n1: [0, 50], n2: [0, 25], n3: [0, 0], n4: [0, -25] }', run: () => graph.translateElementBy({ n1: [0, 50], n2: [0, 25], n3: [0, 0], n4: [0, -25] }, true) },
      { label: '{ n1: [0, -50], n2: [0, -25], n3: [0, 0], n4: [0, 25] }', run: () => graph.translateElementBy({ n1: [0, -50], n2: [0, -25], n3: [0, 0], n4: [0, 25] }, true) },
    ], { ms: 1600 });
  });

export default mount;
