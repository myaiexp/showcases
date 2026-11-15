// GlitchEffect delay and duration: how long it waits and how long a burst lasts
import { EffectComposer, EffectPass, GlitchEffect, GlitchMode, RenderPass } from 'postprocessing';
import { Vector2 } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // delay and duration are Vector2s: (minimum, maximum) in seconds, drawn again after each burst.
  const glitch = new GlitchEffect({ delay: new Vector2(0.8, 1.6), duration: new Vector2(0.3, 0.6) });
  glitch.mode = GlitchMode.SPORADIC;
  composer.addPass(new EffectPass(stage.camera, glitch));

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `delay ${glitch.minDelay.toFixed(1)}..${glitch.maxDelay.toFixed(1)} s, duration ${glitch.minDuration.toFixed(1)}..${glitch.maxDuration.toFixed(1)} s\nactive: ${glitch.active}`;
  };
  if (stage.bar) {
    slider(stage.bar, 'minDelay', 0, 4, 0.1, glitch.minDelay, (v) => (glitch.minDelay = v));
    slider(stage.bar, 'maxDelay', 0, 6, 0.1, glitch.maxDelay, (v) => (glitch.maxDelay = v));
    slider(stage.bar, 'minDuration', 0.1, 3, 0.1, glitch.minDuration, (v) => (glitch.minDuration = v));
    slider(stage.bar, 'maxDuration', 0.1, 4, 0.1, glitch.maxDuration, (v) => (glitch.maxDuration = v));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
    note();
  });
  return () => stage.dispose();
};

export default mount;
