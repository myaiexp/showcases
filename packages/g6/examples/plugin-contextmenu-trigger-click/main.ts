// contextmenu with trigger: 'click' and a custom offset
import { Graph, Contextmenu } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
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
        autoFit: 'view',
        padding: 36,
        plugins: [
          {
            type: 'contextmenu',
            key: 'menu',
            trigger: 'click',
            offset: [4, 4],
            getItems: () => [
              { name: 'View Details', value: 'detail' },
              { name: 'Delete', value: 'delete' },
            ],
          },
        ],
      }),
    );
    await graph.render();

    if (stage.bar) {
      select(stage.bar, 'trigger', ['click', 'contextmenu'], 'click', (trigger) => graph.updatePlugin({ key: 'menu', trigger }));
      slider(stage.bar, 'offset', [0, 40, 2], 4, (o) => graph.updatePlugin({ key: 'menu', offset: [o, o] }));
    } else {
      const menu = graph.getPluginInstance<Contextmenu>('menu');
      const ids = ['node-1', 'node-3', 'node-0'];
      stage.every(1300, (i) => {
        graph.updatePlugin({ key: 'menu', offset: [4 + (i % 3) * 12, 4 + (i % 3) * 12] });
        return i % 2 ? menu.show(elementEvent(graph, ids[(i >> 1) % ids.length]!)) : menu.hide();
      });
    }
  });

export default mount;
