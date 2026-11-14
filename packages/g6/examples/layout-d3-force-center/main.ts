// d3-force center force moves the whole graph
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { clusterGraph, relayout } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const W = stage.container.clientWidth;
    const H = stage.container.clientHeight;
    const layout: BaseLayoutOptions = { type: 'd3-force', center: { x: W / 2, y: H / 2, strength: 1 }, manyBody: { strength: -40 }, link: { distance: 30 } };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        padding: 24,
        data: clusterGraph(3, 6),
        node: {
          style: { size: 14 },
          palette: { type: 'group', field: (d) => String(d.data?.cluster) },
        },
        edge: { style: { stroke: '#667' } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    const center = { x: W / 2, y: H / 2, strength: 1 };
    const set = (patch: Partial<typeof center>) => relayout(graph, layout, { center: Object.assign(center, patch) }, false);
    if (stage.bar) {
      slider(stage.bar, 'center.x', [0, W, 10], W / 2, (x) => set({ x }));
      slider(stage.bar, 'center.y', [0, H, 10], H / 2, (y) => set({ y }));
      slider(stage.bar, 'center.strength', [0, 1, 0.05], 1, (strength) => set({ strength }));
    } else {
      const xs = [0.3, 0.7, 0.5];
      stage.every(2400, (i) => set({ x: W * xs[i % xs.length]! }));
    }
  });

export default mount;
