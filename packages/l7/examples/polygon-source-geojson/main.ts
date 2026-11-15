// PolygonLayer source(): a hand-written GeoJSON polygon, then swapped with setData
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [14, 50],
      zoom: ctx.preview ? 1.9 : 3,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const square = (cx: number, cy: number, r: number): GeoJSON.Feature<GeoJSON.Polygon> => ({
    type: 'Feature',
    properties: {},
    geometry: { type: 'Polygon', coordinates: [[[cx - r, cy - r], [cx + r, cy - r], [cx + r, cy + r], [cx - r, cy + r], [cx - r, cy - r]]] },
  });
  const triangle = (): GeoJSON.FeatureCollection<GeoJSON.Polygon> => ({
    type: 'FeatureCollection',
    features: [{ type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [[[14, 56], [4, 44], [24, 46], [14, 56]]] } }],
  });
  const squares = (): GeoJSON.FeatureCollection<GeoJSON.Polygon> => ({
    type: 'FeatureCollection',
    features: [square(6, 50, 4), square(16, 50, 4), square(26, 50, 4)],
  });
  const layer = new PolygonLayer().source(triangle()).shape('fill').color('#f00').style({ opacity: 0.6 });
  scene.addLayer(layer);
  let tri = true;
  const swap = (): void => { tri = !tri; layer.setData(tri ? triangle() : squares()); };
  if (stage.bar) button(stage.bar, 'setData: swap the polygons', swap);
  else stage.every(1600, swap);

  return () => stage.dispose();
};

export default mount;
