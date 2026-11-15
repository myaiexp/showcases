// A DotScreenEffect whose angle and scale are sliders, or sweep on their own in a card
import { DotScreenEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const dots = new DotScreenEffect({ angle: Math.PI * 0.5, scale: 1 });
  composer.addPass(new EffectPass(stage.camera, dots));

  const label = stage.bar ? null : overlay(stage.box, '');
  if (stage.bar) {
    slider(stage.bar, 'angle (rad)', 0, 3.14, 0.01, dots.angle, (v) => (dots.angle = v));
    slider(stage.bar, 'scale', 0.2, 3, 0.01, 1, (v) => (dots.scale = v));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      dots.angle = t * 0.4;
      dots.scale = 1 + 0.6 * Math.sin(t * 0.8);
      label.textContent = `scale ${dots.scale.toFixed(2)}`;
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
