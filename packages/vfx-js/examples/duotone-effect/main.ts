// VFX-JS: DuotoneEffect maps a portrait's brightness onto two colours
import { VFX } from '@vfx-js/core';
import { DuotoneEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { colorInput, slider } from '../../shared/controls.ts';
import { sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('portrait', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // Colours are [r, g, b, a] in 0..1. speed cycles the mapping over time; 0 keeps it still.
  const duotone = new DuotoneEffect({ color1: [0.1, 0.0, 0.35, 1], color2: [1, 0.55, 0.2, 1], speed: 0 });
  await vfx.add(img, { effect: duotone });

  const p = duotone.params;
  if (stage.bar) {
    colorInput(stage.bar, 'shadows (color1)', '#1a0059', (c) => (p.color1 = c));
    colorInput(stage.bar, 'highlights (color2)', '#ff8c33', (c) => (p.color2 = c));
    slider(stage.bar, 'speed', 0, 1, 0.01, p.speed, (v) => (p.speed = v));
    stage.say('Dark pixels get color1, light pixels color2, everything between is a blend.');
  } else {
    stage.frame((t) => {
      p.color2 = [1, sweep(t, 0.2, 0.9, 5), sweep(t + 2, 0.1, 0.6, 7), 1];
      stage.say('color2 changes over time');
    });
  }
  return () => stage.dispose();
};

export default mount;
