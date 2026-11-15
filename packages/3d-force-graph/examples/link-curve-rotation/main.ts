// Link styling: linkCurveRotation turns a curved link around its axis, so parallel links fan out
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { endId, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

type Fan = TLink & { n?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Six links join the same two nodes; each is rotated by its own angle.' });
  const COUNT = 6;
  let step = (Math.PI * 2) / COUNT;

  // Six parallel links between A and B, plus a short tail so the pair is not alone.
  const links: Fan[] = Array.from({ length: COUNT }, (_, n) => ({ source: 'A', target: 'B', n }));
  links.push({ source: 'B', target: 'C', n: 0 }, { source: 'C', target: 'D', n: 0 });

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, Fan>)
    .graphData({ nodes: ['A', 'B', 'C', 'D'].map((id) => ({ id, name: id })), links })
    .nodeVal(6)
    .linkColor((l) => `hsl(${(l.n ?? 0) * 60}, 80%, 65%)`)
    .linkOpacity(0.9)
    .linkWidth(1)
    .linkCurvature((l) => (endId(l.source) === 'A' ? 0.8 : 0))
    // Read on every tick: the slider only changes `step`.
    .linkCurveRotation((l) => (l.n ?? 0) * step);

  // A longer link distance, so the fan has room between the two nodes.
  graph.d3Force('link')?.distance(140);

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    stage.after(2500, () => cam.fit(20));
    stage.loop((_dt, t) => {
      step = (Math.PI * 2 / COUNT) * (0.5 + 0.5 * Math.sin(t * 0.8) + 0.2);
    });
  } else {
    graph.cooldownTime(2500);
    fitOnce(graph, 80);
  }

  if (stage.bar) slider(stage.bar, 'step (rad)', 0, 1.6, 0.05, step, (v) => (step = v), (v) => v.toFixed(2));

  return stage.dispose;
};

export default mount;
