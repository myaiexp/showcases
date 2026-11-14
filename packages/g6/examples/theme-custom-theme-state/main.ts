// Theme state styles: selected, active and inactive defined once in a registered theme
import { ExtensionCategory, Graph, register } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

// Each state prop (fill, stroke, lineWidth, fillOpacity…) also has a default in `style`,
// so clearing the state puts the default back.
register(ExtensionCategory.THEME, 'showcase-theme-night', {
  background: '#0b1020',
  node: {
    style: { size: 34, fill: '#23395d', stroke: '#6c8ebf', lineWidth: 2, fillOpacity: 1, strokeOpacity: 1, labelFill: '#d6e2ff', labelPlacement: 'bottom' },
    state: {
      selected: { fill: '#f6bd16', stroke: '#ffffff', lineWidth: 4 },
      active: { stroke: '#61ddaa', lineWidth: 4 },
      inactive: { fillOpacity: 0.2, strokeOpacity: 0.2 },
    },
  },
  edge: { style: { stroke: '#4a5f87', lineWidth: 2 } },
});

const STATES = ['none', 'selected', 'active', 'inactive'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    stage.container.style.background = '#0b1020';
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'showcase-theme-night',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: ['a', 'b', 'c', 'd'].map((id) => ({ id })),
          edges: [
            { source: 'a', target: 'b' },
            { source: 'b', target: 'c' },
            { source: 'c', target: 'd' },
          ],
        },
        node: { style: { labelText: (d) => d.id } },
        layout: { type: 'grid', cols: 4 },
      }),
    );
    await graph.render();

    // The state goes on node b only, the others stay at the theme's default style.
    const setState = async (s: (typeof STATES)[number]): Promise<void> => {
      await graph.setElementState({ b: s === 'none' ? [] : [s] });
    };
    if (stage.bar) select(stage.bar, 'state of node b', STATES, 'none', (v) => void setState(v));
    else stage.every(1200, (i) => setState(STATES[i % STATES.length]!));
  });

export default mount;
