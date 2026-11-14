// VFX-JS: ChromaticEffect splits colour channels toward the edges
import { VFX } from '@vfx-js/core';
import { ChromaticEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('testcard', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const chromatic = new ChromaticEffect({ intensity: 0.3, radius: 0, power: 2 });
  await vfx.add(img, { effect: chromatic });

  const p = chromatic.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['intensity', 0, 1, 0.01],
      ['radius', 0, 1.5, 0.01],
      ['power', 0.5, 5, 0.1],
    ]);
    stage.say('Red, green and blue are sampled at slightly different distances from the centre; radius is where it starts.');
  } else {
    stage.frame((t) => {
      p.intensity = sweep(t, 0.05, 0.6, 5);
      stage.say(`intensity ${p.intensity.toFixed(2)}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
