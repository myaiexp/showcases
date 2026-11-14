// contextmenu enabled on edges only
import { Graph, Contextmenu } from '@antv/g6';
import type { IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { elementEvent } from '../../shared/plugin-drive.ts';
import { hubData } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const out = stage.bar ? readout(el) : null;
    if (out) out.textContent = 'Right-click an edge (a node shows no menu).';
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
            getItems: () => [{ name: 'Change Start Point', value: 'change' }],
            onClick: (value: string) => {
              if (out) out.textContent = `onClick(${JSON.stringify(value)})`;
            },
            // Enable only on edges.
            enable: (e: IElementEvent) => e.targetType === 'edge',
          },
        ],
      }),
    );
    await graph.render();

    if (stage.preview) {
      const menu = graph.getPluginInstance<Contextmenu>('menu');
      // An edge step opens the menu; a node step is refused by the enable function.
      const targets = ['back-5', 'node-1'] as const;
      stage.every(1300, (i) => {
        if (i % 2 === 0) return menu.hide();
        const id = targets[(i >> 1) % 2]!;
        return menu.show(elementEvent(graph, id));
      });
    }
  });

export default mount;
