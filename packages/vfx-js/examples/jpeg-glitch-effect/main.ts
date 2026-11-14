// VFX-JS: JPEGGlitchEffect corrupts real JPEG bytes and decodes them
import { VFX } from '@vfx-js/core';
import { JPEGGlitchEffect, type JPEGGlitchParams } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { paramSliders } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // The element is read back to the CPU, encoded as a JPEG, a few scan bytes are overwritten
  // and the browser decodes the broken file. Cards run at half resolution, a new glitch
  // about once a second; speed 0 would hold one frame.
  const jpeg = new JPEGGlitchEffect({
    quality: 0.4,
    iterations: 24,
    resolutionScale: ctx.preview ? 0.5 : 1,
    speed: ctx.preview ? 1 : 0,
  });
  await vfx.add(img, { effect: jpeg });

  // Always change params through setParams: it marks the effect dirty so a held (speed 0)
  // frame is glitched again. Writing jpeg.params.x directly leaves the old frame on screen.
  const set = (updates: Partial<JPEGGlitchParams>): void => jpeg.setParams(updates);
  if (stage.bar) {
    const p = jpeg.params;
    paramSliders(
      stage.bar,
      p,
      [
        ['quality', 0.05, 1, 0.01],
        ['iterations', 1, 120, 1],
        ['seed', 0, 1, 0.01],
        ['resolutionScale', 0.1, 1, 0.05],
        ['speed', 0, 6, 0.5],
      ],
      (k, v) => set({ [k]: v }),
    );
    checkbox(stage.bar, 'vertical', p.vertical, (v) => set({ vertical: v }));
    checkbox(stage.bar, 'randomFlip', p.randomFlip, (v) => set({ randomFlip: v }));
    checkbox(stage.bar, 'bypass', p.bypass, (v) => set({ bypass: v }));
    button(stage.bar, 'New seed', () => set({ seed: Math.random() }));
    stage.say('Real JPEG corruption: the tears are what an actual decoder makes of damaged bytes.');
  } else {
    stage.say('a fresh glitch about once a second');
  }
  return () => stage.dispose();
};

export default mount;
