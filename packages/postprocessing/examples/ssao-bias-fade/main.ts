// SSAOEffect: bias removes self-shadowing, fade softens the contrast
import { EffectComposer, EffectPass, NormalPass, RenderPass, SSAOEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { room } from '../../shared/scenes.ts';
import { AO_STAGE, sway } from '../../shared/ssao.ts';
import { tune } from '../../shared/tune.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, AO_STAGE);
  const subject = room(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // SSAOEffect needs the scene's normals: a NormalPass renders them into a texture first.
  const normalPass = new NormalPass(stage.scene, stage.camera);
  composer.addPass(normalPass);
  const ssao = new SSAOEffect(stage.camera, normalPass.texture, { intensity: 3 });
  composer.addPass(new EffectPass(stage.camera, ssao));

  const m = ssao.ssaoMaterial;
  const update = tune(stage, [
    { name: 'bias', min: 0, max: 0.3, step: 0.005, value: 0.025, sweep: [0, 0.2, 9], digits: 3, set: (v) => (m.bias = v) },
    { name: 'fade', min: 0.001, max: 0.5, step: 0.001, value: 0.01, sweep: [0.001, 0.3, 12], digits: 3, set: (v) => (m.fade = v) },
  ]);

  stage.run((dt, t) => {
    subject.update(t);
    sway(stage, t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
