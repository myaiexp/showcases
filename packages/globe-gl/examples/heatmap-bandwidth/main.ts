// Heatmaps: heatmapBandwidth sets how far each point spreads, in angular degrees
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cities, rng } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { heatmapBackend } from '../../shared/gpu.ts';

type Pt = [number, number];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A narrow bandwidth gives spikes at each point; a broad one blends neighbours into smooth hills.' });
  const dark = await texture('dark');
  // A WebGPU with no adapter draws blank heatmaps; this switches such pages to the CPU path.
  await heatmapBackend();

  // About 100 points: a few jittered copies of the biggest cities.
  const rand = rng(7);
  const points: Pt[] = cities.slice(0, 30).flatMap((c) =>
    Array.from({ length: Math.ceil(c.pop / 8) }, (): Pt => [c.lat + (rand() - 0.5) * 6, c.lng + (rand() - 0.5) * 6]),
  );

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .heatmapsData([points])
    .heatmapBandwidth(stage.preview ? 4 : 3)
    .heatmapsTransitionDuration(600);

  globe.pointOfView({ lat: 25, lng: 60, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.5;

  // Each change recomputes the density on the CPU, so cards step slowly.
  const widths = [4, 8, 12, 6];
  let i = 0;
  if (stage.bar) {
    slider(stage.bar, 'Bandwidth', 2, 14, 0.5, 3, (v) => globe.heatmapBandwidth(v), (v) => `${v}°`);
  } else {
    stage.every(4500, () => globe.heatmapBandwidth(widths[i++ % widths.length]!));
  }
  return stage.dispose;
};

export default mount;
