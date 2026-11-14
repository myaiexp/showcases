// VFX-JS: WarpEffect types, sine wave, twist and ripple
import { VFX } from '@vfx-js/core';
import { WarpEffect, type WarpType } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { paramSliders } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const TYPES: WarpType[] = ['sine wave', 'twist', 'ripple'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('flowers', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // speed animates the two wave-based types (sine wave and ripple); a twist ignores it.
  const warp = new WarpEffect({ type: 'ripple', amplitude: 0.5, frequency: 4, speed: 1 });
  await vfx.add(img, { effect: warp });

  const p = warp.params;
  const show = (t: WarpType): void => {
    p.type = t;
    stage.say(`type "${t}"`);
  };
  if (stage.bar) {
    select(stage.bar, 'type', TYPES.map((t) => [t, t] as const), show, p.type);
    paramSliders(stage.bar, p, [
      ['amplitude', -4, 4, 0.05],
      ['frequency', 0.5, 12, 0.25],
      ['speed', 0, 4, 0.05],
      ['centerX', 0, 1, 0.01],
      ['centerY', 0, 1, 0.01],
    ]);
    show(p.type);
  } else {
    stage.cycle(TYPES, 2500, show);
  }
  return () => stage.dispose();
};

export default mount;
