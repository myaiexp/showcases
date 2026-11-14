// Edges re-attach to a collapsed combo, and back to their nodes when it expands
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
        padding: 24,
        data: {
          nodes: [
            { id: 'out1', style: { x: 30, y: 40 } },
            { id: 'out2', style: { x: 30, y: 150 } },
            { id: 'in1', combo: 'group', style: { x: 160, y: 60 } },
            { id: 'in2', combo: 'group', style: { x: 210, y: 130 } },
          ],
          edges: [
            { id: 'e1', source: 'out1', target: 'in1' },
            { id: 'e2', source: 'out2', target: 'in2' },
            { id: 'e3', source: 'in1', target: 'in2' },
          ],
          combos: [{ id: 'group' }],
        },
        node: { style: { fill: '#7e3feb' } },
        edge: { style: { endArrow: true, stroke: '#69B1FF', lineWidth: 2 } },
        combo: { style: { labelText: (d) => d.id, collapsedSize: 40 } },
        behaviors: ['collapse-expand', 'drag-element'],
        animation: true,
      }),
    );
    await graph.render();
    // Double-click the combo in the full view; a card has no pointer, so it plays the same toggle.
    if (stage.preview) {
      stage.every(1500, async (i) => {
        if (i % 2) await graph.expandElement('group');
        else await graph.collapseElement('group');
      });
    }
  });

export default mount;
