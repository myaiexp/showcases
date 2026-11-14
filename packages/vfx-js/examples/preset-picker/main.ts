// VFX-JS example: every shader preset on one picture, swapped with remove + add
import { VFX, type ShaderPreset } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

// The presets that need no uniforms, in the order of the Effects page. (duotone, tritone,
// hueShift, vignette and chromatic read uniforms with no defaults; the reveal presets
// play when the element scrolls in.)
const PRESETS: ShaderPreset[] = [
  'uvGradient', 'rainbow', 'glitch', 'rgbGlitch', 'rgbShift', 'shine', 'blink', 'spring',
  'sinewave', 'pixelate', 'halftone', 'invert', 'grayscale',
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('poster', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // vfx.add is async: wait for the previous add before removing the element again.
  let pending: Promise<void> = Promise.resolve();
  const show = (preset: ShaderPreset): void => {
    pending = pending.then(async () => {
      if (stage.disposed) return;
      vfx.remove(img);
      await vfx.add(img, { shader: preset, overflow: preset === 'glitch' ? 40 : 0 });
      stage.say(`shader: "${preset}"`);
    });
  };

  if (stage.bar) {
    select(stage.bar, 'shader', PRESETS.map((p) => [p, p] as const), show);
    show(PRESETS[0]!);
  } else {
    stage.cycle(PRESETS, 2500, show);
  }
  await pending;
  return () => stage.dispose();
};

export default mount;
