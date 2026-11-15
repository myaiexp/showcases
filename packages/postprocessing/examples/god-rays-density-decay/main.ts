// GodRaysMaterial: density and decay set how far the shafts reach
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
    { name: 'density', min: 0.1, max: 1, step: 0.01, value: 0.96, sweep: [0.3, 1, 8], set: (v) => (m.density = v) },
    { name: 'decay', min: 0.5, max: 1, step: 0.01, value: 0.9, sweep: [0.6, 1, 11], set: (v) => (m.decay = v) },
  ]);

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
