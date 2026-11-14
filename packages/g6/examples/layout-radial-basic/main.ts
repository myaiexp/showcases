// The docs' radial layout on radial.json with sliders for unitRadius and linkDistance
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'radial', nodeSize: 32, unitRadius: 100, linkDistance: 200 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('radial'),
        node: { style: { labelFill: '#fff', labelPlacement: 'center', labelText: (d) => d.id } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    sliderOption(stage, graph, layout, 'unitRadius', [10, 300, 10], 100, [100, 40, 160, 70]);
    sliderOption(stage, graph, layout, 'linkDistance', [10, 400, 10], 200, [200, 80, 300, 120]);
  });

export default mount;
