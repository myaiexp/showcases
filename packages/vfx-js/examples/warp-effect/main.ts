// VFX-JS: WarpEffect twists a test card around a centre you can move
import { VFX } from '@vfx-js/core';
import { WarpEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('testcard', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const warp = new WarpEffect({ type: 'twist', amplitude: 3, centerX: 0.5, centerY: 0.5 });
  await vfx.add(img, { effect: warp });

  const p = warp.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['amplitude', -8, 8, 0.1],
      ['centerX', 0, 1, 0.01],
      ['centerY', 0, 1, 0.01],
    ]);
    stage.say('The picture is turned around the centre, more the closer to it; amplitude sets how much (and which way).');
  } else {
    stage.frame((t) => {
      p.amplitude = sweep(t, -4, 4, 6);
      stage.say(`amplitude ${p.amplitude.toFixed(1)}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
