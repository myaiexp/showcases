// DepthOfFieldEffect: focusDistance slides the sharp plane down the corridor
import { DepthOfFieldEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { corridor } from '../../shared/scenes.ts';
import { DOF_STAGE } from '../../shared/dof.ts';
import { tune } from '../../shared/tune.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, DOF_STAGE);
  const subject = corridor(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const dof = new DepthOfFieldEffect(stage.camera, { focusDistance: 4, focusRange: 5, bokehScale: 4 });
  composer.addPass(new EffectPass(stage.camera, dof));

  // The effect has no focusDistance property: it lives on the circle of confusion material,
  // in world units from the camera.
  const update = tune(stage, [
    { name: 'focusDistance', min: 1, max: 40, step: 0.5, value: 4, sweep: [4, 28, 10], digits: 1, set: (v) => (dof.cocMaterial.focusDistance = v) },
  ]);

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
