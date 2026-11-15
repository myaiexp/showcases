// A flat shape with animate(true): rings spreading from each point
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/data.ts';
import { quakes } from '../../shared/point-data.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [95, 30], zoom: ctx.preview ? 1.8 : 2.6 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const rows = quakes(ctx.preview ? 12 : 30, { spread: 4, around: cities.filter((c) => c.continent === 'Asia') });
  const csv = ['Longitude,Latitude', ...rows.map((p) => `${p.lng},${p.lat}`)].join('\n');
  const layer = new PointLayer()
    .source(csv, { parser: { type: 'csv', x: 'Longitude', y: 'Latitude' } })
    .shape('circle')
    .animate(true)
    .size(40)
    .color('#ffa842');
  scene.addLayer(layer);

  return () => stage.dispose();
};

export default mount;
