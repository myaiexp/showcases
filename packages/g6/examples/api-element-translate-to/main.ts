// translateElementTo puts one node at an absolute position; the same call moves it back
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
        data: strip(3, 100),
        node: { style: { size: 34, labelText: (d: NodeData) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { lineWidth: 2 } },
        autoFit: 'center',
      }),
    );
    await graph.render();

    const to = (p: [number, number], animation: boolean) => async (): Promise<string> => {
      await graph.translateElementTo('n2', p, animation);
      return `getElementPosition('n2') = ${fmt(graph.getElementPosition('n2'))}`;
    };
    steps(stage, el, [
      { label: "translateElementTo('n2', [100, -60])", run: to([100, -60], false) },
      { label: "translateElementTo('n2', [160, 60], true)", run: to([160, 60], true) },
      { label: "translateElementTo('n2', [100, 0], true)", run: to([100, 0], true) },
    ]);
  });

export default mount;
