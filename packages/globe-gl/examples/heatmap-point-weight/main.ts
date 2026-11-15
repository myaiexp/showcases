// Heatmaps: heatmapPointWeight makes a point count more, against unit weights
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { cities, type City } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { heatmapBackend } from '../../shared/gpu.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['every weight 1', 'weight = population'],
    hint: 'One point per city. On the right each point counts as many times as its city has millions of people.',
  });
  const dark = await texture('dark');
  // A WebGPU with no adapter draws blank heatmaps; this switches such pages to the CPU path.
  await heatmapBackend();

  [false, true].forEach((weighted, i) => {
    const globe = stage.own(new Globe(stage.panes[i]!.container), stage.panes[i])
      .globeImageUrl(dark)
      .heatmapsData([cities])
      // Points are City objects, so the lat/lng accessors are attribute names.
      .heatmapPointLat('lat')
      .heatmapPointLng('lng')
      .heatmapPointWeight(weighted ? (p) => (p as City).pop : 1)
      .heatmapBandwidth(5);
    globe.pointOfView({ lat: 30, lng: 60, altitude: 2.6 });
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.7;
  });
  return stage.dispose;
};

export default mount;
