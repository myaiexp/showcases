// Node styling: nodeVal as an attribute name, a function of the node, and a constant, in three graphs
import ForceGraph, { type LinkObject, type NodeObject } from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Node = NodeObject & { id: number; size: number };
type Link = LinkObject<Node>;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ctx.preview ? ["'size'", 'degree fn', '6'] : ["nodeVal('size')", 'nodeVal(n => degree)', 'nodeVal(6)'],
    hint: 'One tree, three ways to size it: an attribute, a function of the node, a constant.',
  });
  const count = stage.preview ? 14 : 36;

  const build = (seed: number): { nodes: Node[]; links: Link[] } => {
    const t = randomTree(count, seed);
    return { nodes: t.nodes.map((n) => ({ id: n.id as number, size: 1 + (((n.id as number) * 7) % 9) })), links: t.links.map((l) => ({ ...l })) as Link[] };
  };
  // A function can look at anything on the node; here, its number of links in the raw data.
  const degrees = (links: Link[]): Map<number, number> => {
    const d = new Map<number, number>();
    for (const l of links) for (const end of [l.source, l.target] as number[]) d.set(end, (d.get(end) ?? 0) + 1);
    return d;
  };

  let constant = 6;
  const graphs = stage.panes.map((pane) => stage.own(new ForceGraph<Node, Link>(pane.container), pane).nodeLabel((n) => `id ${n.id}, size ${n.size}`));
  const [byAttr, byFn, byConst] = graphs as [ForceGraph<Node, Link>, ForceGraph<Node, Link>, ForceGraph<Node, Link>];

  const load = (seed: number): void => {
    const data = build(seed);
    const deg = degrees(data.links);
    byAttr.graphData({ nodes: data.nodes, links: data.links }).nodeVal('size');
    // Each graph gets its own copy of the data: the layout writes positions into the objects.
    const copy = (): { nodes: Node[]; links: Link[] } => ({ nodes: data.nodes.map((n) => ({ ...n })), links: data.links.map((l) => ({ ...l })) });
    byFn.graphData(copy()).nodeVal((n) => 1 + 2 * (deg.get(n.id) ?? 0));
    byConst.graphData(copy()).nodeVal(constant);
  };
  load(2);
  for (const g of graphs) g.nodeRelSize(stage.preview ? 5 : 4).cooldownTime(2500).onEngineStop(() => g.zoomToFit(300, 12));

  if (stage.preview) {
    let seed = 2;
    stage.every(6000, () => load(++seed));
  } else if (stage.bar) {
    slider(stage.bar, 'constant', 1, 20, 1, constant, (v) => {
      constant = v;
      byConst.nodeVal(v);
    });
  }

  return stage.dispose;
};

export default mount;
