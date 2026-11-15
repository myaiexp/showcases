// Heatmaps: onHeatmapHover and onHeatmapClick report the pointer over a heatmap
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
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
  const stage = createStage(el, ctx, { hint: 'The heatmap brightens (higher saturation) while the pointer is over it. Click to name the nearest city.' });
  const dark = await texture('dark');
  // A WebGPU with no adapter draws blank heatmaps; this switches such pages to the CPU path.
  await heatmapBackend();
  const log = stage.bar && readout(stage.bar, 'Hover or click the globe');

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .heatmapsData([scatter(41, stage.preview ? 0.3 : 0.4)])
    .heatmapBandwidth(4)
    .heatmapColorSaturation(0.8)
    .heatmapsTransitionDuration(400)
    .onHeatmapHover((heatmap) => {
      globe.heatmapColorSaturation(heatmap ? 2.5 : 0.8);
      if (log) log.textContent = heatmap ? 'Pointer over the heatmap' : 'Pointer off the heatmap';
    })
    .onHeatmapClick((_heatmap, _event, { lat, lng }) => {
      const near = cities.reduce((a, b) => (dist(a, lat, lng) < dist(b, lat, lng) ? a : b));
      if (log) log.textContent = `Clicked ${lat.toFixed(1)}, ${lng.toFixed(1)}: nearest city is ${near.name}`;
    });
  globe.pointOfView({ lat: 25, lng: 40, altitude: 2.4 });

  if (stage.preview) {
    const ghost = stage.ghost(globe);
    const spots = [[30, 31], [40, 120], [20, 75], [48, 10]] as const;
    let i = 0;
    stage.every(4000, () => {
      const [lat, lng] = spots[i++ % spots.length]!;
      globe.pointOfView({ lat: lat - 5, lng, altitude: 2.4 }, 700);
      stage.after(900, () => ghost.at(lat, lng, 0.01));
      stage.after(2800, () => ghost.leave());
    });
  } else {
    globe.controls().autoRotate = false;
  }
  return stage.dispose;
};

function dist(c: City, lat: number, lng: number): number {
  return (c.lat - lat) ** 2 + ((c.lng - lng) * Math.cos((lat * Math.PI) / 180)) ** 2;
}

export default mount;
