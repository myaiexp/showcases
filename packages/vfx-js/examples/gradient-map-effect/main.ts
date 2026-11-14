// VFX-JS: GradientMapEffect recolours a landscape along a colour gradient
import { VFX } from '@vfx-js/core';
import { GradientMapEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { colorInput } from '../../shared/controls.ts';
import { paramSliders } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const STOPS = ['#10002b', '#c9184a', '#ffd166'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // colors are 2 to 8 hex stops spread evenly over the brightness range, dark to light.
  // speed slides the lookup along the gradient over time, so the card moves on its own.
  const map = new GradientMapEffect({ colors: [...STOPS], speed: ctx.preview ? 0.15 : 0, repeat: 'repeat' });
  await vfx.add(img, { effect: map });

  const p = map.params;
  if (stage.bar) {
    STOPS.forEach((hex, i) => {
      colorInput(stage.bar!, `stop ${i + 1}`, hex, () => undefined).addEventListener('input', (e) => {
        p.colors = p.colors.map((c, j) => (j === i ? (e.target as HTMLInputElement).value : c));
      });
    });
    paramSliders(stage.bar, p, [
      ['offset', 0, 1, 0.01],
      ['scatter', 0, 1, 0.01],
      ['speed', -1, 1, 0.01],
    ]);
    stage.say('Each pixel\'s brightness is looked up on the gradient: dark pixels get stop 1, bright ones the last stop.');
  } else {
    stage.say('speed 0.15 slides the gradient');
  }
  return () => stage.dispose();
};

export default mount;
