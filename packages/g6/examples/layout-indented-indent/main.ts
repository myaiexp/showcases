// indented layout indent as number and function
import { Graph, treeToGraphData } from '@antv/g6';
import type { BaseLayoutOptions, NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { treeDataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'indented', direction: 'LR', indent: 80, getHeight: () => 16, getWidth: () => 32 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: treeToGraphData(await treeDataset('file-system')),
        node: {
          type: 'rect',
          style: { size: [60, 16], radius: 3, labelText: (d) => d.id, labelPlacement: 'center', labelFill: '#fff', labelFontSize: 9 },
        },
        edge: { type: 'polyline' },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    // A function indents each node by its own amount: leaves hang further out than branches.
    const byNode = (d?: NodeData): number => (d?.children?.length ? 50 : 110);
    if (stage.bar) {
      sliderOption(stage, graph, layout, 'indent', [20, 200, 5], 80, []);
      toggle(stage.bar, 'indent function', false, (on) => relayout(graph, layout, { indent: on ? byNode : 80 }));
    } else {
      const steps = [80, 130, 40, byNode];
      stage.every(1900, (i) => relayout(graph, layout, { indent: steps[i % steps.length] }));
    }
  });

export default mount;
