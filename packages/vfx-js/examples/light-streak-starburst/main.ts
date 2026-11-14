// LightStreakEffect as a starburst, with rotation, dispersion and fringes
import { VFX } from '@vfx-js/core';
import { LightStreakEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('city', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // streaks: n is an n-pointed aperture starburst. dispersion colours the tips and fringe
  // adds rainbow bands along each ray.
  const length = ctx.preview ? 60 : 140;
  const star = new LightStreakEffect({
    streaks: 6,
    length,
    pad: length,
    threshold: 0.6,
    intensity: 1.5,
    dispersion: 0.6,
    fringe: 0.7,
    fringeCount: 2.5,
    width: 2.5,
  });
  await vfx.add(img, { effect: star });

  const p = star.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['streaks', 2, 12, 1],
      ['angle', 0, 180, 1],
      ['dispersion', -1, 1, 0.05],
      ['fringe', 0, 1, 0.05],
      ['fringeCount', 0.5, 6, 0.1],
    ]);
    stage.say('6 streaks make a six-pointed star. The tips fringe through colour as dispersion and fringe rise.');
  } else {
    stage.frame((t) => {
      p.angle = (t * 12) % 180;
      stage.say(`angle ${p.angle.toFixed(0)} degrees`);
    });
  }
  return () => stage.dispose();
};

export default mount;
