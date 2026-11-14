// VFX-JS: TritoneEffect maps a flower bed's brightness onto three colours
import { VFX } from '@vfx-js/core';
import { TritoneEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { colorInput, slider } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('flowers', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // Three [r, g, b, a] colours for shadows, midtones and highlights. speed cycles the
  // mapping over time (the card runs at 0.3); 0 keeps it still.
  const tritone = new TritoneEffect({
    color1: [0.05, 0.02, 0.3, 1],
    color2: [0.9, 0.2, 0.5, 1],
    color3: [1, 0.9, 0.5, 1],
    speed: ctx.preview ? 0.3 : 0,
  });
  await vfx.add(img, { effect: tritone });

  const p = tritone.params;
  if (stage.bar) {
    colorInput(stage.bar, 'color1', '#0d054d', (c) => (p.color1 = c));
    colorInput(stage.bar, 'color2', '#e63380', (c) => (p.color2 = c));
    colorInput(stage.bar, 'color3', '#ffe680', (c) => (p.color3 = c));
    slider(stage.bar, 'speed', 0, 1, 0.01, p.speed, (v) => (p.speed = v));
    stage.say('Dark pixels get color1, mid pixels color2, light pixels color3.');
  } else {
    stage.say('speed 0.3 cycles the mapping');
  }
  return () => stage.dispose();
};

export default mount;
