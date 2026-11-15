// Hex Bin: hexTopColor and hexSideColor read a hexagon's points, weight and centre
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
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
  points: Spot[];
}

const tops = {
  'density': (h: object) => heat((h as Hex).sumWeight),
  // The hex object holds its points (and h3Idx), not the `center` the docs list: average the points.
  'latitude': (h: object) => {
    const { points } = h as Hex;
    const lat = points.reduce((s, p) => s + p.lat, 0) / points.length;
    return `hsl(${Math.round(200 - (lat + 40) * 2.2)}, 75%, 55%)`;
  },
  'mean weight': (h: object) => {
    const { points } = h as Hex;
    return heat((points.reduce((s, p) => s + p.w, 0) / points.length) ** 2);
  },
};
const sides = {
  'dark slate': () => '#24313f',
  'density': (h: object) => heat((h as Hex).sumWeight),
  'white': () => '#ffffff',
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The top colour and the side colour are separate functions of the hexagon.' });
  const dark = await texture('dark');

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .hexBinPointsData(scatter(6, 3))
    .hexBinResolution(2)
    .hexAltitude((h) => 0.02 + Math.sqrt((h as Hex).sumWeight) * 0.01)
    .hexMargin(0.1)
    .hexTopColor(tops.density)
    .hexSideColor(sides['dark slate'])
    .hexTransitionDuration(0);

  globe.pointOfView({ lat: 25, lng: 40, altitude: 2.2 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.5;

  const topNames = Object.keys(tops) as (keyof typeof tops)[];
  const sideNames = Object.keys(sides) as (keyof typeof sides)[];
  if (stage.bar) {
    select(stage.bar, 'Top colour', topNames, (v) => globe.hexTopColor(tops[v]));
    select(stage.bar, 'Side colour', sideNames, (v) => globe.hexSideColor(sides[v]), 'dark slate');
  } else {
    let i = 0;
    stage.every(2500, () => {
      i++;
      globe.hexTopColor(tops[topNames[i % topNames.length]!]).hexSideColor(sides[sideNames[i % sideNames.length]!]);
    });
  }
  return stage.dispose;
};

export default mount;
