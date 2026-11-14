// The docs' combo-combined example, with comboPadding as a slider
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'combo-combined', comboPadding: 2 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('combo'),
        node: {
          style: { size: stage.preview ? 12 : 20, labelText: stage.preview ? undefined : (d) => d.id },
          palette: { type: 'group', field: (d) => d.combo as string },
        },
        edge: { style: { stroke: '#99ADD1' } },
        layout: { ...layout },
        behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();

    sliderOption(stage, graph, layout, 'comboPadding', [0, 60, 2], 2, [2, 30, 10, 50], 3000);
  });

export default mount;
