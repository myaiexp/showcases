// NoiseTexture as a GlitchEffect perturbationMap, at several sizes
import { EffectComposer, EffectPass, GlitchEffect, GlitchMode, NoiseTexture, RenderPass } from 'postprocessing';
import { RGBAFormat } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const SIZES = ['2', '4', '16', '64', '256'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  // RGBA, because the glitch shader reads the red and green channels (a RedFormat map has no green).
  const maps = new Map(SIZES.map((s) => [s, stage.own(new NoiseTexture(Number(s), Number(s), RGBAFormat))]));

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const glitch = new GlitchEffect({ perturbationMap: maps.get('4') });
  glitch.mode = GlitchMode.CONSTANT_WILD;
  composer.addPass(new EffectPass(stage.camera, glitch));

  const label = overlay(stage.box);
  const set = (size: (typeof SIZES)[number]): void => {
    glitch.perturbationMap = maps.get(size)!;
    label.textContent = `new NoiseTexture(${size}, ${size}, RGBAFormat)`;
  };
  set('4');
  if (stage.bar) select(stage.bar, 'size', SIZES, set, '4');
  else {
    let i = 1;
    stage.every(2200, () => set(SIZES[++i % SIZES.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
