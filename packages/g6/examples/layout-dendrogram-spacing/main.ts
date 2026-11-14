// dendrogram nodeSep and rankSep sliders
import { Graph, treeToGraphData } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { treeDataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'dendrogram', direction: 'LR', nodeSep: 26, rankSep: 110 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: treeToGraphData(await treeDataset('file-system')),
        node: {
          type: 'rect',
          style: { size: [70, 18], radius: 3, labelText: (d) => d.id, labelPlacement: 'center', labelFill: '#fff', labelFontSize: 9 },
        },
        edge: { type: 'line' },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      sliderOption(stage, graph, layout, 'nodeSep', [20, 100, 2], 26, []);
      sliderOption(stage, graph, layout, 'rankSep', [60, 300, 5], 110, []);
    } else {
      const steps = [[26, 110], [60, 70], [22, 200], [40, 140]] as const;
      stage.every(1900, (i) => {
        const [nodeSep, rankSep] = steps[i % steps.length]!;
        return relayout(graph, layout, { nodeSep, rankSep });
      });
    }
  });

export default mount;
