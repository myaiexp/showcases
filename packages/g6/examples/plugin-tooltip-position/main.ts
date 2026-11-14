// four keyed tooltip plugins, each pinned to one node by its enable function
import { Graph, Tooltip } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { elementEvent } from '../../shared/plugin-drive.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const tip = (key: string, position: 'top' | 'bottom' | 'left' | 'right', id: string, bg: string, border: string) => ({
      key,
      type: 'tooltip',
      position,
      enable: (_e: unknown, items: { id?: string }[]) => items[0]?.id === id,
      getContent: async () => `Display at ${position}`,
      style: { '.tooltip': { background: bg, border: `1px solid ${border}`, borderRadius: 4, color: '#222' } },
    });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'node1', style: { x: 100, y: 100 }, data: { label: 'TOP' } },
            { id: 'node2', style: { x: 250, y: 100 }, data: { label: 'BOTTOM' } },
            { id: 'node3', style: { x: 100, y: 220 }, data: { label: 'LEFT' } },
            { id: 'node4', style: { x: 250, y: 220 }, data: { label: 'RIGHT' } },
          ],
        },
        node: { style: { fill: '#7e3feb', size: 24, labelText: (d) => String(d.data?.label), labelFill: '#fff', labelPlacement: 'center' } },
        autoFit: 'center',
        plugins: [
          tip('tip-top', 'top', 'node1', '#fff2e8', '#ffa940'),
          tip('tip-bottom', 'bottom', 'node2', '#f6ffed', '#73d13d'),
          tip('tip-left', 'left', 'node3', '#fff1f0', '#ff7875'),
          tip('tip-right', 'right', 'node4', '#e6f4ff', '#69b1ff'),
        ],
      }),
    );
    await graph.render();

    if (stage.preview) {
      const keys = ['tip-top', 'tip-bottom', 'tip-left', 'tip-right'];
      stage.every(1000, (i) => {
        for (const k of keys) graph.getPluginInstance<Tooltip>(k).hide();
        const n = (i - 1) % 4;
        void graph.getPluginInstance<Tooltip>(keys[n]!).show(elementEvent(graph, `node${n + 1}`));
      });
    }
  });

export default mount;
