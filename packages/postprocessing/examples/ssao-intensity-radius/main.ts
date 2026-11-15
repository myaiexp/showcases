// SSAOEffect: intensity darkens the occlusion, radius widens it
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
  const ssao = new SSAOEffect(stage.camera, normalPass.texture, { intensity: 2 });
  composer.addPass(new EffectPass(stage.camera, ssao));

  const m = ssao.ssaoMaterial;
  const update = tune(stage, [
    { name: 'intensity', min: 0, max: 6, step: 0.1, value: 2, sweep: [0.2, 5, 8], digits: 1, set: (v) => (ssao.intensity = v) },
    // radius is baked into the shader, so every change recompiles it: cards step instead of sweeping.
    { name: 'radius', min: 0.02, max: 0.5, step: 0.01, value: 0.18, steps: { values: [0.05, 0.18, 0.35], every: 3 }, set: (v) => (ssao.radius = v) },
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
