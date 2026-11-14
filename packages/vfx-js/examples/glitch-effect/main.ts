// VFX-JS: GlitchEffect, block shifts and colour aberration on a night city
import { VFX } from '@vfx-js/core';
import { GlitchEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('city', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const glitch = new GlitchEffect({ speed: 1, intensity: 1 });
  await vfx.add(img, { effect: glitch });

  const p = glitch.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['speed', 0, 4, 0.05],
      ['intensity', 0, 3, 0.05],
    ]);
    stage.say('Blocks of the picture jump sideways and the colour channels drift apart, in bursts. intensity scales both.');
  } else {
    stage.frame((t) => {
      p.intensity = sweep(t, 0.4, 2, 6);
      stage.say(`intensity ${p.intensity.toFixed(1)}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
