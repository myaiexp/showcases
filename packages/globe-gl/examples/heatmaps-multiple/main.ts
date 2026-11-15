// Heatmaps: heatmapsData with two datasets, each with own bandwidth and colours
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
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

interface Layer {
  name: string;
  points: Pt[];
  bandwidth: number;
  color: (t: number) => string;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two heatmaps share the globe: Americas in blue (wide), Eurasia and Africa in orange (tight).' });
  const dark = await texture('dark');
  // A WebGPU with no adapter draws blank heatmaps; this switches such pages to the CPU path.
  await heatmapBackend();
  const k = stage.preview ? 0.3 : 0.4;

  const layers: Layer[] = [
    { name: 'Americas', points: scatter(21, k, (c) => c.lng < -30), bandwidth: 6, color: (t) => `hsla(${210 - 30 * t}, 90%, ${40 + 40 * t}%, ${Math.min(1, t * 1.8)})` },
    { name: 'Old World', points: scatter(22, k, (c) => c.lng >= -30), bandwidth: 4, color: (t) => `rgba(255, ${Math.round(220 * t)}, 40, ${Math.min(1, t * 1.8)})` },
  ];

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .heatmapsData(layers)
    // Each datum is an object, so the accessors read its fields.
    .heatmapPoints('points')
    .heatmapBandwidth((d) => (d as Layer).bandwidth)
    .heatmapColorFn((d: object) => (d as Layer).color);

  globe.pointOfView({ lat: 20, lng: -20, altitude: 3 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.9;
  return stage.dispose;
};

export default mount;
