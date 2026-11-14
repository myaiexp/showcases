// Nodes, edges and combos in one graph, styled through the flat node, edge and combo options
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mark } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'a', combo: 'c1', style: { x: 70, y: 90 } },
            { id: 'b', combo: 'c1', style: { x: 140, y: 150 } },
            { id: 'c', combo: 'c2', style: { x: 300, y: 90 } },
            { id: 'd', combo: 'c2', style: { x: 360, y: 160 } },
          ],
          edges: [{ id: 'a-b', source: 'a', target: 'b' }, { id: 'b-c', source: 'b', target: 'c' }, { id: 'c-d', source: 'c', target: 'd' }],
          combos: [{ id: 'c1', type: 'circle' }, { id: 'c2', type: 'rect' }],
        },
        // Flat structure: one block per element type, each with style and state.
        node: {
          style: { fill: 'orange', labelText: (d) => `node ${d.id}`, size: 26 },
          state: { selected: { stroke: '#1890FF', lineWidth: 3 } },
        },
        edge: {
          style: { stroke: '#aaa', endArrow: true },
          state: { highlight: { stroke: 'red', lineWidth: 3 } },
        },
        combo: {
          style: { fill: 'lightblue', fillOpacity: 0.15, stroke: 'blue', labelText: (d) => `combo ${d.id}` },
          state: { selected: { stroke: '#ffd43b', lineWidth: 4 } },
        },
        autoFit: 'view',
        behaviors: ['click-select'],
      }),
    );
    await graph.render();

    // Click an element to select it; the card steps through one of each kind.
    if (stage.preview) {
      const steps: Record<string, string>[] = [{ a: 'selected' }, { 'b-c': 'highlight' }, { c2: 'selected' }];
      stage.every(1200, (i) => mark(graph, steps[i % 3]!));
    }
  });

export default mount;
