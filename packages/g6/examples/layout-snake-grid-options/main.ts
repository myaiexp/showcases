// Snake grid options from the docs' lil-gui panel
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { chainGraph, relayout, sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'snake', clockwise: true, cols: 4, colGap: 30, rowGap: 30, padding: 15, nodeSize: 30 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        padding: 24,
        data: chainGraph(16),
        node: { style: { size: 30, labelFill: '#fff', labelPlacement: 'center', labelText: (d) => d.id } },
        edge: { style: { endArrow: true } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      sliderOption(stage, graph, layout, 'cols', [2, 10, 1], 4, []);
      sliderOption(stage, graph, layout, 'colGap', [10, 150, 5], 30, []);
      sliderOption(stage, graph, layout, 'rowGap', [10, 150, 5], 30, []);
      sliderOption(stage, graph, layout, 'nodeSize', [10, 50, 2], 30, []);
    } else {
      const steps = [{ cols: 4, colGap: 30 }, { cols: 6, colGap: 20 }, { cols: 3, colGap: 40, rowGap: 15 }, { cols: 4, colGap: 30, rowGap: 30 }];
      stage.every(1900, (i) => relayout(graph, layout, steps[i % steps.length]!));
    }
  });

export default mount;
