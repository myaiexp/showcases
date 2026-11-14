// VFX-JS: ParticleExplodeEffect shatters a poster into one burst of particles
import { VFX } from '@vfx-js/core';
import { ParticleExplodeEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { paramSliders } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the picture to burst it; Reset brings it back.' });
  const img = await picture('poster', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // Until trigger() the element shows as it is. trigger() shatters it into particles for
  // `duration` seconds; the picture stays gone until reset().
  const boom = new ParticleExplodeEffect({ count: ctx.preview ? 40000 : 150000, duration: 1.4, pointSize: ctx.preview ? 2 : 3 });
  await vfx.add(img, { effect: boom });

  const burst = (): void => {
    boom.reset();
    boom.trigger();
    stage.say('trigger(): the picture shatters');
  };
  if (stage.bar) {
    img.style.cursor = 'pointer';
    img.addEventListener('click', burst);
    button(stage.bar, 'Burst', burst);
    button(stage.bar, 'Reset', () => {
      boom.reset();
      stage.say('reset(): the picture is back');
    });
    paramSliders(stage.bar, boom.params, [
      ['duration', 0.3, 4, 0.1],
      ['noiseSpeed', 0, 4, 0.1],
      ['outwardBias', 0, 4, 0.1],
      ['pointSize', 1, 10, 0.5],
      ['trailFade', 0, 0.95, 0.01],
    ]);
  } else {
    // A card has no pointer to click with: burst on a timer, wait for isDone(), reset.
    stage.play(async (wait) => {
      boom.reset();
      stage.say('whole again');
      await wait(1500);
      boom.trigger();
      stage.say('trigger()');
      await wait(800);
      while (!boom.isDone()) await wait(200);
      stage.say('isDone() is true');
      await wait(600);
    });
  }
  return () => stage.dispose();
};

export default mount;
