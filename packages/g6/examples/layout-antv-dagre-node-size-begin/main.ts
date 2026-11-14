// antv-dagre nodeSize function and begin offset
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'antv-dagre', rankdir: 'TB', nodeSize: (d: { id: string }) => (Number(d.id) % 3 === 0 ? [60, 24] : [24, 24]), begin: [0, 0] };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('dagre'),
        node: {
          style: { size: (d) => (Number(d.id) % 3 === 0 ? [60, 24] : [24, 24]), labelText: (d) => d.id, labelPlacement: 'center', labelFill: '#fff', labelFontSize: 10 },
        },
        edge: { type: 'polyline', style: { endArrow: true } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    const begins = [[0, 0], [60, 20], [120, 40], [30, 60]] as const;
    if (stage.bar) {
      let [x, y]: [number, number] = [0, 0];
      slider(stage.bar, 'begin x', [0, 200, 10], 0, (v) => relayout(graph, layout, { begin: [(x = v), y] }, false));
      slider(stage.bar, 'begin y', [0, 200, 10], 0, (v) => relayout(graph, layout, { begin: [x, (y = v)] }, false));
    } else {
      stage.every(2000, (i) => relayout(graph, layout, { begin: begins[i % begins.length] }, false));
    }
  });

export default mount;
