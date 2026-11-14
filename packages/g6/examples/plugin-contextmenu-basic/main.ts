// contextmenu plugin: a node menu whose Delete item removes the node
import { Graph, Contextmenu } from '@antv/g6';
import type { IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { elementEvent } from '../../shared/plugin-drive.ts';
import { hubData } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const out = stage.bar ? readout(el) : null;
    if (out) out.textContent = 'Right-click a node.';
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hubData(),
        node: { style: { fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'grid' },
        behaviors: ['drag-canvas', 'zoom-canvas'],
        autoFit: 'view',
        padding: 36,
        plugins: [
          {
            type: 'contextmenu',
            key: 'menu',
            enable: (e: IElementEvent) => e.targetType === 'node',
            getItems: () => [
              { name: 'View Details', value: 'detail' },
              { name: 'Delete', value: 'delete' },
            ],
            onClick: (value: string, _target: HTMLElement, current: { id: string }) => {
              if (value === 'delete') {
                graph.removeNodeData([current.id]);
                void graph.draw();
              }
              if (out) out.textContent = `onClick(${JSON.stringify(value)}) on ${current.id}`;
            },
          },
        ],
      }),
    );
    await graph.render();

    if (stage.bar) {
      button(stage.bar, 'restore nodes', () => {
        graph.setData(hubData());
        void graph.render();
      });
    } else {
      const menu = graph.getPluginInstance<Contextmenu>('menu');
      const ids = ['node-0', 'node-4', 'node-2', 'node-5'];
      stage.every(1300, (i) => (i % 2 ? menu.show(elementEvent(graph, ids[(i >> 1) % ids.length]!)) : menu.hide()));
    }
  });

export default mount;
