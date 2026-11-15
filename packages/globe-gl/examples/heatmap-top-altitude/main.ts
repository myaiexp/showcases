// Heatmaps: heatmapBaseAltitude and heatmapTopAltitude make density a 3D surface
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
  const stage = createStage(el, ctx, { hint: 'Density maps to height between the base and the top altitude. Equal values give a flat heatmap.' });
  const dark = await texture('dark');
  // A WebGPU with no adapter draws blank heatmaps; this switches such pages to the CPU path.
  await heatmapBackend();

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .heatmapsData([scatter(11, stage.preview ? 0.2 : 0.4)])
    .heatmapBandwidth(stage.preview ? 6 : 4)
    .heatmapBaseAltitude(0.01)
    .heatmapTopAltitude(0.25)
    .heatmapsTransitionDuration(stage.preview ? 0 : 800);

  // A low camera shows the relief against the horizon.
  globe.pointOfView({ lat: 15, lng: 50, altitude: 2.2 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.6;

  const tops = [0.01, 0.4, 0.15, 0.25];
  let i = 0;
  if (stage.bar) {
    slider(stage.bar, 'Base altitude', 0, 0.1, 0.005, 0.01, (v) => globe.heatmapBaseAltitude(v), (v) => v.toFixed(3));
    slider(stage.bar, 'Top altitude', 0, 0.5, 0.01, 0.25, (v) => globe.heatmapTopAltitude(v), (v) => v.toFixed(2));
  } else {
    stage.every(4500, () => globe.heatmapTopAltitude(tops[i++ % tops.length]!));
  }
  return stage.dispose;
};

export default mount;
