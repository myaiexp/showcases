// custom effects in postEffect.effect, run over the whole canvas
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { sweep } from '../../shared/fx-params.ts';
import { postScene, stageCenter } from '../../shared/post-scene.ts';
import { createStage } from '../../shared/stage.ts';
import { StageVignetteEffect } from './stage-vignette-effect.ts';
import { WaveEffect } from './wave-effect.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const wave = new WaveEffect({ amount: 0.3 });
  // The canvas covers the window, so the vignette gets this stage's centre as uv.
  const vignette = new StageVignetteEffect(stageCenter(stage), { radius: ctx.preview ? 90 : 170 });
  const vfx = stage.own(new VFX({ ...stage.vfxOpts, postEffect: { effect: [wave, vignette] } }));
  await postScene(stage, vfx, 'city');

  if (stage.bar) {
    slider(stage.bar, 'wave.params.amount', 0, 1, 0.01, wave.params.amount, (v) => (wave.params.amount = v));
    slider(stage.bar, 'vignette.params.radius', 60, 400, 5, vignette.params.radius, (v) => (vignette.params.radius = v));
  } else {
    stage.frame((t) => (wave.params.amount = sweep(t, 0.05, 0.6, 6)));
  }
  stage.say('postEffect.effect takes an array: the wave reads the whole canvas, the vignette reads the wave.');
  return () => stage.dispose();
};

export default mount;
