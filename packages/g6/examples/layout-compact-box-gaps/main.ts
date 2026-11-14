// compact-box gap callbacks driven by sliders
import { Graph, treeToGraphData } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { treeDataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'compact-box', direction: 'LR', getWidth: () => 80, getHeight: () => 20, getHGap: () => 24, getVGap: () => 14 };
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

    // The layout wants functions, so each slider value is wrapped in one.
    const gap = (key: 'getHGap' | 'getVGap') => (v: number) => relayout(graph, layout, { [key]: () => v });
    if (stage.bar) {
      slider(stage.bar, 'hGap', [0, 120, 4], 24, gap('getHGap'));
      slider(stage.bar, 'vGap', [0, 60, 2], 14, gap('getVGap'));
    } else {
      const steps = [[24, 14], [80, 4], [8, 30], [50, 20]] as const;
      stage.every(1900, (i) => {
        const [h, v] = steps[i % steps.length]!;
        return relayout(graph, layout, { getHGap: () => h, getVGap: () => v });
      });
    }
  });

export default mount;
