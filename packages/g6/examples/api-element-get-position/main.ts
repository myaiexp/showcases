// getElementPosition reads a node's [x, y] after translateElementTo moves it
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { fmt, steps, strip } from '../../shared/api-element-demo.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: strip(4, 70),
        node: { style: { size: 34, labelText: (d: NodeData) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { lineWidth: 2 } },
        autoFit: 'center',
      }),
    );
    await graph.render();

    steps(stage, el, [
      { label: "getElementPosition('n2')", run: () => fmt(graph.getElementPosition('n2')) },
      {
        label: "translateElementTo('n2', [80, -50])",
        run: async () => (await graph.translateElementTo('n2', [80, -50], true), fmt(graph.getElementPosition('n2'))),
      },
      {
        label: "translateElementTo('n2', [80, 50])",
        run: async () => (await graph.translateElementTo('n2', [80, 50], true), fmt(graph.getElementPosition('n2'))),
      },
      { label: "getElementPosition('n4')", run: () => fmt(graph.getElementPosition('n4')) },
    ]);
  });

export default mount;
