// VFX-JS: HalftoneEffect in RGB mode, a dot screen with live size and angle
import { VFX } from '@vfx-js/core';
import { HalftoneEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('portrait', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // RGB mode is additive: a red, a green and a blue dot screen on a dark backdrop.
  const halftone = new HalftoneEffect({ mode: 'rgb', gridSize: ctx.preview ? 6 : 10, background: [0, 0, 0, 1] });
  await vfx.add(img, { effect: halftone });

  const p = halftone.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['gridSize', 3, 30, 1],
      ['dotSize', 0.2, 1.6, 0.05],
      ['smoothing', 0, 1, 0.01],
      ['angle', 0, 90, 1],
    ]);
    stage.say('Each colour channel becomes a grid of dots whose size follows how much of that channel is there.');
  } else {
    stage.frame((t) => {
      p.angle = sweep(t, 0, 60, 8);
      stage.say(`angle ${p.angle.toFixed(0)} degrees`);
    });
  }
  return () => stage.dispose();
};

export default mount;
