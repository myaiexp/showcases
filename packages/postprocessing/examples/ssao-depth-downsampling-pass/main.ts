// SSAOEffect: an explicit DepthDownsamplingPass feeding normalDepthBuffer
import { DepthDownsamplingPass, EffectComposer, EffectPass, NormalPass, RenderPass, SSAOEffect } from 'postprocessing';
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
  // Downsamples the depth to a quarter of the pixels, keeping the most representative depth of each
  // 2x2 block, and carries the normals along (normals in RGB, depth in alpha). It needs FloatType.
  const downsampling = new DepthDownsamplingPass({ normalBuffer: normalPass.texture, resolutionScale: 0.5 });
  composer.addPass(downsampling);
  // Handing the result over as normalDepthBuffer stops the effect from making its own copy.
  const ssao = new SSAOEffect(stage.camera, normalPass.texture, {
    normalDepthBuffer: downsampling.texture,
    resolutionScale: 0.5,
    intensity: 3,
  });
  composer.addPass(new EffectPass(stage.camera, ssao));

  const label = overlay(stage.box);
  const show = (on: boolean): void => {
    ssao.depthAwareUpsampling = on;
    label.textContent = `resolutionScale 0.5, depthAwareUpsampling ${on}`;
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
