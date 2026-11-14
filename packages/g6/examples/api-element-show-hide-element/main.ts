// hideElement and showElement on one node: its edges go with it, and animation is optional
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { steps } from '../../shared/api-element-demo.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'hub', style: { x: 0, y: 0 } },
            { id: 'a', style: { x: -90, y: -50 } },
            { id: 'b', style: { x: 90, y: -50 } },
            { id: 'c', style: { x: 0, y: 70 } },
          ],
          edges: ['a', 'b', 'c'].map((t) => ({ id: `hub-${t}`, source: 'hub', target: t })),
        },
        node: { style: { size: 34, labelText: (d: NodeData) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { lineWidth: 2 } },
        autoFit: 'center',
      }),
    );
    await graph.render();

    steps(stage, el, [
      { label: "hideElement('hub')", run: () => graph.hideElement('hub') },
      { label: "showElement('hub', true)", run: () => graph.showElement('hub', true) },
      { label: "hideElement('hub', true)", run: () => graph.hideElement('hub', true) },
      { label: "showElement('hub')", run: () => graph.showElement('hub') },
    ], { ms: 1400 });
  });

export default mount;
