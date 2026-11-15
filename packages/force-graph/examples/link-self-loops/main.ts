// Link styling: a link whose source and target are the same node draws as a loop; curvature sets its size
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
  /** Position among the loops on one node, 0..n-1, and how many there are. */
  slot: number;
  of: number;
  name: string;
}

const NODES = ['A', 'B', 'C', 'D', 'E'];
const LOOPS: Record<string, number> = { A: 3, C: 1, D: 2 };
const EDGES: [string, string][] = [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E'], ['B', 'E']];

const data = (): { nodes: Node[]; links: Link[] } => {
  const links: Link[] = EDGES.map(([source, target]) => ({ source, target, slot: 0, of: 0, name: `${source} to ${target}` }));
  for (const [id, n] of Object.entries(LOOPS)) {
    for (let i = 0; i < n; i++) links.push({ source: id, target: id, slot: i, of: n, name: `loop ${i + 1} on ${id}` });
  }
  return { nodes: NODES.map((id) => ({ id })), links };
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A loop is a link from a node to itself. Curvature is its size; linkSelfCurveRotation turns it, so several loops can sit around one node.' });
  let size = 0.5;
  let spin = 0;

  const isLoop = (l: Link): boolean => (l.source as unknown) === (l.target as unknown);
  const graph = stage
    .own(new ForceGraph<Node, Link>(stage.container))
    .graphData(data())
    .nodeLabel('id')
    .nodeRelSize(6)
    .linkWidth(2)
    .linkColor((l) => (isLoop(l) ? PALETTE[l.slot % PALETTE.length]! : 'rgba(0,0,0,0.3)'))
    .linkCurvature((l) => (isLoop(l) ? size : 0))
    // Loops on one node are spread round the full circle, plus the spin.
    .linkSelfCurveRotation((l) => (l.of ? (l.slot * 360) / l.of + spin : 0))
    .linkLabel('name');
  const redo = (): void => {
    graph.linkCurvature(graph.linkCurvature()).linkSelfCurveRotation(graph.linkSelfCurveRotation());
  };

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 50));
    stage.loop((_dt, t) => {
      spin = t * 40;
      size = 0.45 + 0.15 * Math.sin(t * 1.5);
      redo();
    });
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 60));
    slider(stage.bar, 'loop curvature', 0.1, 1.2, 0.05, size, (v) => {
      size = v;
      redo();
    }, (v) => v.toFixed(2));
    slider(stage.bar, 'rotation offset', 0, 360, 10, spin, (v) => {
      spin = v;
      redo();
    }, (v) => `${v} deg`);
  }

  return stage.dispose;
};

export default mount;
