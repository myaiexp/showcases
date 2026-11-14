// VFX-JS: VignetteEffect darkens the edges of a portrait
import { VFX } from '@vfx-js/core';
import { VignetteEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('portrait', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const vignette = new VignetteEffect({ intensity: 1, radius: 0.5, power: 2 });
  await vfx.add(img, { effect: vignette });

  const p = vignette.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['intensity', 0, 2, 0.05],
      ['radius', 0, 1.5, 0.01],
      ['power', 0.5, 6, 0.1],
    ]);
    stage.say('The picture darkens from radius (measured from the centre) outward; power is how sharply.');
  } else {
    stage.frame((t) => {
      p.radius = sweep(t, 0.2, 1, 6);
      stage.say(`radius ${p.radius.toFixed(2)}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
