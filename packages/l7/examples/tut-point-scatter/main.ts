// A scatter plot: equal-size dots colored by magnitude along a 10-step ramp
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { quakes, drift } from '../../shared/point-data.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [30, 38], zoom: ctx.preview ? 1.8 : 2.6 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  // The tutorial fetches a CSV with Longitude, Latitude and Magnitude columns; this builds the same text.
  const rows = quakes(ctx.preview ? 120 : 400, { spread: 4 });
  const csv = ['Longitude,Latitude,Magnitude', ...rows.map((p) => `${p.lng},${p.lat},${p.mag}`)].join('\n');
  const layer = new PointLayer()
    .source(csv, { parser: { type: 'csv', x: 'Longitude', y: 'Latitude' } })
    .shape('circle')
    .size(ctx.preview ? 3 : 5)
    .color('Magnitude', ['#0A3663', '#1558AC', '#3771D9', '#4D89E5', '#64A5D3', '#72BED6', '#83CED6', '#A6E1E0', '#B8EFE2', '#D7F9F0']);
  scene.addLayer(layer);

  if (stage.preview) drift(stage, scene, [30, 38], 20);

  return () => stage.dispose();
};

export default mount;
