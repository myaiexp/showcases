// VFX-JS: GradientMapEffect repeat modes, frequency and colour mixing space
import { VFX } from '@vfx-js/core';
import { GradientMapEffect, type GradientMapMixSpace, type GradientMapRepeat } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const REPEATS: GradientMapRepeat[] = ['none', 'repeat', 'mirror'];
const SPACES: GradientMapMixSpace[] = ['srgb', 'linear', 'oklab'];
const STEPS: [GradientMapRepeat, GradientMapMixSpace, number][] = [
  ['none', 'srgb', 1],
  ['repeat', 'srgb', 3],
  ['mirror', 'srgb', 3],
  ['mirror', 'oklab', 3],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('flowers', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const map = new GradientMapEffect({ colors: ['#00f5d4', '#3a0ca3', '#f72585', '#fee440'], frequency: 3 });
  await vfx.add(img, { effect: map });

  const p = map.params;
  const show = (): void => stage.say(`repeat "${p.repeat}", mixSpace "${p.mixSpace}", frequency ${p.frequency}`);
  if (stage.bar) {
    select(stage.bar, 'repeat', REPEATS.map((r) => [r, r] as const), (v) => ((p.repeat = v), show()), p.repeat);
    select(stage.bar, 'mixSpace', SPACES.map((s) => [s, s] as const), (v) => ((p.mixSpace = v), show()), p.mixSpace);
    slider(stage.bar, 'frequency', 1, 8, 0.5, p.frequency, (v) => ((p.frequency = v), show()));
    show();
  } else {
    stage.cycle(STEPS, 2500, ([repeat, mixSpace, frequency]) => {
      Object.assign(p, { repeat, mixSpace, frequency });
      show();
    });
  }
  return () => stage.dispose();
};

export default mount;
