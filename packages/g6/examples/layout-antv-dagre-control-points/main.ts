// antv-dagre controlPoints on polyline edges
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'antv-dagre', controlPoints: true, rankdir: 'LR', ranksep: 50 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('dagre'),
        node: {
          style: { size: 24, labelText: (d) => d.id, labelPlacement: 'center', labelFill: '#fff', labelFontSize: 10 },
        },
        edge: { type: 'polyline', style: { endArrow: true } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    // Points written by an earlier run stay in the edge data, so switching off clears them first.
    const apply = async (controlPoints: boolean): Promise<void> => {
      if (!controlPoints) graph.updateEdgeData((edges) => edges.map((e) => ({ ...e, style: { ...e.style, controlPoints: [] } })));
      await relayout(graph, layout, { controlPoints });
    };
    if (stage.bar) toggle(stage.bar, 'controlPoints', true, apply);
    else stage.every(2400, (i) => apply(i % 2 === 0));
  });

export default mount;
