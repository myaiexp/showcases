// Node styling: nodeCanvasObjectMode as a function, so some nodes get a custom label and the rest the default circle
import ForceGraph, { type LinkObject, type NodeObject } from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Node = NodeObject & { id: number; name: string };
type Link = LinkObject<Node>;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Nodes with enough links ("hubs") get a label drawn after the circle; the others are left to the default.' });
  const tree = randomTree(stage.preview ? 36 : 70, 8);
  const nodes: Node[] = tree.nodes.map((n) => ({ id: n.id as number, name: `node ${n.id}` }));
  const links = tree.links as Link[];
  const degree = new Map<number, number>();
  for (const l of links) for (const end of [l.source, l.target] as number[]) degree.set(end, (degree.get(end) ?? 0) + 1);
  let minLinks = 3;

  const graph = stage
    .own(new ForceGraph<Node, Link>(stage.container))
    .graphData({ nodes, links })
    .nodeRelSize(4)
    .nodeColor((n) => ((degree.get(n.id) ?? 0) >= minLinks ? '#e4572e' : 'rgba(31,120,180,0.92)'))
    // 'after' for hubs; any other value leaves the node to the default painting.
    .nodeCanvasObjectMode((n) => ((degree.get(n.id) ?? 0) >= minLinks ? 'after' : 'default'))
    .nodeCanvasObject((node, c, scale) => {
      const fs = (stage.preview ? 10 : 12) / scale;
      c.font = `bold ${fs}px sans-serif`;
      c.textAlign = 'center';
      c.textBaseline = 'bottom';
      c.fillStyle = '#1d1d1b';
      c.fillText(node.name, node.x ?? 0, (node.y ?? 0) - 6 / scale);
    })
    .autoPauseRedraw(false);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 18));
    // Sweep the hub threshold so labels come and go.
    const levels = [3, 2, 4, 3];
    let i = 0;
    stage.after(3000, () => stage.every(1800, () => {
      minLinks = levels[++i % levels.length]!;
      graph.nodeCanvasObjectMode(graph.nodeCanvasObjectMode()).nodeColor(graph.nodeColor());
    }));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    slider(stage.bar, 'hub if links >=', 2, 6, 1, minLinks, (v) => {
      minLinks = v;
      graph.nodeCanvasObjectMode(graph.nodeCanvasObjectMode()).nodeColor(graph.nodeColor());
    });
  }

  return stage.dispose;
};

export default mount;
