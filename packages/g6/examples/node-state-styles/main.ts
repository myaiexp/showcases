// node.state: style overrides for built-in and custom states
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const STATES = ['selected', 'highlight', 'focus'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        data: {
          nodes: [
            { id: 'plain', style: { x: 40, y: 60 } },
            { id: 'selected', states: ['selected'], style: { x: 140, y: 60 } },
            { id: 'highlight', states: ['highlight'], style: { x: 240, y: 60 } },
            { id: 'focus', states: ['focus'], style: { x: 340, y: 60 } },
          ],
        },
        node: {
          style: { size: 44, fill: '#C6E5FF', labelText: (d: NodeData) => d.id },
          state: {
            selected: { fill: '#ffa940', stroke: '#ff7a00', haloStroke: '#ff7a00', halo: true },
            highlight: { stroke: '#1890ff', lineWidth: 3 },
            // A custom state: any name works once node.state defines its style.
            focus: { lineWidth: 3, stroke: 'orange' },
          },
        },
      }),
    );
    await graph.render();

    if (stage.bar) {
      for (const s of STATES) button(stage.bar, `plain: ${s}`, () => void graph.setElementState('plain', [s]));
      button(stage.bar, 'plain: selected + focus', () => void graph.setElementState('plain', ['selected', 'focus']));
      button(stage.bar, 'plain: clear', () => void graph.setElementState('plain', []));
    } else {
      const seq = [['selected'], ['highlight'], ['focus'], ['selected', 'focus'], []];
      stage.every(1000, (i) => graph.setElementState('plain', seq[i % seq.length]!));
    }
  });

export default mount;
