// The Combo overview graph: circle combos holding nodes and combos, collapse and drag
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: {
          nodes: [
            { id: 'node1', combo: 'combo1', style: { x: 245, y: 200 } },
            { id: 'node2', combo: 'combo1', style: { x: 210, y: 250 } },
            { id: 'node3', combo: 'combo1', style: { x: 280, y: 245 } },
            { id: 'node4', combo: 'combo2', style: { x: 400, y: 165 } },
            { id: 'node5', combo: 'combo2', style: { x: 450, y: 162 } },
            { id: 'node6', combo: 'combo3', style: { x: 425, y: 300 } },
            { id: 'node7', combo: 'combo3', style: { x: 360, y: 332 } },
          ],
          edges: [],
          combos: [
            { id: 'combo1', combo: 'combo3', data: { label: 'Combo A' } },
            { id: 'combo2', combo: 'combo3', data: { label: 'Combo B' } },
            { id: 'combo3', data: { label: 'Combo C' } },
            { id: 'combo4', data: { label: 'Combo D' }, style: { x: 58, y: 248 } },
          ],
        },
        node: { style: { labelText: (d) => d.id, labelPlacement: 'center', labelFill: '#fff', labelFontSize: 10 } },
        combo: { type: 'circle', style: { padding: 2, labelText: (d) => String(d.data?.label), labelPlacement: 'top' } },
        // Double-click collapses a combo; dropEffect 'link' lets a dragged node join the combo it lands on.
        behaviors: ['collapse-expand', { type: 'drag-element', dropEffect: 'link' }],
      }),
    );
    await graph.render();
    if (stage.preview) {
      stage.every(1500, async (i) => {
        const id = ['combo1', 'combo2', 'combo3'][(i >> 1) % 3]!;
        if (i % 2) await graph.expandElement(id);
        else await graph.collapseElement(id);
      });
    }
  });

export default mount;
