// SSAOEffect: worldProximityThreshold and falloff reject far-apart samples
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
  const ssao = new SSAOEffect(stage.camera, normalPass.texture, { intensity: 3, worldProximityThreshold: 0.3, worldProximityFalloff: 0.3 });
  composer.addPass(new EffectPass(stage.camera, ssao));

  const m = ssao.ssaoMaterial;
  const update = tune(stage, [
    { name: 'worldProximityThreshold', min: 0.1, max: 3, step: 0.05, value: 0.3, sweep: [0.1, 2.5, 9], set: (v) => (m.worldProximityThreshold = v) },
    { name: 'worldProximityFalloff', min: 0.1, max: 3, step: 0.05, value: 0.3, sweep: [0.1, 2.5, 13], set: (v) => (m.worldProximityFalloff = v) },
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
