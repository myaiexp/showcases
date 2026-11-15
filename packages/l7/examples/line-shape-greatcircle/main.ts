// LineLayer shape greatcircle: the shortest path over the globe
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { PARSER, rows, NO_DATELINE } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [10,40],
      zoom: ctx.preview ? 0.4 : 1.2,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new LineLayer()
    .source(rows('Paris', 14, NO_DATELINE), PARSER)
    .shape('greatcircle')
    .size(1.5)
    .color('#c792ea')
    .animate({ duration: 3, interval: 0.3, trailLength: 0.4 });
  scene.addLayer(layer);

  return () => stage.dispose();
};

export default mount;
