// A BrightnessContrastEffect driven by sliders, or by two sine waves in a card
import { BrightnessContrastEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider, overlay } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const bc = new BrightnessContrastEffect({ brightness: 0, contrast: 0 });
  composer.addPass(new EffectPass(stage.camera, bc));

  let label: HTMLElement | null = null;
  if (stage.bar) {
    slider(stage.bar, 'brightness', -1, 1, 0.01, 0, (v) => (bc.brightness = v));
    slider(stage.bar, 'contrast', -1, 1, 0.01, 0, (v) => (bc.contrast = v));
  } else {
    label = overlay(stage.box, '');
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      bc.brightness = 0.4 * Math.sin(t * 0.9);
      bc.contrast = 0.6 * Math.sin(t * 0.6 + 1);
      label.textContent = `brightness ${bc.brightness.toFixed(2)}  contrast ${bc.contrast.toFixed(2)}`;
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
