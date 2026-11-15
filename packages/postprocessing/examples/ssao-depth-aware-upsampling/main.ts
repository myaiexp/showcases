// SSAOEffect: depthAwareUpsampling against plain linear filtering at a low resolution
import { BlendFunction, EffectComposer, EffectPass, NormalPass, RenderPass, SSAOEffect } from 'postprocessing';
import { checkbox, overlay } from '../../shared/controls.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { room } from '../../shared/scenes.ts';
import { AO_STAGE, sway } from '../../shared/ssao.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, AO_STAGE);
  const subject = room(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const normalPass = new NormalPass(stage.scene, stage.camera);
  composer.addPass(normalPass);
  // A quarter-size AO buffer, shown on its own so the edges are easy to judge.
  const ssao = new SSAOEffect(stage.camera, normalPass.texture, { resolutionScale: 0.25, intensity: 3, blendFunction: BlendFunction.SRC });
  composer.addPass(new EffectPass(stage.camera, ssao));

  // With the option on, each pixel picks the AO texel whose depth fits it best, so the dark halos
  // that linear filtering smears over object edges go away.
  const label = overlay(stage.box);
  const show = (on: boolean): void => {
    ssao.depthAwareUpsampling = on;
    label.textContent = `depthAwareUpsampling ${on}`;
  };
  show(true);
  if (stage.bar) checkbox(stage.bar, 'depthAwareUpsampling', true, show);
  let on = true;
  if (!stage.bar) stage.every(2200, () => show((on = !on)));

  stage.run((dt, t) => {
    subject.update(t);
    sway(stage, t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
