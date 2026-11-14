// VFX-JS: HueShiftEffect rotates the hues of a flower bed
import { VFX } from '@vfx-js/core';
import { HueShiftEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('flowers', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const hue = new HueShiftEffect({ shift: 0 });
  await vfx.add(img, { effect: hue });

  const p = hue.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [['shift', 0, 1, 0.01]]);
    stage.say('shift 0 and 1 are the same picture: 0..1 is one full turn around the colour wheel.');
  } else {
    stage.frame((t) => {
      p.shift = (t / 6) % 1;
      stage.say(`shift ${p.shift.toFixed(2)}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
