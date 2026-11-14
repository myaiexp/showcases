// The docs' grid demo: rows and cols as sliders
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, sliderOption, valueGraph } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'grid', cols: 5, rows: 5 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: valueGraph(25, 20),
        node: {
          style: { size: 18, labelText: (d) => d.id.replace('node-', ''), labelFontSize: 9, labelBackground: true },
          palette: { type: 'group', field: (d) => String(Math.floor(Number(d.data?.value) / 25)), color: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'] },
        },
        edge: { style: { stroke: '#bfbfbf' } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      sliderOption(stage, graph, layout, 'cols', [2, 10, 1], 5, []);
      sliderOption(stage, graph, layout, 'rows', [2, 10, 1], 5, []);
    } else {
      const steps = [[5, 5], [3, 9], [9, 3], [7, 4]] as const;
      stage.every(1800, (i) => {
        const [cols, rows] = steps[i % steps.length]!;
        return relayout(graph, layout, { cols, rows });
      });
    }
  });

export default mount;
