// The docs' 16-node snake layout with clockwise and padding controls
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { chainGraph, sliderOption, toggleOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'snake', padding: 50, clockwise: true };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: chainGraph(16),
        node: { style: { labelFill: '#fff', labelPlacement: 'center', labelText: (d) => d.id } },
        edge: { style: { endArrow: true } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    toggleOption(stage, graph, layout, 'clockwise', { clockwise: true }, { clockwise: false }, true, 2400);
    if (stage.bar) sliderOption(stage, graph, layout, 'padding', [0, 120, 5], 50, []);
  });

export default mount;
