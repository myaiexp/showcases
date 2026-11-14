// contextmenu with async getContent, loadingContent and a className
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
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'grid' },
        autoFit: 'view',
        padding: 36,
        plugins: [
          {
            type: 'contextmenu',
            key: 'menu',
            className: 'showcase-async-menu',
            loadingContent: '<div style="padding:8px 12px;color:#888">Loading...</div>',
            // Stands in for a request; nothing is fetched.
            getContent: async (e: IElementEvent) => {
              await new Promise((resolve) => setTimeout(resolve, 600));
              return `<div style="padding:8px 12px;color:#222">Actions for <b>${String(e.target.id)}</b></div>`;
            },
          },
        ],
      }),
    );
    await graph.render();

    if (stage.preview) {
      const menu = graph.getPluginInstance<Contextmenu>('menu');
      const ids = ['node-1', 'node-4', 'node-2'];
      stage.every(1900, (i) => (i % 2 ? menu.show(elementEvent(graph, ids[(i >> 1) % ids.length]!)) : menu.hide()));
    }
  });

export default mount;
