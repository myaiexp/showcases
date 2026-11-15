// Interaction: expand and collapse a tree: a click on a node hides or restores its subtree by filtering graphData
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { randomTree, type GLink, type GNode } from '../../shared/data.ts';
import { keepFitted } from '../../shared/fit.ts';
import { status } from '../../shared/status.ts';
import { script } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a node with children: its subtree folds into it (orange, with the hidden count). Click again to unfold.' });
  const tree = randomTree(stage.preview ? 36 : 60, 7) as { nodes: GNode[]; links: GLink[] };

  // Each link runs child → parent, so the children of a node are the sources that point at it.
  const children = new Map<string | number, GNode[]>();
  const byId = new Map(tree.nodes.map((n) => [n.id, n]));
  for (const l of tree.links) {
    const parent = l.target as string | number;
    children.set(parent, [...(children.get(parent) ?? []), byId.get(l.source as string | number)!]);
  }
  const below = (n: GNode): GNode[] => (children.get(n.id) ?? []).flatMap((c) => [c, ...below(c)]);
  const collapsed = new Set<GNode>();

  const visible = (): { nodes: GNode[]; links: GLink[] } => {
    const hidden = new Set<GNode>();
    for (const n of collapsed) for (const d of below(n)) hidden.add(d);
    return {
      nodes: tree.nodes.filter((n) => !hidden.has(n)),
      links: tree.links.filter((l) => !hidden.has(byId.get(l.source as string | number)!)),
    };
  };

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(visible())
    .nodeColor((n) => (collapsed.has(n) ? '#e4572e' : '#3d5a80'))
    .nodeLabel((n) => (collapsed.has(n) ? `${n.name} (${below(n).length} hidden)` : String(n.name)))
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .cooldownTime(2000)
    .onNodeClick((n) => {
      if (!(children.get(n.id)?.length)) return;
      if (collapsed.has(n)) collapsed.delete(n);
      else collapsed.add(n);
      graph.graphData(visible());
      say(`${collapsed.has(n) ? 'collapsed' : 'expanded'} ${n.name}: ${graph.graphData().nodes.length} nodes shown`);
    });
  keepFitted(graph, 18);
  const say = status(stage, `${tree.nodes.length} nodes shown`);

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    // The nodes with the biggest subtrees below the root.
    const picks = tree.nodes
      .filter((n) => n.id !== 0)
      .sort((a, b) => below(b).length - below(a).length)
      .slice(0, 3);
    let i = 0;
    script(stage, async (wait) => {
      const n = picks[i++ % picks.length]!;
      graph.zoomToFit(300, 18);
      await wait(700);
      ghost.node(n);
      await wait(1100);
      ghost.click();
      await wait(2600);
      ghost.node(n);
      await wait(1100);
      ghost.click();
      await wait(2200);
    });
  }

  return stage.dispose;
};

export default mount;
