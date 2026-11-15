// SSAOEffect: the documented wiring of RenderPass, NormalPass and an SSAO EffectPass
import { EffectComposer, EffectPass, NormalPass, RenderPass, SSAOEffect } from 'postprocessing';
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
  // SSAOEffect reads the scene's normals from a texture, so a NormalPass renders them first.
  // The depth comes from the composer's own depth texture.
  const normalPass = new NormalPass(stage.scene, stage.camera);
  composer.addPass(normalPass);
  const ssao = new SSAOEffect(stage.camera, normalPass.texture, { intensity: 2.5 });
  composer.addPass(new EffectPass(stage.camera, ssao));

  // The default blend function is MULTIPLY: the occlusion darkens the rendered colours.
  // Opacity 0 shows the plain render for comparison.
  const label = overlay(stage.box);
  const show = (on: boolean): void => {
    ssao.blendMode.opacity.value = on ? 1 : 0;
    label.textContent = on ? 'SSAO on' : 'SSAO off';
  };
  show(true);
  if (stage.bar) checkbox(stage.bar, 'SSAO', true, show);
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
