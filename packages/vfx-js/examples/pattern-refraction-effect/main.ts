// VFX-JS: PatternRefractionEffect, a landscape seen through ribbed glass
import { VFX } from '@vfx-js/core';
import { PatternRefractionEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const glass = new PatternRefractionEffect({ pattern: 'lenticular', strength: 0.6, stripWidth: 0.06, dispersion: 0.08, edgeWrap: 'clamp' });
  await vfx.add(img, { effect: glass });

  const p = glass.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['strength', 0, 2, 0.05],
      ['stripWidth', 0.01, 0.4, 0.01],
      ['smoothness', 0, 1, 0.01],
      ['frost', 0, 1, 0.01],
      ['dispersion', 0, 1, 0.01],
      ['angle', 0, 180, 1],
    ]);
    stage.say('Each vertical strip of the picture bends like a lens in ribbed glass, with the colours split a little.');
  } else {
    stage.frame((t) => {
      p.angle = sweep(t, 0, 45, 8);
      stage.say(`angle ${p.angle.toFixed(0)} degrees`);
    });
  }
  return () => stage.dispose();
};

export default mount;
