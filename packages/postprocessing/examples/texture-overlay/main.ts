// TextureEffect: a canvas texture laid over the scene with different blend functions
import { BlendFunction, EffectComposer, EffectPass, RenderPass, TextureEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { gridTexture } from '../../shared/texture-art.ts';

const BLENDS = ['NORMAL', 'MULTIPLY', 'SCREEN', 'OVERLAY', 'SOFT_LIGHT', 'ADD', 'DIFFERENCE'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const texture = stage.own(gridTexture());
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const effect = new TextureEffect({ blendFunction: BlendFunction.NORMAL, texture });
  effect.blendMode.opacity.value = 0.6;
  composer.addPass(new EffectPass(stage.camera, effect));

  const label = overlay(stage.box);
  const set = (name: (typeof BLENDS)[number]): void => {
    effect.blendMode.blendFunction = BlendFunction[name];
    label.textContent = `blendFunction = BlendFunction.${name}`;
  };
  set('NORMAL');
  if (stage.bar) {
    select(stage.bar, 'blendFunction', BLENDS, set, 'NORMAL');
    slider(stage.bar, 'opacity', 0, 1, 0.01, 0.6, (v) => (effect.blendMode.opacity.value = v));
  } else {
    let i = 0;
    stage.every(2000, () => set(BLENDS[++i % BLENDS.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
