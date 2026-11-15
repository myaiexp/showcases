// BloomEffect blendMode: how the glow is combined with the frame, and at what opacity
import { HalfFloatType } from 'three';
import { BlendFunction, BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select, slider } from '../../shared/controls.ts';
import { neon } from '../../shared/scenes.ts';
import { NEON_STAGE } from '../../shared/bloom.ts';

const FUNCTIONS = {
  SCREEN: BlendFunction.SCREEN,
  ADD: BlendFunction.ADD,
  LIGHTEN: BlendFunction.LIGHTEN,
  OVERLAY: BlendFunction.OVERLAY,
  SOFT_LIGHT: BlendFunction.SOFT_LIGHT,
  MULTIPLY: BlendFunction.MULTIPLY,
};
type Name = keyof typeof FUNCTIONS;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, NEON_STAGE);
  const subject = neon(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const bloom = new BloomEffect({ blendFunction: BlendFunction.SCREEN, intensity: 1.5 });
  composer.addPass(new EffectPass(stage.camera, bloom));

  const label = overlay(stage.box);
  const apply = (name: Name): void => {
    bloom.blendMode.blendFunction = FUNCTIONS[name];
    label.textContent = `BlendFunction.${name}`;
  };
  apply('SCREEN');

  const names = Object.keys(FUNCTIONS) as Name[];
  if (stage.bar) {
    select(stage.bar, 'blendFunction', names, apply, 'SCREEN');
    slider(stage.bar, 'opacity', 0, 1, 0.05, 1, (v) => (bloom.blendMode.opacity.value = v));
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
