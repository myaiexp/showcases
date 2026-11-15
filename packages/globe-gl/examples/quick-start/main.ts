// Quick start: new Globe(element), a globe image and a points layer, the README's first lines
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to rotate, scroll to zoom. Hover a column for its city.' });
  // The docs' myImageUrl: an equirectangular image, painted in code so nothing is fetched.
  const myImageUrl = await texture('day');

  // Points read `lat` and `lng` by default, and their tooltip reads `name`.
  const myData = cities;

  const myGlobe = stage.own(new Globe(stage.container))
    .globeImageUrl(myImageUrl)
    .pointsData(myData);

  // Spin slowly so the card shows every side.
  myGlobe.controls().autoRotate = true;
  myGlobe.controls().autoRotateSpeed = 0.6;

  return stage.dispose;
};

export default mount;
