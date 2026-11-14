// antv-dagre nodesep and ranksep sliders
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';

import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'antv-dagre', nodesep: 50, ranksep: 50 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('dagre'),
        node: {
          style: { size: 24, labelText: (d) => d.id, labelPlacement: 'center', labelFill: '#fff', labelFontSize: 10 },
        },
        edge: { type: 'polyline', style: { endArrow: true } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    sliderOption(stage, graph, layout, 'nodesep', [10, 120, 5], 50, [20, 90, 30, 60]);
    if (stage.bar) sliderOption(stage, graph, layout, 'ranksep', [10, 120, 5], 50, []);
    // A card has no second slider: its own timer moves ranksep out of step with nodesep.
    else stage.every(2500, (i) => relayout(graph, layout, { ranksep: [20, 80][i % 2] }));
  });

export default mount;
