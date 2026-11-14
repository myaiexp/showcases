// A custom theme registered with ExtensionCategory.THEME: background, node, edge and combo
import { ExtensionCategory, Graph, register } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

// Static styles only: a theme takes no callbacks and no `type`.
const PAPER = {
  background: '#f6f1e4',
  node: {
    style: { size: 30, fill: '#e1f3fe', stroke: '#3b71d6', lineWidth: 2, labelFill: '#3a3a3a', labelFontSize: 12, labelPlacement: 'bottom' as const },
    state: { selected: { fill: '#3b71d6', lineWidth: 3 } },
  },
  edge: { style: { stroke: '#a89f87', lineWidth: 2, endArrow: true } },
  combo: { style: { fill: '#fffaf0', fillOpacity: 0.8, stroke: '#c9b88a', lineWidth: 2, lineDash: [6, 4], labelFill: '#7a6a3a' } },
};
register(ExtensionCategory.THEME, 'showcase-theme-paper', PAPER);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    // G6 5.1.1 does not paint theme.background, so the box takes it from the same object.
    stage.container.style.background = PAPER.background;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        // The one place a light theme belongs: the example is about the theme itself.
        theme: 'showcase-theme-paper',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: [
            { id: 'a', combo: 'g' },
            { id: 'b', combo: 'g' },
            { id: 'c' },
            { id: 'd' },
          ],
          edges: [
            { source: 'a', target: 'b' },
            { source: 'b', target: 'c' },
            { source: 'c', target: 'd' },
          ],
          combos: [{ id: 'g' }],
        },
        node: { style: { labelText: (d) => d.id } },
        combo: { style: { labelText: 'combo' } },
        layout: { type: 'antv-dagre', rankdir: 'LR', nodesep: 20, ranksep: 50 },
      }),
    );
    await graph.render();

    // Selecting shows the theme's own state style.
    stage.every(1300, (i) => graph.setElementState({ c: i % 2 ? ['selected'] : [] }));
  });

export default mount;
