// PolygonLayer size(field, callback): a function turns the field into a height
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
    .shape('extrude')
    .size('floor', (floor: number) => (floor > 6 ? floor * 90 : floor * 30))
    .color('floor', ['#2c7fb8', '#feb24c']);
  scene.addLayer(layer);
  if (stage.preview) orbit(stage, scene);

  return () => stage.dispose();
};

export default mount;
