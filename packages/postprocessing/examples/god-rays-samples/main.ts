// GodRaysEffect: samples per pixel trade smooth beams for speed
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
  const rays = new GodRaysEffect(stage.camera, subject.sun, { blur: false });
  composer.addPass(new EffectPass(stage.camera, rays));

  const m = rays.godRaysMaterial;
  const update = tune(stage, [
    { name: 'samples', min: 2, max: 120, step: 1, value: 60, sweep: [3, 100, 9], digits: 0, set: (v) => (rays.samples = v) },
  ]);

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
