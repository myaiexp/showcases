// VFX-JS: BadJpegEffect, a shader imitation of JPEG damage
import { VFX } from '@vfx-js/core';
import { BadJpegEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // quality, iterations and downscale are plain fields on this effect (no params object).
  const bad = new BadJpegEffect({ quality: 8, iterations: 3, downscale: 1 });
  await vfx.add(img, { effect: bad });

  if (stage.bar) {
    paramSliders(stage.bar, bad, [
      ['quality', 1, 100, 1],
      ['iterations', 1, 8, 1],
      ['downscale', 0.1, 1, 0.05],
    ]);
    stage.say('Chroma is subsampled and 8x8 blocks are quantised, then the result is fed through again iterations times.');
  } else {
    stage.frame((t) => {
      bad.quality = Math.round(sweep(t, 3, 40, 7));
      stage.say(`quality ${bad.quality}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
