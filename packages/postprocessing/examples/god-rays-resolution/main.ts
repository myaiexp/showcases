// GodRaysEffect: resolution.scale sets the size of the ray buffers
import { EffectComposer, EffectPass, GodRaysEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { sunScene, SUN_STAGE } from '../../shared/sun.ts';

const SCALES = ['0.1', '0.25', '0.5', '1'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, SUN_STAGE);
  const subject = sunScene(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const rays = new GodRaysEffect(stage.camera, subject.sun, { resolutionScale: 0.5, blur: false });
  composer.addPass(new EffectPass(stage.camera, rays));

  // The radial blur runs at this fraction of the canvas, then is stretched back up.
  const label = overlay(stage.box);
  const apply = (s: (typeof SCALES)[number]): void => {
    rays.resolution.scale = Number(s);
    label.textContent = `resolutionScale ${s}`;
  };
  apply('0.5');
  if (stage.bar) select(stage.bar, 'resolutionScale', SCALES, apply, '0.5');
  let step = 0;
  if (!stage.bar) stage.every(1800, () => apply(SCALES[step++ % SCALES.length]!));

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
