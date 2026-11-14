// a class implementing Effect, with update, render and a params object
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';
import { WaveEffect } from './wave-effect.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const wave = new WaveEffect({ amount: 1 });
  // An instance goes in the `effect` option; an array would run as a chain.
  await vfx.add(img, { effect: wave });

  if (stage.bar) {
    slider(stage.bar, 'params.amount', 0, 3, 0.05, wave.params.amount, (v) => (wave.params.amount = v));
    stage.say('The slider writes wave.params.amount; update() eases the wave toward it and render() draws it.');
  } else {
    stage.frame((t) => (wave.params.amount = sweep(t, 0, 3, 6)));
    stage.say('params.amount swings between 0 and 3');
  }
  return () => stage.dispose();
};

export default mount;
