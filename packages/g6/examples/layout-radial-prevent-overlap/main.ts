// Radial overlap handling: strict ring placement versus relaxed placement
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'radial', nodeSize: 32, unitRadius: 80, preventOverlap: false, strictRadial: true, nodeSpacing: 10 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('radial'),
        node: { style: { size: 32, labelFill: '#fff', labelPlacement: 'center', labelText: (d) => d.id } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      toggle(stage.bar, 'preventOverlap', false, (preventOverlap) => relayout(graph, layout, { preventOverlap }));
      toggle(stage.bar, 'strictRadial', true, (strictRadial) => relayout(graph, layout, { strictRadial }));
      sliderOption(stage, graph, layout, 'nodeSpacing', [0, 40, 2], 10, []);
    } else {
      const steps = [{ preventOverlap: true }, { strictRadial: false }, { preventOverlap: false, strictRadial: true }];
      stage.every(2400, (i) => relayout(graph, layout, steps[i % steps.length]!));
    }
  });

export default mount;
