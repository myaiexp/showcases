// Circle combos as interest groups: three child combos inside one parent
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
            { id: 'node1', combo: 'combo2', style: { x: 150, y: 150 } },
            { id: 'node2', combo: 'combo2', style: { x: 200, y: 150 } },
            { id: 'node3', combo: 'combo3', style: { x: 300, y: 150 } },
            { id: 'node4', combo: 'combo3', style: { x: 350, y: 150 } },
            { id: 'node5', combo: 'combo4', style: { x: 230, y: 300 } },
            { id: 'node6', combo: 'combo4', style: { x: 280, y: 300 } },
          ],
          combos: [
            // The docs label these in Chinese: interest group, calligraphy, film, games.
            { id: 'combo1', style: { labelText: 'Interest group' } },
            { id: 'combo2', combo: 'combo1', style: { labelText: 'Calligraphy' } },
            { id: 'combo3', combo: 'combo1', style: { labelText: 'Film' } },
            { id: 'combo4', combo: 'combo1', style: { labelText: 'Games' } },
          ],
        },
        node: { style: { labelText: (d) => d.id } },
        behaviors: ['drag-element', 'collapse-expand'],
        animation: true,
      }),
    );
    await graph.render();
    if (stage.preview) {
      stage.every(1400, async (i) => {
        const id = ['combo2', 'combo3', 'combo4'][(i >> 1) % 3]!;
        if (i % 2) await graph.expandElement(id);
        else await graph.collapseElement(id);
      });
    }
  });

export default mount;
