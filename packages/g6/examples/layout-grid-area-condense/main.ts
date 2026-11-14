// Grid layout area options: begin, width, height, condense
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, sliderOption, valueGraph } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'grid', begin: [50, 50], cols: 4, rows: 6, width: 400, height: 600, condense: false };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: valueGraph(24, 20),
        node: { style: { size: 18 }, palette: { type: 'group', field: (d) => String(Math.floor(Number(d.data?.value) / 50)) } },
        edge: { style: { stroke: '#bfbfbf' } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      toggle(stage.bar, 'condense', false, (condense) => relayout(graph, layout, { condense }));
      sliderOption(stage, graph, layout, 'width', [100, 600, 20], 400, []);
      sliderOption(stage, graph, layout, 'height', [100, 800, 20], 600, []);
    } else {
      const steps = [{ condense: true }, { condense: false, width: 200, height: 300 }, { width: 500, height: 300 }, { width: 400, height: 600 }];
      stage.every(2000, (i) => relayout(graph, layout, steps[i % steps.length]!));
    }
  });

export default mount;
