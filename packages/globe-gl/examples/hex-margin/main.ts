// Hex Bin: hexMargin as a constant or as a function of each hexagon's data
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
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
  const stage = createStage(el, ctx, { hint: 'Margin is a fraction of the hexagon diameter. The function mode shrinks busy hexagons the most.' });
  const dark = await texture('dark');

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .hexBinPointsData(scatter(4, 3))
    .hexBinResolution(2)
    .hexAltitude((h) => 0.02 + Math.sqrt((h as Hex).sumWeight) * 0.008)
    .hexTopColor((h) => heat((h as Hex).sumWeight))
    .hexSideColor((h) => heat((h as Hex).sumWeight))
    .hexMargin(0.2)
    .hexTransitionDuration(0);

  globe.pointOfView({ lat: 30, lng: 40, altitude: 2.2 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.5;

  const byCount = (h: object): number => Math.min(0.8, ((h as Hex).sumWeight / 60) * 0.8);
  if (stage.bar) {
    const sl = slider(stage.bar, 'Constant margin', 0, 0.9, 0.05, 0.2, (v) => globe.hexMargin(v), (v) => v.toFixed(2));
    select(stage.bar, 'Margin', ['constant (slider)', 'function of sumWeight'] as const, (v) => {
      globe.hexMargin(v === 'constant (slider)' ? Number(sl.value) : byCount);
    });
  } else {
    const steps: (number | ((h: object) => number))[] = [0, 0.2, 0.5, byCount];
    let i = 0;
    stage.every(2200, () => globe.hexMargin(steps[++i % steps.length]!));
  }
  return stage.dispose;
};

export default mount;
