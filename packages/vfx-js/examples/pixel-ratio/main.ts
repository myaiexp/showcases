// the pixelRatio option renders at a lower resolution for slow devices
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const w = ctx.preview ? 110 : 280;
  const sharp = await picture('poster', w);
  const coarse = await picture('poster', w);
  stage.root.append(sharp, coarse);

  // Two VFX, each with its own canvas: one at the stage's pixel ratio, one at a quarter.
  const full = stage.own(new VFX({ ...stage.vfxOpts }));
  const quarter = stage.own(new VFX({ ...stage.vfxOpts, pixelRatio: 0.25 }));
  await full.add(sharp, { shader: 'sinewave' });
  await quarter.add(coarse, { shader: 'sinewave' });
  stage.say(`left: pixelRatio ${stage.vfxOpts.pixelRatio}, right: pixelRatio 0.25 (a sixteenth of the pixels)`);
  return () => stage.dispose();
};

export default mount;
