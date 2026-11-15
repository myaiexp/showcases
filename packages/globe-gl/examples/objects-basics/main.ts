// Objects: without objectThreeObject each datum is a translucent yellow sphere
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Site {
  name: string;
  lat: number;
  lng: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The default sphere is one unit wide on a globe of radius 100, so it only shows up close. Hover one for its name.' });
  const dark = await texture('dark');

  // Objects read `lat`, `lng` and `name` by default (the name is the tooltip).
  const rand = rng(11);
  const sites: Site[] = Array.from({ length: stage.preview ? 14 : 24 }, (_, i) => ({
    name: `Site ${i + 1}`,
    lat: 36 + rand() * 24,
    lng: -10 + rand() * 40,
  }));

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .objectsData(sites);

  globe.pointOfView({ lat: 48, lng: 10, altitude: 0.5 });
  if (stage.preview) {
    stage.loop((_dt, t) => globe.pointOfView({ lat: 48, lng: 10 + 8 * Math.sin(t * 0.5), altitude: 0.5 }));
  }

  return stage.dispose;
};

export default mount;
