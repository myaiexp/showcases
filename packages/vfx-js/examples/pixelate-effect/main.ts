// VFX-JS: PixelateEffect, a portrait in square blocks sized in CSS pixels
import { VFX } from '@vfx-js/core';
import { PixelateEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('portrait', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const pixelate = new PixelateEffect({ size: 12 });
  await vfx.add(img, { effect: pixelate });

  const p = pixelate.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [['size', 1, 60, 1]]);
    stage.say('Every size x size block of CSS pixels takes one colour from the picture.');
  } else {
    stage.frame((t) => {
      p.size = Math.round(sweep(t, 2, 22, 6));
      stage.say(`size ${p.size}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
