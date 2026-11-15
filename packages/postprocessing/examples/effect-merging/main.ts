// Six effects merged into one EffectPass versus one EffectPass each, with draw calls counted
import {
  BrightnessContrastEffect,
  EffectComposer,
  EffectPass,
  HueSaturationEffect,
  NoiseEffect,
  RenderPass,
  ScanlineEffect,
  SepiaEffect,
  VignetteEffect,
  type Effect,
} from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const effects = (): Effect[] => [
  new BrightnessContrastEffect({ contrast: 0.15 }),
  new HueSaturationEffect({ saturation: 0.3 }),
  new SepiaEffect({ intensity: 0.3 }),
  new ScanlineEffect({ density: 1.5 }),
  new NoiseEffect({ premultiply: true }),
  new VignetteEffect({ darkness: 0.6 }),
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  // Merged: the EffectPass compiles all six into one compound shader, one fullscreen draw.
  const merged = stage.own(new EffectComposer(stage.renderer));
  merged.addPass(new RenderPass(stage.scene, stage.camera));
  merged.addPass(new EffectPass(stage.camera, ...effects()));

  // Chained: one EffectPass per effect, so one fullscreen draw (and one buffer swap) each.
  const chained = stage.own(new EffectComposer(stage.renderer));
  chained.addPass(new RenderPass(stage.scene, stage.camera));
  for (const effect of effects()) chained.addPass(new EffectPass(stage.camera, effect));

  const modes = { 'one EffectPass': merged, 'one EffectPass per effect': chained };
  type Mode = keyof typeof modes;
  let mode: Mode = 'one EffectPass';
  const label = overlay(stage.box);

  if (stage.bar) select(stage.bar, 'passes', Object.keys(modes) as Mode[], (m) => (mode = m), mode);
  else stage.every(2500, () => (mode = mode === 'one EffectPass' ? 'one EffectPass per effect' : 'one EffectPass'));

  // Count every draw of the frame, not just the last render() call inside it.
  const info = stage.renderer.info;
  info.autoReset = false;
  stage.run((dt, t) => {
    subject.update(t);
    info.reset();
    modes[mode].render(dt);
    label.textContent = `${mode}\ndraw calls per frame: ${info.render.calls}`;
  });
  return () => stage.dispose();
};

export default mount;
