// BloomEffect.luminancePass: the high-pass input of the bloom, and what happens when it is skipped
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
  const bloom = new BloomEffect({ luminanceThreshold: 1 });
  const bloomPass = new EffectPass(stage.camera, bloom);
  composer.addPass(bloomPass);
  // The LuminancePass writes only the pixels above the threshold into its own texture.
  const viewPass = new EffectPass(stage.camera, new TextureEffect({ texture: bloom.luminancePass.texture }));
  composer.addPass(viewPass);

  const label = overlay(stage.box);
  const show = (luminanceOnly: boolean): void => {
    viewPass.enabled = luminanceOnly;
    viewPass.renderToScreen = luminanceOnly;
    bloomPass.renderToScreen = !luminanceOnly;
  };
  const filter = (on: boolean): void => {
    // Disabled, the luminance pass is skipped and the whole frame is blurred into the glow.
    bloom.luminancePass.enabled = on;
    label.textContent = on ? 'luminancePass on' : 'luminancePass.enabled = false';
  };
  show(true);
  filter(true);

  if (stage.bar) {
    checkbox(stage.bar, 'show luminance texture', true, show);
    checkbox(stage.bar, 'luminance pass enabled', true, (on) => {
      filter(on);
      show(false);
    });
  } else {
    let on = true;
    stage.every(2200, () => {
      filter((on = !on));
      show(on);
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
