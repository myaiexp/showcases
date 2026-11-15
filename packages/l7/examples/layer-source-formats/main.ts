// layer.source(data, { parser }): JSON rows, GeoJSON and CSV text drawing the same cities
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cities, cityFeatures } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const OFF = 12;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [14, 50], zoom: ctx.preview ? 2.6 : 3.4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // The cities of Europe, each copy fed in another format and nudged 12px apart with offsets.
  const eu = cities.filter((c) => c.continent === 'Europe');
  const csv = ['name,lng,lat,pop', ...eu.map((c) => `${c.name},${c.lng},${c.lat},${c.pop}`)].join('\n');

  const json = new PointLayer()
    .source(eu, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(ctx.preview ? 7 : 10)
    .color('#ff6b6b')
    .style({ offsets: [-OFF, 0] });
  const geo = new PointLayer()
    .source(cityFeatures(eu), { parser: { type: 'geojson' } })
    .shape('circle')
    .size(ctx.preview ? 7 : 10)
    .color('#ffd166');
  const csvLayer = new PointLayer()
    .source(csv, { parser: { type: 'csv', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(ctx.preview ? 7 : 10)
    .color('#4ecdc4')
    .style({ offsets: [OFF, 0] });
  for (const l of [json, geo, csvLayer]) scene.addLayer(l);

  const out = stage.readout();
  if (out) out.textContent = 'left, red: JSON rows (type: json)\nmiddle, yellow: GeoJSON (type: geojson)\nright, teal: CSV text (type: csv)';
  if (stage.preview) stage.every(80, (i) => scene.setCenter([14 + Math.sin(i / 40) * 3, 50]));

  return () => stage.dispose();
};

export default mount;
