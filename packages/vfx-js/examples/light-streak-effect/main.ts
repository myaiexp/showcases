// LightStreakEffect throws anamorphic streaks from the city's bright lights
import { VFX } from '@vfx-js/core';
import { LightStreakEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('city', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // streaks: 2 is one horizontal axis. pad (CSS px, at least `length`) is the room the
  // streaks get outside the picture; effects ignore `overflow`.
  const length = ctx.preview ? 70 : 180;
  const streak = new LightStreakEffect({ streaks: 2, length, pad: length, threshold: 0.55, intensity: 1.2, width: 3 });
  await vfx.add(img, { effect: streak });

  const p = streak.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['threshold', 0, 1, 0.01],
      ['intensity', 0, 4, 0.05],
      ['length', 20, length, 5],
      ['width', 1, 12, 0.5],
      ['falloff', 0.2, 6, 0.1],
    ]);
    stage.say('Pixels above the threshold become the source of a horizontal streak that fades out along its length.');
  } else {
    stage.frame((t) => {
      p.threshold = sweep(t, 0.4, 0.8, 6);
      stage.say(`threshold ${p.threshold.toFixed(2)}`);
    });
  }
  return () => stage.dispose();
};

export default mount;
