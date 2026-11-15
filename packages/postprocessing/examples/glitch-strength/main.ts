// GlitchEffect strength: the weak and strong glitch sizes, shown on constant glitching
import { EffectComposer, EffectPass, GlitchEffect, GlitchMode, RenderPass } from 'postprocessing';
import { Vector2 } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // strength = (weak, strong). CONSTANT_MILD uses strength.x, CONSTANT_WILD uses strength.y.
  const glitch = new GlitchEffect({ strength: new Vector2(0.3, 1) });
  glitch.mode = GlitchMode.CONSTANT_WILD;
  composer.addPass(new EffectPass(stage.camera, glitch));

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `strength (${glitch.minStrength.toFixed(2)}, ${glitch.maxStrength.toFixed(2)})`;
  };
  if (stage.bar) {
    select(stage.bar, 'mode', ['CONSTANT_MILD', 'CONSTANT_WILD'] as const, (m) => (glitch.mode = GlitchMode[m]), 'CONSTANT_WILD');
    slider(stage.bar, 'minStrength (weak)', 0, 2, 0.05, 0.3, (v) => (glitch.minStrength = v));
    slider(stage.bar, 'maxStrength (strong)', 0, 4, 0.05, 1, (v) => (glitch.maxStrength = v));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (!stage.bar) glitch.maxStrength = wave(t, 0.1, 3, 8);
    composer.render(dt);
    note();
  });
  return () => stage.dispose();
};

export default mount;
