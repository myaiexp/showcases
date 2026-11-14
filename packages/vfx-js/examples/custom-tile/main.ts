// ctx.wrapTexture on a canvas with autoUpdate off, texture.update()
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';
import { TileEffect } from './tile-effect.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the picture, or press the button' });
  const img = await picture('flowers', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const tiles = new TileEffect();
  await vfx.add(img, { effect: tiles });

  if (stage.bar) {
    button(stage.bar, 'tiles.shuffle()', () => tiles.shuffle());
    img.addEventListener('click', () => tiles.shuffle());
    img.style.cursor = 'pointer';
    stage.say('An 8x4 canvas, wrapped with autoUpdate: false, tints the picture. It uploads again only when shuffle() calls texture.update().');
  } else {
    stage.every(1400, () => tiles.shuffle());
    stage.say('shuffle() every 1.4 s; between them no upload');
  }
  return () => stage.dispose();
};

export default mount;
