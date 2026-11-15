// Hex Bin: hexAltitude as a constant beside a function of sumWeight
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

interface Hex {
  sumWeight: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['hexAltitude(0.04)', 'hexAltitude(sqrt of sumWeight)'],
    hint: 'A constant gives equal slabs; a function of the hexagon’s aggregated data makes density visible as height.',
  });
  const dark = await texture('dark');
  const points = scatter(5, 3);

  [0.04, (h: object) => 0.01 + Math.sqrt((h as Hex).sumWeight) * 0.014].forEach((altitude, i) => {
    const globe = stage.own(new Globe(stage.panes[i]!.container), stage.panes[i])
      .globeImageUrl(dark)
      .hexBinPointsData(points)
      .hexBinResolution(2)
      .hexAltitude(altitude)
      .hexTopColor((h) => heat((h as Hex).sumWeight))
      .hexSideColor((h) => heat((h as Hex).sumWeight));
    globe.pointOfView({ lat: 25, lng: 40, altitude: 2.7 });
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.6;
  });
  return stage.dispose;
};

export default mount;
