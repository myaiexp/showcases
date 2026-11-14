// VFX-JS: PixelSortEffect with a chosen sort key, direction and axis angle
import { VFX } from '@vfx-js/core';
import { PixelSortEffect, type PixelSortDirection, type PixelSortKey } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const KEYS: PixelSortKey[] = ['luminance', 'r', 'g', 'b', 'hue', 'saturation'];
const DIRS: PixelSortDirection[] = ['up', 'down', 'left', 'right'];
const STEPS: [PixelSortKey, PixelSortDirection, number][] = [
  ['luminance', 'up', 0],
  ['hue', 'left', 0],
  ['saturation', 'down', 30],
  ['r', 'right', 60],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // key picks what is ranked, direction where the high end goes, and a non-zero angle
  // sorts along a tilted axis (the sort is wrapped in a rotate-in and rotate-out pass).
  const sort = new PixelSortEffect({ range: [0.25, 1], sortRes: ctx.preview ? 96 : 192 });
  await vfx.add(img, { effect: sort });

  const p = sort.params;
  const show = (): void => stage.say(`key "${p.key}", direction "${p.direction}", angle ${p.angle}`);
  if (stage.bar) {
    select(stage.bar, 'key', KEYS.map((k) => [k, k] as const), (v) => ((p.key = v), show()), p.key);
    select(stage.bar, 'direction', DIRS.map((d) => [d, d] as const), (v) => ((p.direction = v), show()), p.direction);
    slider(stage.bar, 'angle', 0, 180, 1, p.angle, (v) => ((p.angle = v), show()));
    show();
  } else {
    stage.cycle(STEPS, 2500, ([key, direction, angle]) => {
      Object.assign(p, { key, direction, angle });
      show();
    });
  }
  return () => stage.dispose();
};

export default mount;
