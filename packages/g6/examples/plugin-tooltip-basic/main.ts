// tooltip plugin with default options; cards open it with show() on a timer
import { Graph, Tooltip } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { elementEvent } from '../../shared/plugin-drive.ts';
import { hubData } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hubData(),
        node: { style: { fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'grid' },
        behaviors: ['drag-canvas'],
        autoFit: 'view',
        padding: 36,
        plugins: [{ type: 'tooltip', key: 'tip' }],
      }),
    );
    await graph.render();

    if (stage.preview) {
      const ids = ['node-0', 'node-4', 'node-5', 'node-1'];
      const tip = graph.getPluginInstance<Tooltip>('tip');
      stage.every(1300, (i) => (i % 2 ? tip.show(elementEvent(graph, ids[(i >> 1) % ids.length]!)) : tip.hide()));
    }
  });

export default mount;
