// A DotScreenEffect blended over the scene with a choice of blend function and opacity
import { BlendFunction, DotScreenEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const FUNCTIONS = ['NORMAL', 'OVERLAY', 'MULTIPLY', 'SOFT_LIGHT', 'SCREEN'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const dots = new DotScreenEffect({ blendFunction: BlendFunction.OVERLAY, angle: 0.5, scale: 1.2 });
  composer.addPass(new EffectPass(stage.camera, dots));

  const label = stage.bar ? null : overlay(stage.box, '');
  if (stage.bar) {
    select(stage.bar, 'blend', FUNCTIONS, (name) => (dots.blendMode.blendFunction = BlendFunction[name]), 'OVERLAY');
    slider(stage.bar, 'opacity', 0, 1, 0.01, 1, (v) => (dots.blendMode.opacity.value = v));
  }
  let step = -1;

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      const s = Math.floor(t / 1.8) % FUNCTIONS.length;
      if (s !== step) {
        step = s;
        dots.blendMode.blendFunction = BlendFunction[FUNCTIONS[s]!];
        label.textContent = FUNCTIONS[s]!;
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
