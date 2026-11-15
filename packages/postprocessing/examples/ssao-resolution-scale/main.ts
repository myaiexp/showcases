// SSAOEffect: resolution.scale renders the occlusion at a fraction of the screen
import { EffectComposer, EffectPass, NormalPass, RenderPass, SSAOEffect } from 'postprocessing';
import { overlay, select } from '../../shared/controls.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { room } from '../../shared/scenes.ts';
import { AO_STAGE, sway } from '../../shared/ssao.ts';

const SCALES = ['0.15', '0.25', '0.5', '1'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, AO_STAGE);
  const subject = room(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const normalPass = new NormalPass(stage.scene, stage.camera);
  composer.addPass(normalPass);
  const ssao = new SSAOEffect(stage.camera, normalPass.texture, { resolutionScale: 1, intensity: 3 });
  composer.addPass(new EffectPass(stage.camera, ssao));

  // The occlusion is cheaper at a lower scale; the depth downsampling inside the effect follows it.
  const label = overlay(stage.box);
  const apply = (s: (typeof SCALES)[number]): void => {
    ssao.resolution.scale = Number(s);
    label.textContent = `resolutionScale ${s}`;
  };
  apply('1');
  if (stage.bar) select(stage.bar, 'resolutionScale', SCALES, apply, '1');
  let step = 0;
  if (!stage.bar) stage.every(2000, () => apply(SCALES[++step % SCALES.length]!));

  stage.run((dt, t) => {
    subject.update(t);
    sway(stage, t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
