// VFX-JS example: timeScale slows, pauses or reverses the clock behind `time`
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts, timeScale: 1 }));
  await vfx.add(img, { shader: 'sinewave' });

  const set = (v: number): void => {
    // 1 is realtime, 0.5 half speed, 0 pauses (frames still render), negative runs backward.
    vfx.timeScale = v;
    stage.say(`vfx.timeScale = ${v}; time = ${vfx.time.toFixed(1)} s`);
  };
  if (stage.bar) {
    slider(stage.bar, 'timeScale', -2, 3, 0.1, 1, set);
    stage.every(250, () => stage.say(`vfx.timeScale = ${vfx.timeScale}; time = ${vfx.time.toFixed(1)} s`));
  } else {
    stage.cycle([1, 3, 0, -1], 1800, set);
  }
  return () => stage.dispose();
};

export default mount;
