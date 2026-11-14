// The docs' MDS example with linkDistance as a slider
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { sliderOption, valueGraph } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'mds', nodeSize: 32, linkDistance: 100 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: valueGraph(25, 20),
        node: { style: { size: 16, labelText: (d) => d.id.replace('node-', ''), labelFontSize: 8, labelPlacement: 'center', labelFill: '#fff' } },
        layout: { ...layout },
        behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();

    sliderOption(stage, graph, layout, 'linkDistance', [20, 250, 10], 100, [100, 30, 200, 60]);
  });

export default mount;
