// Changing blendMode.blendFunction on a live effect fires a change event and rebuilds the shader
import { BlendFunction, EffectComposer, EffectPass, RenderPass, TextureEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, readout } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { blendLayer, blendPicker } from '../../shared/blend-rig.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const texture = stage.own(blendLayer());
  const effect = new TextureEffect({ blendFunction: BlendFunction.NORMAL, texture });
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, effect));

  // BlendMode is an EventDispatcher: every assignment to blendFunction dispatches "change",
  // which is what makes the EffectPass rebuild its shader.
  let changes = 0;
  const info = stage.bar ? readout(stage.box) : null;
  const show = (): void => {
    if (info) info.textContent = `"change" events: ${changes}\nshader code of the blend function: ${effect.blendMode.getShaderCode().length} characters`;
  };
  effect.blendMode.addEventListener('change', () => {
    changes++;
    show();
  });
  const picker = blendPicker(stage, effect, ['NORMAL', 'MULTIPLY', 'SCREEN', 'DIFFERENCE', 'SOFT_LIGHT', 'HUE'], 0.8, 1800);
  if (stage.bar) button(stage.bar, 'assign NORMAL again', () => picker.set('NORMAL'));
  show();

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
