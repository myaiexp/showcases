// two tooltips on the same graph, one with the default offset and one shifted
import { Graph, Tooltip } from '@antv/g6';
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
            { id: 'node1', style: { x: 100, y: 100 }, data: { label: 'Default offset' } },
            { id: 'node2', style: { x: 250, y: 100 }, data: { label: 'Custom offset' } },
          ],
        },
        node: { style: { fill: '#7e3feb', size: 28, labelText: (d) => String(d.data?.label), labelFill: '#fff', labelPlacement: 'bottom' } },
        autoFit: 'center',
        plugins: [
          {
            key: 'tip-default',
            type: 'tooltip',
            enable: (_e: unknown, items: { id?: string }[]) => items[0]?.id === 'node1',
            getContent: async () => 'Default offset [10, 10]',
          },
          {
            key: 'tip-custom',
            type: 'tooltip',
            offset: [30, -10],
            enable: (_e: unknown, items: { id?: string }[]) => items[0]?.id === 'node2',
            getContent: async () => 'Custom offset [30, -10]',
          },
        ],
      }),
    );
    await graph.render();

    if (stage.preview) {
      const keys = ['tip-default', 'tip-custom'];
      stage.every(1200, (i) => {
        for (const k of keys) graph.getPluginInstance<Tooltip>(k).hide();
        const n = (i - 1) % 2;
        void graph.getPluginInstance<Tooltip>(keys[n]!).show(elementEvent(graph, `node${n + 1}`));
      });
    }
  });

export default mount;
