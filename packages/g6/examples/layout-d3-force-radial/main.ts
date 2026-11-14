// d3-force radial force sliders
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
    const R = Math.round(Math.min(W, H) * 0.35);
    const layout: BaseLayoutOptions = { type: 'd3-force', radial: { x: W / 2, y: H / 2, radius: R, strength: 0.8 }, manyBody: { strength: -20 }, link: { distance: 30, strength: 0.2 } };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
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

    const radial = { x: W / 2, y: H / 2, radius: R, strength: 0.8 };
    const set = (patch: Partial<typeof radial>) => relayout(graph, layout, { radial: Object.assign(radial, patch) }, false);
    if (stage.bar) {
      slider(stage.bar, 'radial.radius', [20, Math.round(H * 0.45), 5], R, (radius) => set({ radius }));
      slider(stage.bar, 'radial.strength', [0, 1, 0.05], 0.8, (strength) => set({ strength }));
    } else {
      const radii = [0.35, 0.15, 0.4];
      stage.every(2400, (i) => set({ radius: R * (radii[i % radii.length]! / 0.35) }));
    }
  });

export default mount;
