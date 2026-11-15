// maskLayers: country polygons cutting both a point layer and a line layer
import { LineLayer, PointLayer, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { PARSER, rows } from '../../shared/layer-demo.ts';
import { PARSER as LINES, rows as routes } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { pickCountries, worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 50], zoom: ctx.preview ? 3 : 4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const template = new PolygonLayer({ visible: false }).source(pickCountries(['France', 'Germany', 'Poland'])).shape('fill').color('#ffffff');
  scene.addLayer(template);
  // An outline of the template, so the cut edge is easy to see.
  scene.addLayer(new PolygonLayer({ zIndex: 2 }).source(pickCountries(['France', 'Germany', 'Poland'])).shape('line').size(1.5).color('#ffffff'));
  const around = [{ name: 'c', lng: 10, lat: 50, pop: 1, continent: 'Europe' as const }];
  const points = new PointLayer({ maskLayers: [template] })
    .source(rows(ctx.preview ? 200 : 500, { around, spread: 8 }), PARSER)
    .shape('circle')
    .size(ctx.preview ? 4 : 5)
    .color('#ffd166');
  const lines = new LineLayer({ maskLayers: [template] })
    .source(routes('Berlin', 30, [{ name: 'Moscow', lng: 37.6, lat: 55.8, pop: 1, continent: 'Europe' }, { name: 'Madrid', lng: -3.7, lat: 40.4, pop: 1, continent: 'Europe' }, { name: 'Rome', lng: 12.5, lat: 41.9, pop: 1, continent: 'Europe' }, { name: 'Berlin', lng: 13.4, lat: 52.5, pop: 1, continent: 'Europe' }, { name: 'Oslo', lng: 10.7, lat: 59.9, pop: 1, continent: 'Europe' }]), LINES)
    .shape('line')
    .size(2)
    .color('#4ecdc4');
  scene.addLayer(points);
  scene.addLayer(lines);

  if (stage.preview) stage.every(80, (i) => scene.setCenter([10 + Math.sin(i / 40) * 3, 50]));

  return () => stage.dispose();
};

export default mount;
