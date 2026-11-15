// NoiseEffect premultiply: add flat noise, or multiply it into the picture first
import { EffectComposer, EffectPass, NoiseEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // The default blend function is SCREEN. Without premultiply the noise is plain grey static, so
  // screening it lifts the dark parts; with it the noise is scaled by the picture and stays dark where the picture is.
  const noise = new NoiseEffect({ premultiply: false });
  composer.addPass(new EffectPass(stage.camera, noise));

  const label = overlay(stage.box);
  const set = (on: boolean): void => {
    noise.premultiply = on;
    label.textContent = `premultiply = ${on}`;
  };
  set(false);
  if (stage.bar) checkbox(stage.bar, 'premultiply', false, set);
  else {
    let on = false;
    stage.every(2500, () => set((on = !on)));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
