// setElementVisibility on one element, with and without the animation flag
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
        node: { style: { size: 34, labelText: (d: NodeData) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { lineWidth: 2 } },
        autoFit: 'center',
      }),
    );
    await graph.render();

    steps(stage, el, [
      { label: "setElementVisibility('n2', 'hidden', false)", run: () => graph.setElementVisibility('n2', 'hidden', false) },
      { label: "setElementVisibility('n2', 'visible', true)", run: () => graph.setElementVisibility('n2', 'visible', true) },
      { label: "setElementVisibility('n3', 'hidden', true)", run: () => graph.setElementVisibility('n3', 'hidden', true) },
      { label: "setElementVisibility('n3', 'visible', false)", run: () => graph.setElementVisibility('n3', 'visible', false) },
    ], { ms: 1500 });
  });

export default mount;
