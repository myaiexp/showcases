// VFX-JS: RainbowEffect sweeps a moving rainbow gradient over a landscape
import { VFX } from '@vfx-js/core';
import { RainbowEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const rainbow = new RainbowEffect({ speed: 1, frequency: 1 });
  await vfx.add(img, { effect: rainbow });

  if (stage.bar) {
    paramSliders(stage.bar, rainbow.params, [
      ['speed', 0, 4, 0.05],
      ['frequency', 0.2, 6, 0.1],
    ]);
    stage.say('A diagonal rainbow runs through the picture; frequency is how many bands fit, speed how fast it slides.');
  } else {
    stage.say('speed 1, frequency 1');
  }
  return () => stage.dispose();
};

export default mount;
