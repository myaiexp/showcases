// tooltip enable function: nodes get a tooltip, edges do not
import { Graph, Tooltip } from '@antv/g6';
import type { ElementDatum, IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { elementEvent } from '../../shared/plugin-drive.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'node1', style: { x: 100, y: 100 }, data: { name: 'Server Node' } },
            { id: 'node2', style: { x: 250, y: 100 }, data: { name: 'Database Node' } },
          ],
          edges: [{ id: 'link', source: 'node1', target: 'node2', data: { type: 'Connection' } }],
        },
        node: { style: { fill: '#7e3feb', size: 28 } },
        edge: { style: { stroke: '#ffd666', lineWidth: 3 } },
        autoFit: 'center',
        plugins: [
          {
            type: 'tooltip',
            key: 'tip',
            // Enable only for nodes, not for edges.
            enable: (e: IElementEvent) => e.targetType === 'node',
            getContent: async (_e: IElementEvent, items: ElementDatum[]) => `<div>Node: ${items[0]?.data?.name}</div>`,
          },
        ],
      }),
    );
    await graph.render();

    if (stage.preview) {
      // show() goes through the same enable check: the edge step stays empty.
      const ids = ['node1', 'link', 'node2', 'link'];
      const tip = graph.getPluginInstance<Tooltip>('tip');
      stage.every(1100, (i) => (i % 2 ? tip.show(elementEvent(graph, ids[(i >> 1) % ids.length]!)) : tip.hide()));
    }
  });

export default mount;
