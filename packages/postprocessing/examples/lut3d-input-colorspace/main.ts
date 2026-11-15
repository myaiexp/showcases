// Two LUT3DEffect passes, inputColorSpace sRGB and linear, with only one enabled at a time
import { LinearSRGBColorSpace, SRGBColorSpace } from 'three';
import { EffectComposer, EffectPass, LUT3DEffect, LookupTexture, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';
import { fillLut, grades } from '../../shared/grading.ts';

const MODES = ['SRGBColorSpace', 'LinearSRGBColorSpace'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const lut = stage.own(LookupTexture.createNeutral(16));
  fillLut(lut, grades['teal and orange']);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const srgb = new EffectPass(stage.camera, new LUT3DEffect(lut, { inputColorSpace: SRGBColorSpace }));
  const linear = new EffectPass(stage.camera, new LUT3DEffect(lut, { inputColorSpace: LinearSRGBColorSpace }));
  composer.addPass(srgb);
  composer.addPass(linear);

  const show = (mode: (typeof MODES)[number]): void => {
    srgb.enabled = mode === 'SRGBColorSpace';
    linear.enabled = !srgb.enabled;
    // addPass only gave renderToScreen to the last pass: hand it to whichever pass is enabled.
    srgb.renderToScreen = srgb.enabled;
    linear.renderToScreen = linear.enabled;
  };
  show('SRGBColorSpace');
  const label = stage.bar ? null : overlay(stage.box, '');
  if (stage.bar) select(stage.bar, 'inputColorSpace', MODES, show);
  let step = -1;

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      const s = Math.floor(t / 2) % 2;
      if (s !== step) {
        step = s;
        show(MODES[s]!);
        label.textContent = MODES[s]!;
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
