// force layout collision options
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { clusterGraph, relayout, sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'force', preventOverlap: false, nodeSize: 30, nodeSpacing: 0, collideStrength: 1, gravity: 30, nodeStrength: 100 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: clusterGraph(3, 7),
        node: {
          style: { size: 30, fillOpacity: 0.85, stroke: '#fff', lineWidth: 1 },
          palette: { type: 'group', field: (d) => String(d.data?.cluster) },
        },
        edge: { style: { stroke: '#667' } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      toggle(stage.bar, 'preventOverlap', false, (preventOverlap) => relayout(graph, layout, { preventOverlap }));
      sliderOption(stage, graph, layout, 'nodeSpacing', [0, 30, 1], 0, []);
      sliderOption(stage, graph, layout, 'collideStrength', [0, 1, 0.05], 1, []);
    } else {
      stage.every(2600, (i) => relayout(graph, layout, { preventOverlap: i % 2 === 1 }));
    }
  });

export default mount;
