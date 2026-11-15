// Node styling: nodeCanvasObjectMode picks where a custom painter runs relative to the default circle
import ForceGraph, { type LinkObject, type NodeObject } from 'force-graph';
import type { Mount } from '@/types.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Node = NodeObject & { id: number };
type Link = LinkObject<Node>;
const MODES = ['before', 'after', 'replace'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: [...MODES],
    hint: 'The same painter, a translucent orange halo, in three modes: under the circle, over it, or instead of it.',
  });
  const count = stage.preview ? 9 : 32;
  const rel = stage.preview ? 10 : 5;
  const fresh = (seed: number): { nodes: Node[]; links: Link[] } => {
    const t = randomTree(count, seed);
    return { nodes: t.nodes.map((n) => ({ id: n.id as number })), links: t.links.map((l) => ({ ...l })) as Link[] };
  };

  const graphs = MODES.map((mode, i) => {
    const pane = stage.panes[i]!;
    return stage
      .own(new ForceGraph<Node, Link>(pane.container), pane)
      .nodeRelSize(rel)
      .nodeCanvasObjectMode(() => mode)
      // The same function for all three: a halo around the node's default circle.
      .nodeCanvasObject((node, c) => {
        c.beginPath();
        c.arc(node.x ?? 0, node.y ?? 0, rel + 5, 0, 2 * Math.PI);
        c.fillStyle = 'rgba(244,140,30,0.65)';
        c.fill();
      })
      .cooldownTime(2500)
      .onEngineStop(() => graphsFit());
  });
  const graphsFit = (): void => graphs.forEach((g) => g.zoomToFit(300, 14));
  const load = (seed: number): void => {
    for (const g of graphs) g.graphData(fresh(seed));
  };
  load(4);

  if (stage.preview) {
    let seed = 4;
    stage.every(6000, () => load(++seed));
  }

  return stage.dispose;
};

export default mount;
