// tooltip with trigger: 'click'
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
            { id: 'node1', style: { x: 100, y: 100 }, data: { name: 'Click me' } },
            { id: 'node2', style: { x: 220, y: 100 }, data: { name: 'Click me too' } },
          ],
          edges: [{ source: 'node1', target: 'node2' }],
        },
        node: { style: { fill: '#7e3feb', size: 28, labelText: (d) => String(d.data?.name), labelFill: '#fff', labelPlacement: 'bottom' } },
        edge: { style: { stroke: '#8b9baf' } },
        autoFit: 'center',
        plugins: [
          {
            type: 'tooltip',
            key: 'tip',
            trigger: 'click',
            getContent: async (_e: IElementEvent, items: ElementDatum[]) =>
              `<div><div style="color:#0369a1;font-weight:bold;margin-bottom:4px">Click triggered</div><div style="color:#0c4a6e">Element ID: ${items[0]?.id}<br/>Name: ${items[0]?.data?.name ?? 'Unnamed'}</div></div>`,
          },
        ],
      }),
    );
    await graph.render();

    if (stage.preview) {
      const ids = ['node1', 'node2'];
      const tip = graph.getPluginInstance<Tooltip>('tip');
      stage.every(1300, (i) => (i % 2 ? tip.show(elementEvent(graph, ids[(i >> 1) % ids.length]!)) : tip.hide()));
    }
  });

export default mount;
