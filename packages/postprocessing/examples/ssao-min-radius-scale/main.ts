// SSAOEffect: minRadiusScale limits how far the radius shrinks with distance
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
  const ssao = new SSAOEffect(stage.camera, normalPass.texture, { intensity: 3, radius: 0.3, minRadiusScale: 0.1 });
  composer.addPass(new EffectPass(stage.camera, ssao));

  const m = ssao.ssaoMaterial;
  const update = tune(stage, [
    { name: 'minRadiusScale', min: 0, max: 1, step: 0.01, value: 0.1, sweep: [0, 1, 8], set: (v) => (m.minRadiusScale = v) },
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
