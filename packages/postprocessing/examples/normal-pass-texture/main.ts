// NormalPass: the normal texture it renders, shown through a TextureEffect
import { BlendFunction, EffectComposer, EffectPass, NormalPass, RenderPass, TextureEffect } from 'postprocessing';
import { overlay, select } from '../../shared/controls.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { room } from '../../shared/scenes.ts';
import { AO_STAGE, sway } from '../../shared/ssao.ts';

const SCALES = ['0.1', '0.25', '1'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, AO_STAGE);
  const subject = room(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // NormalPass renders the scene with a normal material into its own render target; the target's
  // texture is what SSAOEffect takes. Here it is put on screen instead.
  const normalPass = new NormalPass(stage.scene, stage.camera);
  composer.addPass(normalPass);
  composer.addPass(new EffectPass(stage.camera, new TextureEffect({ texture: normalPass.texture, blendFunction: BlendFunction.SRC })));

  const label = overlay(stage.box);
  const apply = (s: (typeof SCALES)[number]): void => {
    normalPass.resolution.scale = Number(s);
    label.textContent = `NormalPass.texture, resolutionScale ${s}`;
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
