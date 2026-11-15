// Node styling: nodeColor as an attribute name, and as a function computing a colour from the node
import ForceGraph, { type LinkObject, type NodeObject } from 'force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Node = NodeObject & { id: number; color: string };
type Link = LinkObject<Node>;

const MODES = ['attribute', 'function: degree'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The attribute holds a colour per node; the function colours by how many links a node has.' });

  const tree = randomTree(stage.preview ? 40 : 70, 6);
  const nodes: Node[] = tree.nodes.map((n) => ({ id: n.id as number, color: ['#e4572e', '#29335c', '#f3a712', '#2a9d8f'][(n.id as number) % 4]! }));
  const links = tree.links as Link[];
  const degree = new Map<number, number>();
  for (const l of links) for (const end of [l.source, l.target] as number[]) degree.set(end, (degree.get(end) ?? 0) + 1);
  // A colour scale worked out by hand: 1 link is pale, 5 or more is deep red.
  const ramp = ['#fde0c5', '#fbb38c', '#f07f5b', '#d9482f', '#a4161a'];

  const graph = stage
    .own(new ForceGraph<Node, Link>(stage.container))
    .graphData({ nodes, links })
    .nodeRelSize(5)
    .nodeLabel((n) => `id ${n.id}, ${degree.get(n.id)} links`);

  const use = (mode: (typeof MODES)[number]): void => {
    if (mode === 'attribute') graph.nodeColor('color');
    else graph.nodeColor((n) => ramp[Math.min(ramp.length, degree.get(n.id) ?? 1) - 1]!);
  };
  use('attribute');

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 14));
    let i = 0;
    stage.after(2800, () => stage.every(2000, () => use(MODES[++i % 2]!)));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    select(stage.bar, 'nodeColor', MODES, use);
  }

  return stage.dispose;
};

export default mount;
