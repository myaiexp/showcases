// Node styling: nodeRelSize scales every sphere; nodeVal keeps the proportions between them
import ForceGraph3D from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { team } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The three leads have val 6, everyone else 1: the ratio holds at any size.' });

  const graph = stage.own(new ForceGraph3D(stage.container)).graphData(team()).nodeRelSize(4).nodeOpacity(0.9);

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    stage.every(120, () => {
      graph.nodeRelSize(2 + 5 * (0.5 + 0.5 * Math.sin(performance.now() / 700)));
    });
  }

  if (stage.bar) slider(stage.bar, 'nodeRelSize', 1, 14, 0.5, 4, (v) => graph.nodeRelSize(v));

  if (!stage.preview) fitOnce(graph);

  return stage.dispose;
};

export default mount;
