// Tutorial arc: many animated arcs read as a wind field
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { PARSER, windArcs } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [10,52],
      zoom: ctx.preview ? 2 : 3,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new LineLayer({ blend: 'normal' })
    .source(windArcs(150), PARSER)
    .size(1)
    .shape('arc')
    .color('#6495ED')
    .animate({ duration: 4, interval: 0.2, trailLength: 0.6 });
  scene.addLayer(layer);

  return () => stage.dispose();
};

export default mount;
