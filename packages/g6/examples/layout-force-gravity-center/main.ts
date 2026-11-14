// force layout gravity and center with a fixed camera
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { clusterGraph, relayout, sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const W = stage.container.clientWidth;
    const H = stage.container.clientHeight;
    const layout: BaseLayoutOptions = { type: 'force', preventOverlap: false, gravity: 10, center: [W / 2, H / 2] };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        padding: 24,
        data: clusterGraph(3, 7),
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

    const set = (patch: Record<string, unknown>) => relayout(graph, layout, patch, false);
    if (stage.bar) {
      sliderOption(stage, graph, layout, 'gravity', [0, 100, 1], 10, []);
      slider(stage.bar, 'center.x', [0, W, 10], W / 2, (x) => set({ center: [x, (layout.center as number[])[1]] }));
      slider(stage.bar, 'center.y', [0, H, 10], H / 2, (y) => set({ center: [(layout.center as number[])[0], y] }));
    } else {
      const xs = [0.5, 0.25, 0.75];
      stage.every(2400, (i) => set({ center: [W * xs[i % xs.length]!, H / 2], gravity: i % 2 ? 40 : 10 }));
    }
  });

export default mount;
