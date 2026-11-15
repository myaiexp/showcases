// PolygonLayer on a 'geojsonvt' source: GeoJSON sliced into tiles in the browser
import { PolygonLayer, Scene, Source } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { drift } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { countries } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 47], zoom: ctx.preview ? 3.2 : 3.8 }),
  });
  await stage.ready(scene);

  // The docs fetch a GeoJSON file; the world's countries are the data here.
  const source = new Source(countries, {
    parser: { type: 'geojsonvt', maxZoom: 9 },
  });
  const polygon = new PolygonLayer({ featureId: 'id' })
    .source(source)
    .color('id', (id: number) => ['#4ecdc4', '#ffd166', '#ff6b6b', '#7fb7ff', '#c792ea'][id % 5] ?? '#fff');
  scene.addLayer(polygon);

  if (ctx.preview) drift(stage, scene, [12, 47], 3);

  return () => stage.dispose();
};

export default mount;
