// DepthEffect: the scene's depth buffer as a greyscale picture, optionally inverted
import { DepthEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { corridor } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { orbit: false, position: [0, 1.4, 6], target: [0, 1.2, -10], near: 1, far: 40 });
  const subject = corridor(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const depth = new DepthEffect({ inverted: false });
  composer.addPass(new EffectPass(stage.camera, depth));

  const label = overlay(stage.box);
  const set = (on: boolean): void => {
    depth.inverted = on;
    label.textContent = `inverted = ${on}`;
  };
  set(false);
  if (stage.bar) checkbox(stage.bar, 'inverted', false, set);
  else {
    let on = false;
    stage.every(2200, () => set((on = !on)));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
