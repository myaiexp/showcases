// source() with a geojson parser: the same points from geojson text
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice, orbit } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4 }),
  });
  await stage.ready(scene);

  const features = {
    type: 'FeatureCollection' as const,
    properties: {},
    features: lattice(ctx.preview ? 4 : 6, 3).map((p) => ({
      type: 'Feature' as const,
      properties: { mag: p.mag, type: p.type },
      geometry: { type: 'Point' as const, coordinates: [p.lng, p.lat] },
    })),
  };
  const layer = new PointLayer()
    .source(features)
    .shape('circle')
    .size('mag', [8, 28])
    .color('type', ['#ff6b6b', '#ffd166', '#4ecdc4']);
  scene.addLayer(layer);

  if (stage.preview) orbit(stage, scene);

  return () => stage.dispose();
};

export default mount;
