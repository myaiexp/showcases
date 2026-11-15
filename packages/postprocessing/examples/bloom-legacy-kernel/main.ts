// BloomEffect with mipmapBlur off: the Kawase blur with a KernelSize and a resolution scale
import { HalfFloatType } from 'three';
import { BloomEffect, EffectComposer, EffectPass, KernelSize, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select, slider } from '../../shared/controls.ts';
import { neon } from '../../shared/scenes.ts';
import { NEON_STAGE } from '../../shared/bloom.ts';

const SIZES = KernelSize;
type Name = keyof typeof SIZES;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, NEON_STAGE);
  const subject = neon(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // The deprecated route: a KawaseBlurPass at half resolution instead of the mipmap chain.
  const bloom = new BloomEffect({ mipmapBlur: false, kernelSize: KernelSize.LARGE, resolutionScale: 0.5 });
  composer.addPass(new EffectPass(stage.camera, bloom));

  const label = overlay(stage.box);
  const apply = (name: Name): void => {
    bloom.kernelSize = SIZES[name];
    label.textContent = `KernelSize.${name}, scale ${bloom.resolution.scale}`;
  };
  apply('LARGE');

  const names = Object.keys(SIZES) as Name[];
  if (stage.bar) {
    select(stage.bar, 'kernelSize', names, apply, 'LARGE');
    slider(stage.bar, 'resolution.scale', 0.1, 1, 0.05, 0.5, (v) => (bloom.resolution.scale = v));
  } else {
    let i = 0;
    stage.every(1500, () => apply(names[++i % names.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
