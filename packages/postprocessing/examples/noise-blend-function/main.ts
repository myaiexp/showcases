// NoiseEffect with different blend functions and opacity
import { BlendFunction, EffectComposer, EffectPass, NoiseEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const BLENDS = ['SCREEN', 'ADD', 'OVERLAY', 'SOFT_LIGHT', 'MULTIPLY', 'DARKEN', 'DIFFERENCE', 'SRC'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const noise = new NoiseEffect({ blendFunction: BlendFunction.SCREEN });
  composer.addPass(new EffectPass(stage.camera, noise));

  const label = overlay(stage.box);
  const set = (name: (typeof BLENDS)[number]): void => {
    noise.blendMode.blendFunction = BlendFunction[name];
    label.textContent = `blendFunction = BlendFunction.${name}`;
  };
  set('SCREEN');
  if (stage.bar) {
    select(stage.bar, 'blendFunction', BLENDS, set, 'SCREEN');
    slider(stage.bar, 'opacity', 0, 1, 0.01, 1, (v) => (noise.blendMode.opacity.value = v));
  } else {
    let i = 0;
    stage.every(2200, () => set(BLENDS[++i % BLENDS.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
