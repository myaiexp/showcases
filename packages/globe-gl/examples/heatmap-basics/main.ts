// Heatmaps: heatmapsData with a plain list of [lat, lng] pairs and every default
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { cities, rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { heatmapBackend } from '../../shared/gpu.ts';

type Pt = [number, number];

// Gaussian clouds of points around the big cities: the same data on every mount.
function scatter(seed: number, perMillion: number): Pt[] {
  const rand = rng(seed);
  const gauss = (): number => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
  return cities.flatMap((c) =>
    Array.from({ length: Math.max(1, Math.round(c.pop * perMillion)) }, (): Pt => [
      c.lat + gauss() * 3,
      c.lng + (gauss() * 3) / Math.max(0.3, Math.cos((c.lat * Math.PI) / 180)),
    ]),
  );
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The whole heatmap is one Gaussian density surface over 200 points.' });
  const dark = await texture('dark');
  // A WebGPU with no adapter draws blank heatmaps; this switches such pages to the CPU path.
  await heatmapBackend();
  let seed = 1;

  // heatmapsData is a list of heatmaps; with the default accessors each one is
  // simply its own list of [lat, lng] pairs.
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .heatmapsData([scatter(seed, stage.preview ? 0.35 : 0.45)]);

  globe.pointOfView({ lat: 25, lng: 40, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.6;

  if (stage.bar) {
    button(stage.bar, 'New random points', () => globe.heatmapsData([scatter(++seed, 0.45)]));
  }
  return stage.dispose;
};

export default mount;
