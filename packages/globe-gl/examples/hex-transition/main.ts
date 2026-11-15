// Hex Bin: hexTransitionDuration grows and shrinks hexagons when the points change
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
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
  const stage = createStage(el, ctx, { hint: 'The points are re-scattered every four seconds. Hexagons that persist glide to their new height; new ones grow from the ground.' });
  const dark = await texture('dark');

  let round = 8;
  const next = (): void => {
    // A different density each round, so the heights visibly change.
    globe.hexBinPointsData(scatter(++round, 1.5 + (round % 3) * 1.2));
  };

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .hexBinPointsData(scatter(round, 2))
    .hexBinResolution(2)
    .hexAltitude((h) => 0.01 + Math.sqrt((h as Hex).sumWeight) * 0.015)
    .hexTopColor((h) => heat((h as Hex).sumWeight))
    .hexSideColor((h) => heat((h as Hex).sumWeight))
    .hexTransitionDuration(1500);

  globe.pointOfView({ lat: 25, lng: 40, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.5;

  stage.every(4000, next);
  if (stage.bar) {
    slider(stage.bar, 'Transition', 0, 4000, 100, 1500, (v) => globe.hexTransitionDuration(v), (v) => `${v} ms`);
    button(stage.bar, 'Re-scatter now', next);
  }
  return stage.dispose;
};

export default mount;
