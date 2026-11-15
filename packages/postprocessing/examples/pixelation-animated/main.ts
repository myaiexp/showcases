// A PixelationEffect whose granularity follows a sine wave every frame
import { EffectComposer, EffectPass, PixelationEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const pixels = new PixelationEffect(2);
  composer.addPass(new EffectPass(stage.camera, pixels));

  let peak = 40;
  const label = stage.bar ? null : overlay(stage.box, '');
  if (stage.bar) slider(stage.bar, 'peak granularity', 8, 100, 1, peak, (v) => (peak = v));
  const info = stage.bar ? overlay(stage.box, '') : label;

  stage.run((dt, t) => {
    subject.update(t);
    // 0 at the troughs (effect off), `peak` at the crests.
    pixels.granularity = peak * (0.5 - 0.5 * Math.cos(t * 0.9));
    if (info) info.textContent = `granularity ${pixels.granularity}`;
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
