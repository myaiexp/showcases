// VFX-JS: one effect instance per element, two elements on one VFX
import { VFX } from '@vfx-js/core';
import { PixelateEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const w = ctx.preview ? 94 : 200;
  const [left, right] = await Promise.all([picture('portrait', w), picture('flowers', w)]);
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:8px;';
  row.append(left, right);
  stage.root.append(row);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // An effect object holds the state of one element (params, and for many effects GPU
  // buffers), so each element gets its own instance, here with its own size.
  const a = new PixelateEffect({ size: 6 });
  const b = new PixelateEffect({ size: 16 });
  await Promise.all([vfx.add(left, { effect: a }), vfx.add(right, { effect: b })]);

  if (stage.bar) {
    slider(stage.bar, 'left size', 1, 40, 1, a.params.size, (v) => (a.params.size = v));
    slider(stage.bar, 'right size', 1, 40, 1, b.params.size, (v) => (b.params.size = v));
    stage.say('Two elements, two PixelateEffect instances: each slider changes only its own picture.');
  } else {
    stage.frame((t) => {
      a.params.size = Math.round(sweep(t, 2, 12, 5));
      b.params.size = Math.round(sweep(t + 2.5, 2, 12, 5));
      stage.say(`sizes ${a.params.size} and ${b.params.size}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
