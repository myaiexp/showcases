// Hex Bin: hexBinPointWeight sums a magnitude instead of counting points
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { cities, rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Spot {
  lat: number;
  lng: number;
  /** A magnitude of 1, 4, 7 or 10, set by the city the point belongs to. */
  w: number;
}

// Gaussian clouds around the big cities, the same on every mount.
function scatter(seed: number, perMillion: number, spread = 3): Spot[] {
  const rand = rng(seed);
  const gauss = (): number => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
  return cities.flatMap((c, ci) =>
    Array.from({ length: Math.max(1, Math.round(c.pop * perMillion)) }, (): Spot => ({
      lat: c.lat + gauss() * spread,
      lng: c.lng + (gauss() * spread) / Math.max(0.3, Math.cos((c.lat * Math.PI) / 180)),
      w: 1 + (ci % 4) * 3,
    })),
  );
}

// Colour ramp over a hex's summed weight.
const heat = (sumWeight: number): string => `hsl(${Math.round(200 - 190 * Math.min(1, Math.sqrt(sumWeight) / 10))}, 80%, 55%)`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['weight 1 (a count)', 'weight = w (1 to 10)'],
    hint: 'The same points. Hexagons sum their weights, and the default altitude is the sum times 0.01.',
  });
  const dark = await texture('dark');
  const points = scatter(2, 1.5);

  [1, 'w'].forEach((weight, i) => {
    const globe = stage.own(new Globe(stage.panes[i]!.container), stage.panes[i])
      .globeImageUrl(dark)
      .hexBinPointsData(points)
      .hexBinResolution(2)
      // A constant, or an attribute name read from each point.
      .hexBinPointWeight(weight)
      .hexAltitude((h) => (h as { sumWeight: number }).sumWeight * (i ? 0.002 : 0.01))
      .hexTopColor((h) => heat((h as { sumWeight: number }).sumWeight * (i ? 0.2 : 1)))
      .hexSideColor((h) => heat((h as { sumWeight: number }).sumWeight * (i ? 0.2 : 1)));
    globe.pointOfView({ lat: 25, lng: 40, altitude: 2.7 });
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.6;
  });
  return stage.dispose;
};

export default mount;
