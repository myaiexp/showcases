// auto-adapt-label sortNode: which node keeps its label when two collide
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Kind = 'degree' | 'betweenness' | 'closeness' | 'pagerank' | 'by id (custom)';

// A hub with spokes, plus a tail: centrality measures disagree about the "important" node.
const nodes = Array.from({ length: 12 }, (_, i) => ({
  id: `node-${i}`,
  style: { x: (i % 4) * 26 + (i > 7 ? 30 : 0), y: Math.floor(i / 4) * 24 },
}));
const edges = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [3, 11],
].map(([s, t]) => ({ source: `node-${s}`, target: `node-${t}` }));

const sortNode = (kind: Kind) =>
  kind === 'by id (custom)'
    ? (a: { id: string }, b: { id: string }): -1 | 0 | 1 => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
    : { type: kind };

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: { nodes, edges },
        node: { style: { size: 8, labelText: (d) => String(d.id), labelPlacement: 'right', labelFontSize: 11 } },
        behaviors: ['drag-canvas', 'zoom-canvas', { type: 'auto-adapt-label', key: 'adapt', sortNode: { type: 'degree' } }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const kinds: Kind[] = ['degree', 'betweenness', 'closeness', 'pagerank', 'by id (custom)'];
    const apply = (k: Kind) => graph.updateBehavior({ key: 'adapt', sortNode: sortNode(k) });
    if (stage.bar) select(stage.bar, 'sortNode', kinds, 'degree', apply);
    else stage.every(1800, (i) => apply(kinds[i % kinds.length]!));
  });

export default mount;
