// source(FeatureCollection): the data page's GeoJSON polygon drawn as a PolygonLayer
import { PointLayer, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [6, 45], zoom: ctx.preview ? 3.6 : 4.6 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // The doc's triangle (110.48,32.77 / 117.69,32.77 / 117.69,37.65), shifted onto Europe.
  const data = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [[[2.48, 42.77], [9.69, 42.77], [9.69, 47.65], [2.48, 42.77]]],
        },
      },
    ],
  };
  const polygon = new PolygonLayer().source(data).shape('fill').color('#4ecdc4').style({ opacity: 0.8 });
  scene.addLayer(polygon);
  // The same GeoJSON as points: a layer reads only the geometry types it can draw.
  const corners = new PointLayer().source(data).shape('circle').size(5).color('#ffffff');
  scene.addLayer(corners);

  if (stage.preview) stage.every(80, (i) => scene.setCenter([6 + Math.sin(i / 40) * 1.5, 45]));

  return () => stage.dispose();
};

export default mount;
