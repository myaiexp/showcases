// Heatmaps: heatmapsTransitionDuration eases colours and heights on change
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
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
  points: Pt[];
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The points are re-rolled every five seconds; the surface morphs between the two densities.' });
  const dark = await texture('dark');
  // A WebGPU with no adapter draws blank heatmaps; this switches such pages to the CPU path.
  await heatmapBackend();

  // One long-lived dataset object: the layer morphs it instead of replacing it.
  const layer: Layer = { points: scatter(31, stage.preview ? 0.25 : 0.35) };
  let round = 31;
  const change = (): void => {
    layer.points = scatter(++round, stage.preview ? 0.25 : 0.35);
    globe.heatmapsData([layer]);
  };

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .heatmapsData([layer])
    .heatmapPoints('points')
    .heatmapBandwidth(4)
    .heatmapTopAltitude(0.2)
    .heatmapsTransitionDuration(2000);

  globe.pointOfView({ lat: 15, lng: 40, altitude: 2.3 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.5;

  stage.every(5000, change);
  if (stage.bar) {
    slider(stage.bar, 'Transition', 0, 4000, 100, 2000, (v) => globe.heatmapsTransitionDuration(v), (v) => `${v} ms`);
    button(stage.bar, 'Re-roll now', change);
  }
  return stage.dispose;
};

export default mount;
