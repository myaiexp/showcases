// DepthOfFieldEffect: bokehScale grows the blur disc without moving the focus
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
  const dof = new DepthOfFieldEffect(stage.camera, { focusDistance: 8, focusRange: 3 });
  composer.addPass(new EffectPass(stage.camera, dof));

  const update = tune(stage, [{ name: 'bokehScale', min: 0, max: 12, step: 0.1, value: 4, sweep: [0, 10, 7], digits: 1, set: (v) => (dof.bokehScale = v) }]);

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
