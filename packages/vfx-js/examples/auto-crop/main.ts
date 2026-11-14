// autoCrop on and off with a preset that samples outside the element
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const w = ctx.preview ? 110 : 260;
  const cropped = await picture('flowers', w);
  const uncropped = await picture('flowers', w);
  stage.root.style.gap = ctx.preview ? '14px' : '48px';
  stage.root.append(cropped, uncropped);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // "spring" zooms the picture out and in, so it reads outside 0..1 at the edges.
  // Presets cut that area off while autoCrop is true (the default); with false the
  // texture's default "repeat" wrap shows there.
  await vfx.add(cropped, { shader: 'spring', autoCrop: true });
  await vfx.add(uncropped, { shader: 'spring', autoCrop: false });
  stage.say('left: autoCrop: true (default), right: autoCrop: false');
  return () => stage.dispose();
};

export default mount;
