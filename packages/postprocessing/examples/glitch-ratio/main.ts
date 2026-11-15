// GlitchEffect ratio: the share of weak and strong glitches inside a SPORADIC burst
import { EffectComposer, EffectPass, GlitchEffect, GlitchMode, RenderPass } from 'postprocessing';
import { Vector2 } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // Weak glitches are nearly invisible (0.02) and strong ones are big (2), so the ratio is easy to read.
  // The burst is long and the delay short: nearly every frame is inside a burst.
  const glitch = new GlitchEffect({
    ratio: 0.85,
    strength: new Vector2(0.02, 2),
    delay: new Vector2(0.1, 0.2),
    duration: new Vector2(4, 6),
  });
  glitch.mode = GlitchMode.SPORADIC;
  composer.addPass(new EffectPass(stage.camera, glitch));

  const label = overlay(stage.box);
  if (stage.bar) slider(stage.bar, 'ratio', 0, 1, 0.01, 0.85, (v) => (glitch.ratio = v));

  stage.run((dt, t) => {
    subject.update(t);
    if (!stage.bar) glitch.ratio = wave(t, 0.2, 0.98, 10);
    composer.render(dt);
    label.textContent = `ratio ${glitch.ratio.toFixed(2)}  (a frame is strong when random > ratio)`;
  });
  return () => stage.dispose();
};

export default mount;
