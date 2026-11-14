// VFX-JS: RgbShiftEffect pulls red, green and blue apart sideways
import { VFX } from '@vfx-js/core';
import { RgbShiftEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('poster', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const fx = new RgbShiftEffect({ speed: 1, amount: 10 });
  await vfx.add(img, { effect: fx });

  const p = fx.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['speed', 0, 4, 0.05],
      ['amount', 0, 60, 1],
    ]);
    stage.say('amount is the largest horizontal offset of the colour channels, in CSS px.');
  } else {
    stage.frame((t) => {
      p.amount = sweep(t, 2, 30, 5);
      stage.say(`amount ${p.amount.toFixed(2)}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
