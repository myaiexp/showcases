// Hex Bin: hexBinResolution sets the H3 level; hexagons shrink as it grows
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
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
  const stage = createStage(el, ctx, { hint: 'H3 resolution 0 tiles the globe with 122 cells; each step up cuts them to roughly a seventh.' });
  const dark = await texture('dark');

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .hexBinPointsData(scatter(3, 3))
    .hexBinResolution(1)
    .hexAltitude((h) => 0.01 + Math.sqrt((h as { sumWeight: number }).sumWeight) * 0.006)
    .hexTopColor((h) => heat((h as { sumWeight: number }).sumWeight))
    .hexSideColor((h) => heat((h as { sumWeight: number }).sumWeight))
    .hexTransitionDuration(0);

  globe.pointOfView({ lat: 25, lng: 40, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.6;

  const steps = [1, 2, 3, 4, 2];
  let i = 0;
  if (stage.bar) {
    slider(stage.bar, 'Resolution', 0, 4, 1, 1, (v) => globe.hexBinResolution(v));
  } else {
    stage.every(2500, () => globe.hexBinResolution(steps[++i % steps.length]!));
  }
  return stage.dispose;
};

export default mount;
