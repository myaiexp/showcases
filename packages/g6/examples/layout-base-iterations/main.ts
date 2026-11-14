// BaseLayout.iterations: more ticks, a more settled force layout
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, ringGraph } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = {
      type: 'd3-force',
      animation: false,
      iterations: 5,
      manyBody: { strength: -60 },
      link: { distance: 40 },
    };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: ringGraph(28, 12),
        node: { style: { size: 12 } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    const steps = [5, 15, 40, 300];
    if (stage.bar) {
      slider(stage.bar, 'iterations', [1, 300, 1], 5, (iterations) => relayout(graph, layout, { iterations }));
    } else {
      // d3-force restarts from the current positions, so reset them first with a one-tick run.
      stage.every(2000, async (i) => {
        await relayout(graph, layout, { iterations: 1 }, false);
        await relayout(graph, layout, { iterations: steps[i % steps.length] });
      });
    }
  });

export default mount;
