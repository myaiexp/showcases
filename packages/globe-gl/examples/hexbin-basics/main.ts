// Hex Bin: hexBinPointsData bins points into prisms, taller with more points
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { cities, rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Spot {
  lat: number;
  lng: number;
  /** A magnitude from 1 to 9. */
  w: number;
}

// Gaussian clouds around the big cities, the same on every mount.
function scatter(seed: number, perMillion: number, spread = 3): Spot[] {
  const rand = rng(seed);
  const gauss = (): number => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
  return cities.flatMap((c) =>
    Array.from({ length: Math.max(1, Math.round(c.pop * perMillion)) }, (): Spot => ({
      lat: c.lat + gauss() * spread,
      lng: c.lng + (gauss() * spread) / Math.max(0.3, Math.cos((c.lat * Math.PI) / 180)),
      w: 1 + Math.floor(rand() * 9),
    })),
  );
}

// Colour ramp over a hex's summed weight.
const heat = (sumWeight: number): string => `hsl(${Math.round(200 - 190 * Math.min(1, Math.sqrt(sumWeight) / 10))}, 80%, 55%)`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'About 1,900 points; each hexagon rises 0.01 globe radii per point inside it (the default altitude).' });
  const dark = await texture('dark');

  // Points read `lat` and `lng`; every point has weight 1, so sumWeight is the count.
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .hexBinPointsData(scatter(1, 4))
    .hexBinResolution(2);

  globe.pointOfView({ lat: 25, lng: 40, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.6;
  return stage.dispose;
};

export default mount;
