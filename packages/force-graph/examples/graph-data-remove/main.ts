// Data input: removing a node means filtering it and its links out of the arrays and setting graphData again
import ForceGraph, { type LinkObject, type NodeObject } from 'force-graph';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { keepFitted } from '../../shared/fit.ts';
import { createStage } from '../../shared/stage.ts';

type Node = NodeObject & { id: number; name: string };
type Link = LinkObject<Node>;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a node to remove it and the links that touch it.' });
  const fresh = (seed: number): { nodes: Node[]; links: Link[] } => randomTree(stage.preview ? 30 : 40, seed) as { nodes: Node[]; links: Link[] };
  const status = stage.bar && readout(stage.bar);

  let hovered: Node | null = null;
  let seed = 4;
  const graph = stage
    .own(new ForceGraph<Node, Link>(stage.container))
    .graphData(fresh(seed))
    .nodeLabel('name')
    .nodeColor((n) => (n === hovered ? '#e4572e' : 'rgba(31,120,180,0.92)'))
    .onNodeHover((n) => {
      hovered = n;
    })
    // Hover colour changes while the layout is at rest: keep painting.
    .autoPauseRedraw(false)
    .onNodeClick((node) => remove(node));

  function remove(node: Node): void {
    const { nodes, links } = graph.graphData();
    // After the first layout run source and target are node objects, not ids.
    graph.graphData({
      nodes: nodes.filter((n) => n !== node),
      links: links.filter((l) => l.source !== node && l.target !== node),
    });
    hovered = null;
    if (status) status.textContent = `${graph.graphData().nodes.length} nodes, ${graph.graphData().links.length} links`;
  }

  if (stage.bar) {
    status!.textContent = `${graph.graphData().nodes.length} nodes, ${graph.graphData().links.length} links`;
    button(stage.bar, 'New graph', () => {
      graph.graphData(fresh(++seed));
      status!.textContent = `${graph.graphData().nodes.length} nodes, ${graph.graphData().links.length} links`;
    });
  }

  if (stage.preview) {
    graph.cooldownTime(2500);
    keepFitted(graph);
    const ghost = stage.ghost(graph);
    stage.every(2400, () => {
      const { nodes, links } = graph.graphData();
      if (nodes.length < 10) {
        graph.graphData(fresh(++seed));
        return;
      }
      // A leaf touches exactly one link.
      const degree = new Map<Node, number>();
      for (const l of links) for (const end of [l.source, l.target] as Node[]) degree.set(end, (degree.get(end) ?? 0) + 1);
      const leaves = nodes.filter((n) => degree.get(n) === 1);
      const target = leaves[Math.floor(Math.random() * leaves.length)];
      if (!target) return;
      ghost.node(target);
      // The pointer lookup repaints at most every 800 ms: click after it has caught up.
      stage.after(1000, () => {
        ghost.click();
        stage.after(300, () => ghost.leave());
      });
    });
  }

  return stage.dispose;
};

export default mount;
