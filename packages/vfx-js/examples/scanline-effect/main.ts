// VFX-JS: ScanlineEffect, CRT-style lines over a night city
import { VFX } from '@vfx-js/core';
import { ScanlineEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('city', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const fx = new ScanlineEffect({ spacing: 4 });
  await vfx.add(img, { effect: fx });

  const p = fx.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['spacing', 2, 20, 1],
    ]);
    stage.say('spacing is the distance between the dark lines, in CSS px.');
  } else {
    stage.frame((t) => {
      p.spacing = Math.round(sweep(t, 2, 12, 6));
      stage.say(`spacing ${p.spacing}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
