// BloomEffect levels: how many mip levels the glow is blurred through
import { HalfFloatType } from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { neon } from '../../shared/scenes.ts';
import { NEON_STAGE } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, NEON_STAGE);
  const subject = neon(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const bloom = new BloomEffect({ levels: 8 });
  composer.addPass(new EffectPass(stage.camera, bloom));

  const label = overlay(stage.box);
  const apply = (levels: number): void => {
    // Changing levels rebuilds the mipmap chain, so do it on input, not every frame.
    bloom.mipmapBlurPass.levels = levels;
    label.textContent = `levels ${levels}`;
  };
  apply(8);
  if (stage.bar) {
    slider(stage.bar, 'levels', 1, 10, 1, 8, apply);
  } else {
    let i = 0;
    stage.every(1200, () => apply([8, 2, 4, 6][++i % 4]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
