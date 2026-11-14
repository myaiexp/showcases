// VFX-JS: PixelStretchEffect smears one scan line across a band of a portrait
import { VFX } from '@vfx-js/core';
import { PixelStretchEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('portrait', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const stretch = new PixelStretchEffect({ reach: 0.25, angle: 0, smoothness: 0.2 });
  await vfx.add(img, { effect: stretch });

  const p = stretch.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['offset', -1, 1, 0.01],
      ['reach', 0, 1, 0.01],
      ['smoothness', 0, 1, 0.01],
      ['angle', 0, 180, 1],
      ['centerX', 0, 1, 0.01],
      ['centerY', 0, 1, 0.01],
    ]);
    stage.say('One line of pixels is copied across the whole band, like a scanner that stuck.');
  } else {
    stage.frame((t) => {
      p.offset = sweep(t, -0.6, 0.6, 5);
      stage.say(`offset ${p.offset.toFixed(2)}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
