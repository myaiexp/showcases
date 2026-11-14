// focusElement centres one node in the viewport, with the default animation
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

    steps(stage, el, ['n1', 'n7', 'n4', 'n10'].map((id) => ({ label: `focusElement('${id}')`, run: () => graph.focusElement(id) })), { ms: 1900 });
  });

export default mount;
