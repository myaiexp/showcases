// getElementVisibility reports 'visible' or 'hidden' for a node as hideElement and showElement flip it
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

    const visibility = (id: string): string => graph.getElementVisibility(id) ?? 'unknown';
    steps(stage, el, [
      { label: "getElementVisibility('n2')", run: () => visibility('n2') },
      { label: "hideElement('n2', true)", run: async () => (await graph.hideElement('n2', true), `getElementVisibility('n2') = ${visibility('n2')}`) },
      { label: "getElementVisibility('e1')", run: () => visibility('e1') },
      { label: "showElement('n2', true)", run: async () => (await graph.showElement('n2', true), `getElementVisibility('n2') = ${visibility('n2')}`) },
    ]);
  });

export default mount;
