// VFX-JS: DitherEffect posterises a test card with a Bayer pattern
import { VFX } from '@vfx-js/core';
import { DitherEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('testcard', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const dither = new DitherEffect({ style: 'bayer8', size: 3, levels: 3 });
  await vfx.add(img, { effect: dither });

  const p = dither.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['size', 1, 12, 1],
      ['levels', 2, 8, 1],
      ['brightness', 0.2, 2, 0.05],
      ['contrast', 0.2, 2, 0.05],
    ]);
    stage.say('Each channel is cut to levels steps; a Bayer matrix decides which way each pixel rounds.');
  } else {
    stage.frame((t) => {
      p.levels = Math.round(sweep(t, 2, 6, 7));
      stage.say(`levels ${p.levels}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
