// The docs' team clustering layout, one force option per behaviour
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import type { D3Edge, D3Node } from '../../shared/layout-data.ts';
import { clusterGraph } from '../../shared/layout-data.ts';

// Three teams of four: a leader (size 30) and three members (size 20), joined by one edge between leaders.
const teams = () => {
  const data = clusterGraph(3, 4);
  for (const n of data.nodes ?? []) n.data = { ...n.data, size: n.id.endsWith('0') ? 30 : 20 };
  return data;
};

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = {
      type: 'd3-force',
      link: {
        distance: (d: D3Edge) => (d.source._original.data?.cluster === d.target._original.data?.cluster ? 50 : 200),
        strength: (d: D3Edge) => (d.source._original.data?.cluster === d.target._original.data?.cluster ? 0.7 : 0.1),
      },
      manyBody: { strength: (d: D3Node) => (String(d._original.id).endsWith('0') ? -100 : -30) },
      collide: { radius: 35, strength: 0.8 },
      center: { strength: 0.05 },
    };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: teams(),
        node: {
          style: { size: (d) => Number(d.data?.size), labelText: (d) => d.id, labelPlacement: 'center', labelFill: '#fff', labelFontSize: 9 },
          palette: { type: 'group', field: (d) => String(d.data?.cluster), color: ['#FF6B6B', '#4ECDC4', '#45B7D1'] },
        },
        edge: { style: { stroke: '#667' } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element-force'],
      }),
    );
    await graph.render();

    // A card has no pointer: shake the simulation by running it again.
    if (stage.preview) stage.every(5000, () => graph.layout());
  });

export default mount;
