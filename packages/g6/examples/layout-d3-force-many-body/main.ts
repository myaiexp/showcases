// d3-force manyBody strength and distanceMax
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { clusterGraph, relayout } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'd3-force', manyBody: { strength: -30 }, link: { distance: 40 } };
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

    const many = { strength: -30, distanceMax: 400 };
    const set = (patch: Partial<typeof many>) => relayout(graph, layout, { manyBody: Object.assign(many, patch) });
    if (stage.bar) {
      slider(stage.bar, 'manyBody.strength', [-300, 30, 5], -30, (strength) => set({ strength }));
      slider(stage.bar, 'manyBody.distanceMax', [20, 600, 10], 400, (distanceMax) => set({ distanceMax }));
    } else {
      const steps = [-30, -200, 20, -80];
      stage.every(2400, (i) => set({ strength: steps[i % steps.length]! }));
    }
  });

export default mount;
