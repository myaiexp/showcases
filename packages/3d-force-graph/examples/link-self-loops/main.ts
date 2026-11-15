// Link styling: a link from a node to itself is drawn as a loop whose size is its linkCurvature
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import type { TLink, TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

type Loop = TLink & { curve?: number; turn?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Loops live in the XY plane of the node; curvature sets the size, rotation the direction.' });
  let scale = 1;

  const ids = ['a', 'b', 'c', 'd'];
  const links: Loop[] = [
    { source: 'a', target: 'b' },
    { source: 'b', target: 'c' },
    { source: 'c', target: 'd' },
    { source: 'a', target: 'a', curve: 0.4, turn: 0 },
    { source: 'b', target: 'b', curve: 0.8, turn: 1.2 },
    { source: 'c', target: 'c', curve: 1.2, turn: 2.4 },
    { source: 'd', target: 'd', curve: 1.6, turn: 3.6 },
  ];

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, Loop>)
    .graphData({ nodes: ids.map((id) => ({ id, name: id })), links })
    .nodeVal(8)
    .linkColor((l) => (l.curve ? '#ff9e64' : '#c0caf5'))
    .linkOpacity(0.9)
    .linkWidth(1)
    // Plain links are straight (curvature 0); loops read their own size.
    .linkCurvature((l) => (l.curve ?? 0) * scale)
    .linkCurveRotation((l) => l.turn ?? 0);

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    stage.after(2500, () => cam.fit(30));
    stage.loop((_dt, t) => {
      scale = 0.8 + 0.4 * Math.sin(t);
    });
  } else {
    fitOnce(graph, 80);
  }

  if (stage.bar) slider(stage.bar, 'loop size', 0.2, 2, 0.1, scale, (v) => (scale = v), (v) => v.toFixed(1));

  return stage.dispose;
};

export default mount;
