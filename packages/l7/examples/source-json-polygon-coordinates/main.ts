// JSON parser with coordinates for areas: a three-level ring field
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { ring } from '../../shared/source-demo.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // The docs' shape: each row has 'geometryCoord', [ring [vertex [lng, lat]]]: three levels of arrays.
  const rows = PLACES.map((p, i) => ({ type: 'Polygon', name: p.name, pop: p.pop, geometryCoord: [ring([p.lng, p.lat], 0.9 + p.pop * 0.12, 5 + (i % 3), 1.4, i)] }));
  const layer = new PolygonLayer()
    .source(rows, { parser: { type: 'json', coordinates: 'geometryCoord' } })
    .shape('fill')
    .color('pop', ['#7fd1b9', '#3aa6a8', '#1c6e8c', '#0b3d5c'])
    .style({ opacity: 0.9 });
  scene.addLayer(layer);
  scene.addLayer(new PolygonLayer().source(rows, { parser: { type: 'json', coordinates: 'geometryCoord' } }).shape('line').size(1).color('#cfe3f7'));

  const out = stage.readout();
  if (out) out.textContent = "rows: { name, pop, geometryCoord: [[[lng, lat], …]] }\nparser: { type: 'json', coordinates: 'geometryCoord' }: the rows become polygons coloured by pop.";
  if (stage.preview) stage.every(70, (i) => scene.setCenter([EUROPE_CENTER[0] + Math.sin(i / 40) * 5, EUROPE_CENTER[1]]));

  return () => stage.dispose();
};

export default mount;
