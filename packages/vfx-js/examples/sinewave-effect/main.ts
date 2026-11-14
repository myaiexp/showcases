// VFX-JS: SinewaveEffect ripples a landscape with a travelling sine wave
import { VFX } from '@vfx-js/core';
import { SinewaveEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const fx = new SinewaveEffect({ speed: 1, amount: 20, frequency: 7, blur: 2 });
  await vfx.add(img, { effect: fx });

  const p = fx.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['speed', 0, 4, 0.05],
      ['amount', 0, 60, 1],
      ['frequency', 1, 30, 0.5],
      ['blur', 0, 12, 0.5],
    ]);
    stage.say('Rows shift sideways along a sine wave: amount is its height in CSS px, frequency how many waves fit vertically.');
  } else {
    stage.frame((t) => {
      p.amount = sweep(t, 4, 30, 6);
      stage.say(`amount ${p.amount.toFixed(2)}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
