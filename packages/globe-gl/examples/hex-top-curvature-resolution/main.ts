// Hex Bin: hexTopCurvatureResolution, a coarse flat top beside a finely curved one
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

interface Hex {
  sumWeight: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['top resolution 60°', 'top resolution 3°'],
    hint: 'Resolution 0 hexagons are 1,100 km across. With a coarse top the lid is flat and the rim sinks below the curve of the globe.',
  });
  const dark = await texture('dark');
  const points = scatter(7, 3);

  const globes = [60, 3].map((res, i) => {
    const globe = stage.own(new Globe(stage.panes[i]!.container), stage.panes[i])
      .globeImageUrl(dark)
      .hexBinPointsData(points)
      .hexBinResolution(0)
      .hexAltitude((h) => 0.03 + Math.sqrt((h as Hex).sumWeight) * 0.004)
      .hexTopColor((h) => heat((h as Hex).sumWeight))
      .hexSideColor(() => '#24313f')
      .hexMargin(0.05)
      .hexTopCurvatureResolution(res);
    globe.pointOfView({ lat: 30, lng: 40, altitude: 2.1 });
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;
    return globe;
  });

  if (stage.bar) {
    slider(stage.bar, 'Left pane', 1, 90, 1, 60, (v) => {
      globes[0]!.hexTopCurvatureResolution(v);
      stage.panes[0]!.caption!.textContent = `top resolution ${v}°`;
    }, (v) => `${v}°`);
  }
  return stage.dispose;
};

export default mount;
