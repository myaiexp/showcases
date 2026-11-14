// VFX-JS: SliceShiftEffect cuts the picture in strips and shifts each one
import { VFX } from '@vfx-js/core';
import { SliceShiftEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('testcard', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const fx = new SliceShiftEffect({ shift: 0.5, size: 40 });
  await vfx.add(img, { effect: fx });

  const p = fx.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['shift', -1, 1, 0.01],
      ['random', 0, 1, 0.01],
      ['size', 5, 120, 1],
      ['angle', 0, 180, 1],
      ['centerX', 0, 1, 0.01],
      ['centerY', 0, 1, 0.01],
    ]);
    stage.say('Strips (size, in px) slide toward the centre strip by shift; random adds a per-strip wobble.');
  } else {
    stage.frame((t) => {
      p.shift = sweep(t, -0.8, 0.8, 6);
      stage.say(`shift ${p.shift.toFixed(2)}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
