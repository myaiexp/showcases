// a persistent render target as a feedback trail, drawn outside the element
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';
import { TrailEffect } from './trail-effect.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  // The trail leaves the picture by 60px on every side, so the scene needs that room.
  const img = await picture('poster', ctx.preview ? 120 : 300);
  img.style.margin = '60px';
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  await vfx.add(img, { effect: new TrailEffect() });
  stage.say('A persistent target keeps the last frame, fades it and draws the picture over it, 60px past the picture\'s box.');
  return () => stage.dispose();
};

export default mount;
