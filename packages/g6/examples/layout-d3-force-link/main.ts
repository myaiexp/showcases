// d3-force link force sliders
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { clusterGraph, relayout } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'd3-force', link: { distance: 40, strength: 1 }, manyBody: { strength: -60 } };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: clusterGraph(3, 8),
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

    const link = { distance: 40, strength: 1 };
    const set = (patch: Partial<typeof link>) => relayout(graph, layout, { link: Object.assign(link, patch) });
    if (stage.bar) {
      slider(stage.bar, 'link.distance', [10, 200, 5], 40, (distance) => set({ distance }));
      slider(stage.bar, 'link.strength', [0, 1, 0.05], 1, (strength) => set({ strength }));
    } else {
      const steps = [[40, 1], [110, 1], [40, 0.05], [80, 0.5]] as const;
      stage.every(2400, (i) => set({ distance: steps[i % steps.length]![0], strength: steps[i % steps.length]![1] }));
    }
  });

export default mount;
