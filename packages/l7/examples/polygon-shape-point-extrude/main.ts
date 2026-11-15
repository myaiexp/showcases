// PolygonLayer drawing each polygon as a 3D column at its centroid
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { blocks, orbit } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [13.4, 52.5],
      zoom: ctx.preview ? 10.8 : 11.2,
      pitch: 55,
    }),
  });
  await stage.ready(scene);

  const layer = new PolygonLayer()
    .source(blocks(10, 10))
    .shape('cylinder')
    .size('floor', (floor: number) => [8, 8, floor * 8])
    .color('unit_price', ['#ffffb2', '#fecc5c', '#fd8d3c', '#e31a1c']);
  scene.addLayer(layer);
  if (stage.preview) orbit(stage, scene);

  return () => stage.dispose();
};

export default mount;
