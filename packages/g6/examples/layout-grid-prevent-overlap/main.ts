// Grid preventOverlap grows cells past the layout width and height when nodes need room
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, sliderOption, valueGraph } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = {
      type: 'grid',
      cols: 5,
      rows: 5,
      width: 150,
      height: 150,
      nodeSize: 30,
      preventOverlap: false,
      preventOverlapPadding: 10,
    };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: valueGraph(25, 0),
        node: { style: { size: 30, fillOpacity: 0.8, stroke: '#fff', lineWidth: 1 } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      toggle(stage.bar, 'preventOverlap', false, (preventOverlap) => relayout(graph, layout, { preventOverlap }));
      sliderOption(stage, graph, layout, 'preventOverlapPadding', [0, 40, 2], 10, []);
      sliderOption(stage, graph, layout, 'nodeSpacing', [0, 40, 2], 0, []);
    } else {
      const steps = [{ preventOverlap: true }, { preventOverlapPadding: 30 }, { preventOverlap: false, preventOverlapPadding: 10 }];
      stage.every(2000, (i) => relayout(graph, layout, steps[i % steps.length]!));
    }
  });

export default mount;
