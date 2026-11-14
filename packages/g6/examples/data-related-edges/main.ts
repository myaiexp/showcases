// getRelatedEdgesData() returns the edges touching a node, filtered by direction
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { json, people, probe } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

type Direction = 'both' | 'in' | 'out';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let direction: Direction = 'both';
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: people(),
        node: { style: { size: 28, labelText: (d) => d.id } },
        edge: { style: { endArrow: true, lineWidth: 2, labelText: (d) => d.id, labelBackground: true } },
        autoFit: 'view',
        padding: 24,
      }),
    );
    await graph.render();

    if (stage.bar) select(stage.bar, 'direction', ['both', 'in', 'out'] as const, direction, (v) => (direction = v));
    else stage.every(2600, (i) => (direction = (['both', 'in', 'out'] as const)[i % 3]!));

    await probe(stage, graph, el, ['carol', 'alice', 'carol', 'bob'], (id) => {
      const edges = graph.getRelatedEdgesData(id, direction);
      return { found: edges.map((e) => String(e.id)), text: `getRelatedEdgesData('${id}', '${direction}') -> ${json(edges.map((e) => e.id))}\n(pick a direction, then click a node again)` };
    });
  });

export default mount;
