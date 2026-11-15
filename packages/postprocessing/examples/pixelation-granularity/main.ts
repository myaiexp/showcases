// A PixelationEffect whose granularity steps through block sizes
import { EffectComposer, EffectPass, PixelationEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, readout, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const STEPS = [0, 4, 8, 16, 32];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const pixels = new PixelationEffect(8);
  composer.addPass(new EffectPass(stage.camera, pixels));

  const info = stage.bar ? readout(stage.box, 'granularity 8') : null;
  const label = stage.bar ? null : overlay(stage.box, '');
  if (stage.bar) {
    slider(stage.bar, 'granularity', 0, 40, 1, 8, (v) => {
      pixels.granularity = v;
      // The setter rounds odd values up to an even number.
      if (info) info.textContent = `asked ${v}, granularity is ${pixels.granularity}`;
    });
  }
  let step = -1;

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      const s = Math.floor(t / 1.5) % STEPS.length;
      if (s !== step) {
        step = s;
        pixels.granularity = STEPS[s]!;
        label.textContent = `granularity ${pixels.granularity}`;
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
