// tooltip style: a dark and a light tooltip chosen per node
import { Graph, Tooltip } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { elementEvent } from '../../shared/plugin-drive.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const forTheme = (key: string, theme: string, background: string, color: string, border: string) => ({
      key,
      type: 'tooltip',
      enable: (_e: unknown, items: { data?: { theme?: string } }[]) => items[0]?.data?.theme === theme,
      getContent: async (_e: unknown, items: { data?: { name?: string } }[]) => `${items[0]?.data?.name}`,
      style: { '.tooltip': { background, color, border: `1px solid ${border}`, borderRadius: 8, padding: '8px 12px' } },
    });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'node1', style: { x: 100, y: 100 }, data: { theme: 'dark', name: 'Dark Theme' } },
            { id: 'node2', style: { x: 250, y: 100 }, data: { theme: 'light', name: 'Light Theme' } },
          ],
        },
        node: { style: { fill: '#7e3feb', size: 28 } },
        autoFit: 'center',
        plugins: [
          forTheme('tip-dark', 'dark', '#1f2937', '#f9fafb', '#4b5563'),
          forTheme('tip-light', 'light', '#ffffff', '#1f2937', '#d1d5db'),
        ],
      }),
    );
    await graph.render();

    if (stage.preview) {
      const keys = ['tip-dark', 'tip-light'];
      stage.every(1200, (i) => {
        for (const k of keys) graph.getPluginInstance<Tooltip>(k).hide();
        const n = (i - 1) % 2;
        void graph.getPluginInstance<Tooltip>(keys[n]!).show(elementEvent(graph, `node${n + 1}`));
      });
    }
  });

export default mount;
