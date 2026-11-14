// stopLayout() stops an iterative layout between ticks
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { ringGraph } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: ringGraph(30, 14),
        node: { style: { size: 12 } },
        layout: { type: 'd3-force', animation: true, manyBody: { strength: -60 }, link: { distance: 50 }, alphaDecay: 0.01 },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      button(stage.bar, 'stopLayout()', () => graph.stopLayout());
      button(stage.bar, 'layout()', () => graph.layout());
    } else {
      // Run the simulation, cut it off after a moment, repeat.
      stage.every(4000, async () => {
        const run = graph.layout();
        stage.after(1300, () => graph.stopLayout());
        await run;
      });
    }
  });

export default mount;
