// Heatmaps: heatmapColorFn swaps the density-to-colour interpolator
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
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

// Each palette takes the normalised density (0 to 1, more with saturation) and returns a CSS colour.
const palettes = {
  fire: (t: number) => `rgba(255, ${Math.round(255 * t)}, ${Math.round(90 * t * t)}, ${Math.min(1, t * 1.6)})`,
  ice: (t: number) => `hsla(${200 + 40 * t}, 90%, ${35 + 55 * t}%, ${Math.min(1, t * 2)})`,
  bands: (t: number) => (t < 0.33 ? 'rgba(0, 220, 140, 0.35)' : t < 0.66 ? 'rgba(255, 220, 0, 0.6)' : 'rgba(255, 40, 80, 0.9)'),
};
type Name = keyof typeof palettes;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The colour function turns density into colour.' });
  const dark = await texture('dark');
  // A WebGPU with no adapter draws blank heatmaps; this switches such pages to the CPU path.
  await heatmapBackend();

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .heatmapsData([scatter(3, stage.preview ? 0.3 : 0.4)])
    .heatmapBandwidth(4)
    // heatmapColorFn is an accessor of the heatmap that returns the interpolator.
    .heatmapColorFn(() => palettes.fire);

  globe.pointOfView({ lat: 25, lng: 40, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.6;

  const names = Object.keys(palettes) as Name[];
  if (stage.bar) {
    select(stage.bar, 'Palette', names, (v) => globe.heatmapColorFn(() => palettes[v]));
  } else {
    let i = 0;
    stage.every(4500, () => globe.heatmapColorFn(() => palettes[names[++i % names.length]!]));
  }
  return stage.dispose;
};

export default mount;
