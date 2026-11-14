// focusElement with an array of ids centres the middle of the group in the viewport
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { steps } from '../../shared/api-element-demo.ts';
import { ring } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        // A ring wider than the card, so a focus has somewhere to travel.
        data: ring(12, 'n', 210),
        node: { style: { size: 36, labelText: (d: NodeData) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { lineWidth: 2 } },
        autoFit: 'center',
      }),
    );
    await graph.render();

    steps(stage, el, [
      { label: "focusElement(['n1', 'n2', 'n3'])", run: () => graph.focusElement(['n1', 'n2', 'n3']) },
      { label: "focusElement(['n5', 'n11'])", run: () => graph.focusElement(['n5', 'n11']) },
      { label: "focusElement(['n8', 'n9', 'n10'])", run: () => graph.focusElement(['n8', 'n9', 'n10']) },
    ], { ms: 1900 });
  });

export default mount;
