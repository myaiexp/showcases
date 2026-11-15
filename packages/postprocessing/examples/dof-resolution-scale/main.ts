// DepthOfFieldEffect: resolution.scale trades blur quality for speed
import { DepthOfFieldEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { corridor } from '../../shared/scenes.ts';
import { DOF_STAGE } from '../../shared/dof.ts';

const SCALES = ['0.15', '0.25', '0.5', '1'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, DOF_STAGE);
  const subject = corridor(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const dof = new DepthOfFieldEffect(stage.camera, { focusDistance: 8, focusRange: 3, bokehScale: 6, resolutionScale: 0.5 });
  composer.addPass(new EffectPass(stage.camera, dof));

  // The bokeh passes run at this fraction of the canvas size (the circle of confusion stays full size).
  const label = overlay(stage.box);
  const apply = (s: (typeof SCALES)[number]): void => {
    dof.resolution.scale = Number(s);
    label.textContent = `resolutionScale ${s}`;
  };
  apply('0.5');
  const picker = stage.bar ? select(stage.bar, 'resolutionScale', SCALES, apply, '0.5') : null;
  let step = 0;
  if (!picker) stage.every(1800, () => apply(SCALES[step++ % SCALES.length]!));

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
