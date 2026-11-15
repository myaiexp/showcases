// GodRaysMaterial: weight and exposure scale the brightness
import { EffectComposer, EffectPass, GodRaysEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sunScene, SUN_STAGE } from '../../shared/sun.ts';
import { tune } from '../../shared/tune.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, SUN_STAGE);
  const subject = sunScene(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // The light source must be a Mesh or Points; the effect makes its material transparent and stops it writing depth.
  const rays = new GodRaysEffect(stage.camera, subject.sun);
  composer.addPass(new EffectPass(stage.camera, rays));

  const m = rays.godRaysMaterial;
  const update = tune(stage, [
    { name: 'weight', min: 0, max: 1.5, step: 0.02, value: 0.4, sweep: [0.1, 1.2, 8], set: (v) => (m.weight = v) },
    { name: 'exposure', min: 0, max: 1.5, step: 0.02, value: 0.6, sweep: [0.2, 1.2, 11], set: (v) => (m.exposure = v) },
  ]);

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
