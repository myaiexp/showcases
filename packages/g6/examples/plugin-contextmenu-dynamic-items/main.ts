// contextmenu whose getItems depends on what was right-clicked
import { Graph, Contextmenu } from '@antv/g6';
import type { IElementEvent } from '@antv/g6';
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
        edge: { style: { stroke: '#8b9baf', lineWidth: 3 } },
        layout: { type: 'grid' },
        autoFit: 'view',
        padding: 36,
        plugins: [
          {
            type: 'contextmenu',
            key: 'menu',
            trigger: 'contextmenu',
            getItems: (e: IElementEvent) => {
              const id = String(e.target.id ?? '');
              if (id === 'node-0') return [{ name: 'Delete Node', value: 'delete' }];
              if (graph.getElementType(id) === 'edge') return [{ name: 'Move Edge', value: 'move' }];
              return [{ name: 'Inspect', value: 'inspect' }];
            },
          },
        ],
      }),
    );
    await graph.render();

    if (stage.preview) {
      const menu = graph.getPluginInstance<Contextmenu>('menu');
      const ids = ['node-0', 'back-5', 'node-3'];
      stage.every(1300, (i) => (i % 2 ? menu.show(elementEvent(graph, ids[(i >> 1) % ids.length]!)) : menu.hide()));
    }
  });

export default mount;
