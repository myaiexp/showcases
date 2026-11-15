// Rings layer: ringsData with lat and lng, ripples spreading from each city
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each city sends out concentric rings, one every 0.7 seconds, until they reach the maximum radius.' });
  const dark = await texture('dark');

  // The default ringLat and ringLng read `lat` and `lng`, which every city has.
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .ringsData(cities.filter((c) => c.pop >= 10))
    // The defaults are small and slow (2 degrees at 1 degree a second); these suit a whole-globe view.
    .ringMaxRadius(6)
    .ringPropagationSpeed(5)
    .ringColor(() => '#ffd166');

  globe.pointOfView({ lat: 25, lng: 60, altitude: 2.3 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.6;

  return stage.dispose;
};

export default mount;
