// d3-force x and y forces pull clusters to targets
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions, NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { clusterGraph, toggleOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const W = stage.container.clientWidth;
    const H = stage.container.clientHeight;
    const layout: BaseLayoutOptions = { type: 'd3-force', manyBody: { strength: -25 }, link: { distance: 30 } };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        padding: 24,
        data: clusterGraph(3, 8),
        node: {
          style: { size: 14 },
          palette: { type: 'group', field: (d) => String(d.data?.cluster) },
        },
        edge: { style: { stroke: '#667' } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    const col = (d: { _original: NodeData }): number => ['a', 'b', 'c'].indexOf(String(d._original.data?.cluster));
    const on = {
      x: { strength: 0.3, x: (d: { _original: NodeData }) => W * (0.2 + col(d) * 0.3) },
      y: { strength: 0.3, y: (d: { _original: NodeData }) => H * (col(d) % 2 ? 0.7 : 0.3) },
    };
    toggleOption(stage, graph, layout, 'x / y forces', on, { x: false, y: false }, false, 2800);
  });

export default mount;
