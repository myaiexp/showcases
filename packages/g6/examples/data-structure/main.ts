// Every data field the manual lists: type, data, style, states and combo on nodes, edges and a combo
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            {
              id: 'alice',
              type: 'circle',
              data: { name: 'alice', role: 'Admin' },
              style: { x: 80, y: 120, size: 40, fill: 'violet' },
              states: ['selected'],
              combo: null,
            },
            { id: 'bob', type: 'rect', data: { name: 'bob', role: 'User' }, style: { x: 240, y: 70, size: [50, 34], fill: '#7ed6a3' }, combo: 'team' },
            { id: 'carol', type: 'diamond', data: { name: 'carol', role: 'User' }, style: { x: 280, y: 160, size: 44, fill: '#ffb86c' }, combo: 'team' },
          ],
          edges: [
            {
              source: 'alice',
              target: 'bob',
              type: 'line',
              data: { relationship: 'friend', strength: 5 },
              style: { stroke: 'green', lineWidth: 3 },
              states: ['highlight'],
            },
            { source: 'bob', target: 'carol', type: 'quadratic', data: { relationship: 'colleague' } },
          ],
          combos: [
            {
              id: 'team',
              type: 'rect',
              data: { groupName: 'Group A' },
              style: { fill: 'lightblue', fillOpacity: 0.15, stroke: 'blue', collapsed: false },
              combo: null,
            },
          ],
        },
        node: { style: { labelText: (d) => String(d.data?.name), labelFill: '#fff' } },
        edge: { style: { labelText: (d) => String(d.data?.relationship), labelBackground: true } },
        combo: { style: { labelText: (d) => String(d.data?.groupName) } },
        autoFit: 'view',
        padding: 20,
      }),
    );
    await graph.render();

    // collapsed lives in the combo's style, so updating the data folds it.
    const fold = async (collapsed: boolean): Promise<void> => {
      graph.updateComboData([{ id: 'team', style: { collapsed } }]);
      await graph.draw();
    };
    if (stage.bar) {
      button(stage.bar, 'collapsed: true', () => void fold(true));
      button(stage.bar, 'collapsed: false', () => void fold(false));
    } else {
      stage.every(1800, (i) => fold(i % 2 === 1));
    }
  });

export default mount;
