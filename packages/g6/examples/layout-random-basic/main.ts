// Random layout: a new scatter on every layout() call
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, ringGraph, sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'random', width: 500, height: 300, center: [250, 150] };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: ringGraph(20, 6),
        node: { style: { size: 14 } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      button(stage.bar, 'layout()', () => relayout(graph, layout, {}));
      sliderOption(stage, graph, layout, 'width', [100, 800, 20], 500, []);
      sliderOption(stage, graph, layout, 'height', [100, 600, 20], 300, []);
    } else {
      stage.every(1800, () => relayout(graph, layout, {}));
    }
  });

export default mount;
