// Tutorial greatcircle: a texture along the route
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { icon } from '../../shared/images.ts';
import { PARSER, rows, NO_DATELINE } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [10,35],
      zoom: ctx.preview ? 0.3 : 1.5,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  await scene.addImage('arrow', icon('arrow'));
  const layer = new LineLayer()
    .source(rows('Paris', 10, NO_DATELINE), PARSER)
    .size(8)
    .shape('greatcircle')
    .texture('arrow')
    .color('#4fc3f7')
    .animate({ duration: 2, interval: 0.25, trailLength: 0.2 })
    .style({ lineTexture: true, iconStep: 30 });
  scene.addLayer(layer);

  return () => stage.dispose();
};

export default mount;
