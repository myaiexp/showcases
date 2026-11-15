// Heatmaps: heatmapColorSaturation scales density before colouring
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cities, rng, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { heatmapBackend } from '../../shared/gpu.ts';

type Pt = [number, number];

// Gaussian clouds of points around the big cities: the same data on every mount.
function scatter(seed: number, perMillion: number, pick: (c: City) => boolean = () => true): Pt[] {
  const rand = rng(seed);
  const gauss = (): number => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
  return cities.filter(pick).flatMap((c) =>
    Array.from({ length: Math.max(1, Math.round(c.pop * perMillion)) }, (): Pt => [
      c.lat + gauss() * 3,
      c.lng + (gauss() * 3) / Math.max(0.3, Math.cos((c.lat * Math.PI) / 180)),
    ]),
  );
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Low saturation keeps only the strongest peaks in colour; high saturation lights up the faint outskirts too.' });
  const dark = await texture('dark');
  // A WebGPU with no adapter draws blank heatmaps; this switches such pages to the CPU path.
  await heatmapBackend();

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .heatmapsData([scatter(5, stage.preview ? 0.2 : 0.4)])
    .heatmapBandwidth(stage.preview ? 6 : 4)
    .heatmapColorSaturation(1.5)
    .heatmapsTransitionDuration(800);

  globe.pointOfView({ lat: 25, lng: 40, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.6;

  const values = [0.5, 3, 6, 1.5];
  let i = 0;
  if (stage.bar) {
    slider(stage.bar, 'Saturation', 0.3, 8, 0.1, 1.5, (v) => globe.heatmapColorSaturation(v), (v) => v.toFixed(1));
  } else {
    stage.every(4000, () => globe.heatmapColorSaturation(values[i++ % values.length]!));
  }
  return stage.dispose;
};

export default mount;
