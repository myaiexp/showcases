// getNeighborNodesData() returns the nodes joined to a node by an edge
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { json, people, probe } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: people(),
        node: { style: { size: 30, labelText: (d) => d.id } },
        edge: { style: { endArrow: true } },
        autoFit: 'view',
        padding: 24,
      }),
    );
    await graph.render();

    // The clicked node is selected and its neighbours are highlighted.
    await probe(stage, graph, el, ['alice', 'bob', 'carol', 'dave', 'erin'], (id) => {
      const neighbors = graph.getNeighborNodesData(id);
      return { found: neighbors.map((n) => String(n.id)), text: `getNeighborNodesData('${id}') -> ${json(neighbors.map((n) => n.id))}` };
    });
  });

export default mount;
