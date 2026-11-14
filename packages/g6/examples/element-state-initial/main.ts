// states in the data give elements their first states, one or several, set with the data
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = () => ({
      nodes: [
        { id: 'node1', states: ['selected'], style: { x: 0, y: 0 } },
        { id: 'node2', states: ['disabled'], style: { x: 130, y: -50 } },
        { id: 'node3', states: ['highlight', 'active'], style: { x: 130, y: 50 } },
        { id: 'node4', style: { x: 260, y: 0 } },
      ],
      edges: [
        { source: 'node1', target: 'node2', states: ['highlight'] },
        { source: 'node1', target: 'node3' },
        { source: 'node3', target: 'node4' },
      ],
    });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: data(),
        node: { style: { size: 36, labelText: (d) => `${d.id}: ${(d.states ?? []).join('+') || 'no state'}`, labelPlacement: 'bottom', labelFontSize: 11 } },
        edge: { style: { endArrow: true, lineWidth: 2 } },
        autoFit: 'view',
        padding: 36,
      }),
    );
    await graph.render();

    // Loading the same data again with setData restores the initial states.
    const reload = async (): Promise<void> => {
      graph.setData(data());
      await graph.draw();
    };
    const scramble = async (): Promise<void> => {
      await graph.setElementState({ node1: [], node2: 'selected', node4: ['active', 'highlight'] });
    };
    if (stage.bar) {
      button(stage.bar, 'Change states', () => void scramble());
      button(stage.bar, 'setData(data) again', () => void reload());
    } else {
      stage.every(1500, (i) => (i % 2 ? scramble() : reload()));
    }
  });

export default mount;
