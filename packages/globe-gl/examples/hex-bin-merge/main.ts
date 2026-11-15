// Hex Bin: hexBinMerge folds every hexagon into one three.js object for speed
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { checkbox, readout } from '../../shared/controls.ts';
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
  const stage = createStage(el, ctx, { hint: 'Merged or not, the picture is identical. Only the scene graph changes, and hover and click stop working when merged.' });
  const dark = await texture('dark');
  const log = stage.bar && readout(stage.bar, '');

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .hexBinPointsData(scatter(8, stage.preview ? 1.5 : 10))
    .hexBinResolution(3)
    .hexAltitude((h) => 0.01 + Math.sqrt((h as Hex).sumWeight) * 0.01)
    .hexTopColor((h) => heat((h as Hex).sumWeight))
    .hexSideColor((h) => heat((h as Hex).sumWeight))
    .hexBinMerge(true)
    .hexTransitionDuration(0);

  globe.pointOfView({ lat: 25, lng: 40, altitude: 2.3 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.6;

  // Counts the meshes in the scene to show what merging changes.
  const count = (): void => {
    let meshes = 0;
    globe.scene().traverse((o) => {
      if ((o as { isMesh?: boolean }).isMesh) meshes++;
    });
    if (log) log.textContent = `${globe.hexBinMerge() ? 'merged' : 'separate'}: ${meshes} meshes in the scene`;
  };
  stage.after(500, count);
  if (stage.bar) {
    checkbox(stage.bar, 'Merge hexagons', true, (on) => {
      globe.hexBinMerge(on);
      stage.after(300, count);
    });
  } else {
    stage.every(6000, () => globe.hexBinMerge(!globe.hexBinMerge()));
  }
  return stage.dispose;
};

export default mount;
