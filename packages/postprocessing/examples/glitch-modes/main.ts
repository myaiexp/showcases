// GlitchEffect.mode: DISABLED, SPORADIC, CONSTANT_MILD and CONSTANT_WILD
import { EffectComposer, EffectPass, GlitchEffect, RenderPass } from 'postprocessing';
import { Vector2 } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { MODE_NAMES, modeValue, type ModeName } from '../../shared/glitch.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // Short delays and durations so SPORADIC glitches show up within a few seconds.
  const glitch = new GlitchEffect({ delay: new Vector2(0.5, 1.2), duration: new Vector2(0.3, 0.6) });
  composer.addPass(new EffectPass(stage.camera, glitch));

  const label = overlay(stage.box);
  const set = (name: ModeName): void => {
    glitch.mode = modeValue(name);
    label.textContent = `mode = GlitchMode.${name}`;
  };
  set('SPORADIC');
  if (stage.bar) select(stage.bar, 'mode', MODE_NAMES, set, 'SPORADIC');
  else {
    let i = 1;
    stage.every(3000, () => set(MODE_NAMES[++i % MODE_NAMES.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
