// BloomEffect radius: how far the mipmap blur spreads the glow
import { HalfFloatType } from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { neon } from '../../shared/scenes.ts';
import { NEON_STAGE, wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, NEON_STAGE);
  const subject = neon(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // mipmapBlur is on by default; radius belongs to its upsampling step.
  const bloom = new BloomEffect({ mipmapBlur: true, radius: 0.85 });
  composer.addPass(new EffectPass(stage.camera, bloom));

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `radius ${bloom.mipmapBlurPass.radius.toFixed(2)}`;
  };
  note();
  if (stage.bar) slider(stage.bar, 'radius', 0, 1, 0.01, 0.85, (v) => ((bloom.mipmapBlurPass.radius = v), note()));

  stage.run((dt, t) => {
    subject.update(t);
    if (stage.preview) {
      bloom.mipmapBlurPass.radius = wave(t, 0.1, 1);
      note();
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
