// Fishbone spacing options from the docs' panel; getRibSep wants a function
import { Graph, treeToGraphData } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, sliderOption } from '../../shared/layout-data.ts';
import { quality } from '../../shared/layout-fishbone-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'fishbone', direction: 'RL', hGap: 50, vGap: 40, getRibSep: () => 60 };
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

    if (stage.bar) {
      sliderOption(stage, graph, layout, 'hGap', [20, 120, 5], 50, []);
      sliderOption(stage, graph, layout, 'vGap', [20, 100, 5], 40, []);
      slider(stage.bar, 'getRibSep', [30, 120, 5], 60, (v) => relayout(graph, layout, { getRibSep: () => v }));
    } else {
      const steps = [[50, 40, 60], [90, 30, 40], [30, 70, 100], [60, 50, 60]] as const;
      stage.every(2200, (i) => {
        const [hGap, vGap, rib] = steps[i % steps.length]!;
        return relayout(graph, layout, { hGap, vGap, getRibSep: () => rib });
      });
    }
  });

export default mount;
