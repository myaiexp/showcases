// ctx.draw with an EffectGeometry of points and a custom vertex shader
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';
import { DotsEffect } from './dots-effect.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('flowers', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const dots = new DotsEffect({ columns: 24 });
  await vfx.add(img, { effect: dots });

  if (stage.bar) {
    slider(stage.bar, 'params.columns', 6, 60, 1, dots.params.columns, (v) => (dots.params.columns = v));
    stage.say('Not the default quad: a Float32Array of points, a vertex shader that samples src for each one, and releaseGeometry when the grid changes.');
  } else {
    stage.cycle([10, 18, 30, 18], 2200, (n) => (dots.params.columns = n));
    stage.say('geometry: { mode: "points" }');
  }
  return () => stage.dispose();
};

export default mount;
