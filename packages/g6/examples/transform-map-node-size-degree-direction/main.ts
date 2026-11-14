// map-node-size with centrality { type: 'degree', direction } on a directed graph
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const DIRECTIONS = ['in', 'out', 'both'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          // s fans out to five nodes; t receives from five nodes.
          nodes: ['s', 'o1', 'o2', 'o3', 'o4', 'o5', 'i1', 'i2', 'i3', 'i4', 'i5', 't'].map((id) => ({ id })),
          edges: [
            ...['o1', 'o2', 'o3', 'o4', 'o5'].map((target) => ({ source: 's', target })),
            ...['i1', 'i2', 'i3', 'i4', 'i5'].map((source) => ({ source, target: 't' })),
            { source: 'o1', target: 'i1' },
          ],
        },
        node: { style: { fill: '#269A99', labelText: (d) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { stroke: '#4a5a7a', endArrow: true } },
        layout: { type: 'antv-dagre', rankdir: 'LR', nodesep: 10, ranksep: 50 },
        transforms: [{ key: 'map-node-size', type: 'map-node-size', centrality: { type: 'degree', direction: 'both' }, minSize: 10, maxSize: 50 }],
      }),
    );
    await graph.render();

    const setDirection = async (direction: (typeof DIRECTIONS)[number]): Promise<void> => {
      graph.updateTransform({ key: 'map-node-size', centrality: { type: 'degree', direction } });
      await graph.render();
    };
    if (stage.bar) select(stage.bar, 'direction', DIRECTIONS, 'both', (v) => void setDirection(v));
    else stage.every(1500, (i) => setDirection(DIRECTIONS[i % 3]!));
  });

export default mount;
