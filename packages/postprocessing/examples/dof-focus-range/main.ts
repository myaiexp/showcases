// DepthOfFieldEffect: focusRange sets how far from the focus the blur ramps in
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
  const dof = new DepthOfFieldEffect(stage.camera, { focusDistance: 12, focusRange: 4, bokehScale: 4 });
  composer.addPass(new EffectPass(stage.camera, dof));

  // focusRange is the distance, in world units, over which the blur grows from none to full.
  const update = tune(stage, [
    { name: 'focusRange', min: 0.5, max: 30, step: 0.5, value: 4, sweep: [0.5, 24, 8], digits: 1, set: (v) => (dof.cocMaterial.focusRange = v) },
  ]);

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
