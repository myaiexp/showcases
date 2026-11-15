// VignetteEffect: offset and darkness set where the corners fall off and how deep
import { EffectComposer, EffectPass, RenderPass, VignetteEffect } from 'postprocessing';
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
  const vignette = new VignetteEffect({ offset: 0.3, darkness: 0.7 });
  composer.addPass(new EffectPass(stage.camera, vignette));

  const update = tune(stage, [
    { name: 'offset', min: 0, max: 1.5, step: 0.01, value: 0.3, sweep: [0, 1, 9], set: (v) => (vignette.offset = v) },
    { name: 'darkness', min: 0, max: 1.5, step: 0.01, value: 0.7, sweep: [0.2, 1.2, 6], set: (v) => (vignette.darkness = v) },
  ]);

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
