// backgroundImageUrl: an equirectangular sky wrapped around the whole scene
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag: the stars are far away and move with the camera, not the globe.' });
  // Both images are painted in code: a starfield and the night side of the Earth.
  const [stars, night] = await Promise.all([texture('stars'), texture('night')]);

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(night)
    .backgroundImageUrl(stars)
    .atmosphereColor('#7aa7ff');
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 1.2;

  // A null URL goes back to the plain backgroundColor.
  if (stage.bar) checkbox(stage.bar, 'backgroundImageUrl', true, (on) => globe.backgroundImageUrl(on ? stars : null));

  return stage.dispose;
};

export default mount;
