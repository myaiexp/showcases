// The docs' basic Fruchterman graph with gravity and speed sliders
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'fruchterman', gravity: 5, speed: 5 };
    const edges: [string, string][] = [
      ['0', '1'], ['0', '2'], ['0', '3'], ['0', '4'], ['0', '7'], ['0', '8'], ['0', '9'], ['0', '10'],
      ['2', '3'], ['4', '5'], ['4', '6'], ['5', '6'], ['9', '10'],
    ];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: Array.from({ length: 11 }, (_, i) => ({ id: `${i}` })),
          edges: edges.map(([source, target], i) => ({ id: `e${i}`, source, target })),
        },
        node: { style: { labelFill: '#fff', labelPlacement: 'center', labelText: (d) => d.id } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    sliderOption(stage, graph, layout, 'gravity', [0, 40, 1], 5, [5, 30, 1, 15]);
    sliderOption(stage, graph, layout, 'speed', [1, 40, 1], 5, [5]);
  });

export default mount;
