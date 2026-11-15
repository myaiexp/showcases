// SSAOEffect: BlendFunction.SRC shows the occlusion buffer on its own
import { BlendFunction, EffectComposer, EffectPass, NormalPass, RenderPass, SSAOEffect } from 'postprocessing';
import { overlay, select } from '../../shared/controls.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { room } from '../../shared/scenes.ts';
import { AO_STAGE, sway } from '../../shared/ssao.ts';

const MODES = ['MULTIPLY', 'SRC'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, AO_STAGE);
  const subject = room(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const normalPass = new NormalPass(stage.scene, stage.camera);
  composer.addPass(normalPass);
  const ssao = new SSAOEffect(stage.camera, normalPass.texture, { intensity: 2.5, blendFunction: BlendFunction.SRC });
  composer.addPass(new EffectPass(stage.camera, ssao));

  // The effect outputs white where nothing occludes and darker where something does. MULTIPLY lays
  // that over the picture; SRC replaces the picture with it.
  const label = overlay(stage.box);
  const apply = (mode: (typeof MODES)[number]): void => {
    ssao.blendMode.blendFunction = BlendFunction[mode];
    label.textContent = `blendFunction ${mode}`;
  };
  apply('SRC');
  if (stage.bar) select(stage.bar, 'blendFunction', MODES, apply, 'SRC');
  let step = 0;
  if (!stage.bar) stage.every(2200, () => apply(MODES[++step % 2]!));

  stage.run((dt, t) => {
    subject.update(t);
    sway(stage, t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
