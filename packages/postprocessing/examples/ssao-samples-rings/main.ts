// SSAOEffect: samples and rings shape the sampling spiral
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
  const ssao = new SSAOEffect(stage.camera, normalPass.texture, { intensity: 2.5 });
  composer.addPass(new EffectPass(stage.camera, ssao));

  const m = ssao.ssaoMaterial;
  const update = tune(stage, [
    { name: 'samples', min: 1, max: 32, step: 1, value: 9, digits: 0, steps: { values: [2, 5, 9, 16, 32], every: 2 }, set: (v) => (ssao.samples = v) },
    { name: 'rings', min: 1, max: 13, step: 1, value: 7, digits: 0, set: (v) => (ssao.rings = v) },
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
