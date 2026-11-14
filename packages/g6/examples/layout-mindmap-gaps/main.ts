// mindmap gap callbacks
import { Graph, treeToGraphData } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { treeDataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'mindmap', direction: 'H', getWidth: () => 80, getHeight: () => 20, getHGap: () => 24, getVGap: () => 10 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: treeToGraphData(await treeDataset('file-system')),
        node: {
          type: 'rect',
          style: { size: [80, 20], radius: 3, labelText: (d) => d.id, labelPlacement: 'center', labelFill: '#fff', labelFontSize: 9 },
        },
        edge: { type: 'cubic-horizontal' },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    const gap = (key: 'getHGap' | 'getVGap') => (v: number) => relayout(graph, layout, { [key]: () => v });
    if (stage.bar) {
      slider(stage.bar, 'hGap', [0, 100, 2], 24, gap('getHGap'));
      slider(stage.bar, 'vGap', [0, 50, 1], 10, gap('getVGap'));
    } else {
      const steps = [[24, 10], [60, 3], [6, 22], [40, 14]] as const;
      stage.every(1900, (i) => {
        const [h, v] = steps[i % steps.length]!;
        return relayout(graph, layout, { getHGap: () => h, getVGap: () => v });
      });
    }
  });

export default mount;
