// globeImageUrl: swap the equirectangular image that wraps the globe
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture, type TextureKind } from '../../shared/textures.ts';

const SKINS = ['day', 'night', 'dark', 'atlas'] as const satisfies readonly TextureKind[];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Four images, each painted in code from the same Natural Earth outlines.' });
  const urls = await Promise.all(SKINS.map((k) => texture(k)));

  const globe = stage.own(new Globe(stage.container)).globeImageUrl(urls[0]!);
  globe.controls().autoRotate = true;

  const show = (i: number): void => void globe.globeImageUrl(urls[i]!);
  if (stage.bar) select(stage.bar, 'globeImageUrl', SKINS, (k) => show(SKINS.indexOf(k)));
  else {
    let i = 0;
    stage.every(1800, () => show(++i % SKINS.length));
  }
  // With no image at all (null) the globe is a black sphere.

  return stage.dispose;
};

export default mount;
