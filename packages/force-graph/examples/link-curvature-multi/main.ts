// Link styling: several links between the same two nodes, fanned out with different linkCurvature values
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { PALETTE } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

interface Node {
  id: string;
}
interface Link {
  source: string;
  target: string;
  curvature: number;
  color: string;
  name: string;
}

const PAIRS: [string, string, number][] = [
  ['A', 'B', 4],
  ['B', 'C', 3],
  ['C', 'A', 2],
  ['C', 'D', 1],
];

/** `n` parallel links between a pair, curvatures spread evenly around 0 (one link stays straight). */
function build(step: number): { nodes: Node[]; links: Link[] } {
  const links: Link[] = [];
  for (const [a, b, n] of PAIRS) {
    for (let i = 0; i < n; i++) {
      links.push({ source: a, target: b, curvature: (i - (n - 1) / 2) * step, color: PALETTE[i % PALETTE.length]!, name: `${a} to ${b} #${i + 1}` });
    }
  }
  return { nodes: ['A', 'B', 'C', 'D'].map((id) => ({ id })), links };
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Parallel links would overlap; each gets its own curvature, spread around zero.' });
  let step = 0.3;

  const graph = stage
    .own(new ForceGraph<Node, Link>(stage.container))
    .graphData(build(step))
    .nodeLabel('id')
    .nodeRelSize(7)
    .linkWidth(2)
    .linkCurvature('curvature')
    .linkLabel('name')
    .linkDirectionalArrowLength(5)
    .linkDirectionalArrowRelPos(0.85);
  graph.d3Force('link')?.distance(90);

  const g = graph;
  const apply = (s: number): void => {
    step = s;
    for (const l of g.graphData().links) {
      const mates = g.graphData().links.filter((m) => m.source === l.source && m.target === l.target);
      l.curvature = (mates.indexOf(l) - (mates.length - 1) / 2) * s;
    }
    g.linkCurvature('curvature');
  };

  if (stage.preview) {
    g.cooldownTime(2500).onEngineStop(() => g.zoomToFit(300, 24));
    stage.after(2800, () => stage.loop((_dt, t) => apply(0.2 + 0.15 * Math.sin(t * 1.2))));
  } else if (stage.bar) {
    g.cooldownTime(4000).onEngineStop(() => g.zoomToFit(300, 30));
    slider(stage.bar, 'spread', 0, 0.6, 0.05, step, apply, (v) => v.toFixed(2));
  }

  return stage.dispose;
};

export default mount;
