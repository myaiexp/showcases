// Fruchterman cluster layout: nodes of one cluster field gather together
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'fruchterman', gravity: 6, speed: 5, clustering: true, nodeClusterBy: 'cluster', clusterGravity: 3 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('cluster'),
        node: {
          style: { size: 18, labelFill: '#fff', labelPlacement: 'center', labelFontSize: 8, labelText: (d) => `${d.data?.cluster}-${d.id}` },
          palette: { type: 'group', field: 'cluster' },
        },
        edge: { style: { endArrow: true } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      toggle(stage.bar, 'clustering', true, (clustering) => relayout(graph, layout, { clustering }));
      sliderOption(stage, graph, layout, 'clusterGravity', [0, 30, 1], 3, []);
    } else {
      const steps = [{ clustering: false }, { clustering: true, clusterGravity: 3 }, { clusterGravity: 20 }];
      stage.every(2800, (i) => relayout(graph, layout, steps[i % steps.length]!));
    }
  });

export default mount;
