// PixelSortEffect, a threshold sort that streaks the bright parts of flowers
import { VFX } from '@vfx-js/core';
import { PixelSortEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('flowers', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // Only pixels whose brightness lies inside `range` are sorted; they are reordered along
  // each column, so the bright ones smear toward one end (direction "up" by default).
  const sort = new PixelSortEffect({ range: [0.3, 1], sortRes: ctx.preview ? 96 : 192 });
  await vfx.add(img, { effect: sort });

  const p = sort.params;
  if (stage.bar) {
    slider(stage.bar, 'range low', 0, 1, 0.01, p.range[0], (v) => (p.range[0] = v));
    slider(stage.bar, 'range high', 0, 1, 0.01, p.range[1], (v) => (p.range[1] = v));
    slider(stage.bar, 'sortRes', 16, 512, 16, p.sortRes, (v) => (p.sortRes = v));
    checkbox(stage.bar, 'bypass', p.bypass, (v) => (p.bypass = v));
    stage.say('Pixels inside the range are sorted by brightness along the axis; the rest stay where they are.');
  } else {
    stage.frame((t) => {
      p.range[0] = sweep(t, 0.15, 0.7, 7);
      stage.say(`range ${p.range[0].toFixed(2)} to ${p.range[1]}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
