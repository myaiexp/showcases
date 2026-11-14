// nodeFilter keeps pinned nodes out of a circular layout
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions, NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const pinned: NodeData[] = Array.from({ length: 5 }, (_, i) => ({
      id: `pin-${i}`,
      data: { pinned: true },
      style: { x: 60 + i * 60, y: 24, fill: '#F08F56' },
    }));
    const free: NodeData[] = Array.from({ length: 9 }, (_, i) => ({ id: `free-${i}`, data: { pinned: false } }));
    const layout: BaseLayoutOptions = {
      type: 'circular',
      radius: 70,
      center: [180, 130],
      nodeFilter: (n: NodeData) => !n.data?.pinned,
    };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: { nodes: [...pinned, ...free], edges: free.map((n, i) => ({ id: `e${i}`, source: i < 5 ? `pin-${i}` : `free-${i - 5}`, target: n.id })) },
        node: { style: { size: 16 } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();

    const filter = (n: NodeData): boolean => !n.data?.pinned;
    const all = (): boolean => true;
    if (stage.bar) {
      toggle(stage.bar, 'nodeFilter (skip pinned)', true, (on) => relayout(graph, layout, { nodeFilter: on ? filter : all }));
    } else {
      stage.every(2600, (i) => relayout(graph, layout, { nodeFilter: i % 2 ? filter : all }));
    }
  });

export default mount;
