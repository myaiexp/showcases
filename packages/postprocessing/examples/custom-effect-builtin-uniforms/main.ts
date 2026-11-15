// The uniforms every effect shader gets for free: aspect, time, texelSize, resolution
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { modes, UniformsEffect } from './UniformsEffect.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const effect = new UniformsEffect();
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, effect));

  const label = overlay(stage.box);
  const show = (i: number): void => {
    effect.mode = i;
    label.textContent = modes[i]!;
  };
  show(0);
  if (stage.bar) select(stage.bar, 'uniform', modes, (m) => show(modes.indexOf(m)));
  else {
    let i = 0;
    stage.every(2200, () => show(++i % modes.length));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
