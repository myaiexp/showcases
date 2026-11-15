// LineLayer shape line: ordinary width-aware paths with a flowing trail
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { paths } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [12,50],
      zoom: ctx.preview ? 2.3 : 3.3,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const roads = paths([10, 48], { n: 9, step: 1.1 });
  const layer = new LineLayer()
    .source(roads)
    .shape('line')
    .size(2.5)
    .color('c')
    .animate({ duration: 3, interval: 0.3, trailLength: 0.4 });
  scene.addLayer(layer);

  return () => stage.dispose();
};

export default mount;
