// inputColorSpace: the same S-curve applied to linear or to sRGB (perceptual) colours
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { CurveEffect } from './CurveEffect.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const curve = new CurveEffect();
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, curve));

  const label = overlay(stage.box);
  const set = (on: boolean): void => {
    curve.setPerceptual(on);
    label.textContent = `inputColorSpace = ${curve.inputColorSpace}\nsame S-curve, ${on ? 'on sRGB values' : 'on linear values'}`;
  };
  set(false);
  if (stage.bar) checkbox(stage.bar, 'sRGB input', false, set);
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
