// the "hueShift" preset, its shift uniform from a slider or a clock
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('flowers', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // shift: 0 to 1, one full turn of the colour wheel.
  let shift = 0.3;
  let auto = ctx.preview;
  await vfx.add(img, {
    shader: 'hueShift',
    uniforms: { shift: () => (auto ? (performance.now() / 6000) % 1 : shift) },
  });

  if (stage.bar) {
    slider(stage.bar, 'shift', 0, 1, 0.01, shift, (v) => {
      auto = false;
      shift = v;
    });
  }
  stage.say(ctx.preview ? 'shift turns from 0 to 1 and round again' : 'Drag shift: 0.5 swaps colours for their opposites');
  return () => stage.dispose();
};

export default mount;
