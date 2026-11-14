// d3-force collide force with a radius per node
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions, NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { clusterGraph, relayout } from '../../shared/layout-data.ts';

// Sizes from 14 to 34 so the collision radius has something to separate.
const sized = () => {
  const data = clusterGraph(3, 7);
  for (const [i, n] of (data.nodes ?? []).entries()) n.data = { ...n.data, size: 14 + (i % 5) * 5 };
  return data;
};

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'd3-force', manyBody: { strength: -5 }, link: { distance: 30 }, collide: false };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: sized(),
        node: {
          style: { size: (d) => Number(d.data?.size), fillOpacity: 0.85, stroke: '#fff', lineWidth: 1 },
          palette: { type: 'group', field: (d) => String(d.data?.cluster) },
        },
        edge: { style: { stroke: '#667' } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    const on = (strength: number) => ({ collide: { radius: (d: { _original: NodeData }) => Number(d._original.data?.size) / 2 + 2, strength } });
    if (stage.bar) {
      toggle(stage.bar, 'collide', false, (v) => relayout(graph, layout, v ? on(1) : { collide: false }));
      slider(stage.bar, 'collide.strength', [0, 1, 0.05], 1, (s) => relayout(graph, layout, on(s)));
    } else {
      stage.every(2800, (i) => relayout(graph, layout, i % 2 ? { collide: false } : on(1)));
    }
  });

export default mount;
