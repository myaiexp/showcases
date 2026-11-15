// BloomEffect.texture: the blurred glow on its own, painted by a TextureEffect
import { HalfFloatType } from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass, TextureEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { neon } from '../../shared/scenes.ts';
import { NEON_STAGE } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, NEON_STAGE);
  const subject = neon(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const bloom = new BloomEffect();
  const bloomPass = new EffectPass(stage.camera, bloom);
  composer.addPass(bloomPass);
  // bloom.texture holds the intermediate glow; it is refreshed whenever bloomPass runs.
  const viewPass = new EffectPass(stage.camera, new TextureEffect({ texture: bloom.texture }));
  composer.addPass(viewPass);

  const label = overlay(stage.box);
  const show = (glowOnly: boolean): void => {
    viewPass.enabled = glowOnly;
    viewPass.renderToScreen = glowOnly;
    bloomPass.renderToScreen = !glowOnly;
    label.textContent = glowOnly ? 'bloom.texture' : 'scene + bloom';
  };
  show(true);

  if (stage.bar) {
    checkbox(stage.bar, 'show glow texture only', true, show);
  } else {
    let on = true;
    stage.every(2000, () => show((on = !on)));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
