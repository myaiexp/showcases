// focusElement with a { duration, easing } object: a slow ease-in-out and a fast linear move
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
      { label: "focusElement('n3', { duration: 1200, easing: 'ease-in-out' })", run: () => graph.focusElement('n3', { duration: 1200, easing: 'ease-in-out' }) },
      { label: "focusElement('n9', { duration: 250, easing: 'linear' })", run: () => graph.focusElement('n9', { duration: 250, easing: 'linear' }) },
      { label: "focusElement('n6', false)", run: () => graph.focusElement('n6', false) },
    ], { ms: 1900 });
  });

export default mount;
