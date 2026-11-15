// Render control: pauseAnimation freezes the render cycle, resumeAnimation restarts it
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { fitOnce, spin } from '../../shared/camera.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Paused, the view freezes: nodes stop moving, particles stop and the camera ignores the mouse.',
  });

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(clusters(3, stage.preview ? 8 : 12) as TData)
    .nodeLabel('name')
    .linkDirectionalParticles(2)
    .linkDirectionalParticleSpeed(0.006)
    .linkDirectionalParticleWidth(1.5)
    .cooldownTime(stage.preview ? 2500 : 4000);

  const note = overlay(stage);
  let paused = false;
  const show = (): void => {
    note.textContent = `${paused ? 'paused' : 'running'}\nframes drawn: ${graph.renderer().info.render.frame}`;
  };
  const set = (pause: boolean): void => {
    paused = pause;
    if (pause) graph.pauseAnimation();
    else graph.resumeAnimation();
    show();
  };
  stage.every(200, show);
  show();

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.onEngineStop(() => cam.fit(10));
    stage.every(2200, () => set(!paused));
  } else {
    fitOnce(graph);
  }

  if (stage.bar) {
    button(stage.bar, 'pauseAnimation()', () => set(true));
    button(stage.bar, 'resumeAnimation()', () => set(false));
  }

  return stage.dispose;
};

export default mount;
