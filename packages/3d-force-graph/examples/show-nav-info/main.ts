// Container layout: showNavInfo() shows or hides the navigation footer
import ForceGraph3D from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The footer at the bottom of the canvas follows the control type.' });

  // The stage hides the footer in cards; this example is about it, so turn it back on.
  const graph = stage.own(new ForceGraph3D(stage.container)).graphData(randomTree(stage.preview ? 40 : 90, 9)).showNavInfo(true);

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    stage.every(1600, () => {
      graph.showNavInfo(!graph.showNavInfo());
    });
  }

  if (stage.bar) checkbox(stage.bar, 'showNavInfo', true, (v) => graph.showNavInfo(v));

  if (!stage.preview) fitOnce(graph);

  return stage.dispose;
};

export default mount;
