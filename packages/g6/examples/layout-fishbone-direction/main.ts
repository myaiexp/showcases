// Fishbone direction from the docs' panel: setLayout merges the previous options
import { Graph, treeToGraphData } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { selectOption } from '../../shared/layout-data.ts';
import { quality } from '../../shared/layout-fishbone-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'fishbone', direction: 'RL', vGap: 40, hGap: 50 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: treeToGraphData(quality),
        node: { type: 'rect', style: { size: [90, 22], radius: 3, labelText: (d) => d.id, labelFill: '#fff', labelFontSize: 9, labelPlacement: 'center' } },
        edge: { type: 'polyline', style: { lineWidth: 2 } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    selectOption(stage, graph, layout, 'direction', ['RL', 'LR'] as const, 'RL', 3000);
  });

export default mount;
