// VFX-JS: RgbGlitchEffect, blocks that tear sideways with the colours split
import { VFX } from '@vfx-js/core';
import { RgbGlitchEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('poster', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const glitch = new RgbGlitchEffect({ speed: 1, amount: 0.05 });
  await vfx.add(img, { effect: glitch });

  const p = glitch.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['speed', 0, 4, 0.05],
      ['amount', 0, 0.3, 0.005],
    ]);
    stage.say('amount is how far the blocks move, as a fraction of the picture width.');
  } else {
    stage.frame((t) => {
      p.amount = sweep(t, 0.02, 0.12, 6);
      stage.say(`amount ${p.amount.toFixed(2)}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
