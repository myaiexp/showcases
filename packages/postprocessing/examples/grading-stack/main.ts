// A LUT, hue/saturation, brightness/contrast and sepia merged into a single EffectPass
import {
  BlendFunction,
  BrightnessContrastEffect,
  EffectComposer,
  EffectPass,
  HueSaturationEffect,
  LUT3DEffect,
  LookupTexture,
  RenderPass,
  SepiaEffect,
} from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';
import { fillLut, grades } from '../../shared/grading.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const lut = stage.own(LookupTexture.createNeutral(16));
  fillLut(lut, grades['teal and orange']);
  const grade = new LUT3DEffect(lut);
  const hs = new HueSaturationEffect({ saturation: 0.35 });
  const bc = new BrightnessContrastEffect({ brightness: -0.05, contrast: 0.2 });
  const sepia = new SepiaEffect();
  sepia.blendMode.opacity.value = 0.25;

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // One EffectPass, one merged shader: the effects run in this order.
  composer.addPass(new EffectPass(stage.camera, grade, hs, bc, sepia));

  const toggles: [string, { blendMode: { blendFunction: number } }, number][] = [
    ['LUT3DEffect', grade, BlendFunction.SRC],
    ['HueSaturationEffect', hs, BlendFunction.SRC],
    ['BrightnessContrastEffect', bc, BlendFunction.SRC],
    ['SepiaEffect', sepia, BlendFunction.NORMAL],
  ];
  const set = (i: number, on: boolean): void => {
    const [, effect, fn] = toggles[i]!;
    effect.blendMode.blendFunction = on ? fn : BlendFunction.SKIP;
  };
  const label = stage.bar ? null : overlay(stage.box, '');
  if (stage.bar) toggles.forEach(([name], i) => checkbox(stage.bar!, name, true, (on) => set(i, on)));
  let step = -1;

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      // Each effect drops out in turn, then all return.
      const s = Math.floor(t / 1.6) % (toggles.length + 1);
      if (s !== step) {
        step = s;
        toggles.forEach((_, i) => set(i, i !== s));
        label.textContent = s < toggles.length ? `without ${toggles[s]![0]}` : 'all four effects';
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
