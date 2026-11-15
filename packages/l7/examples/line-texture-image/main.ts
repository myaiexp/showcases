// LineLayer texture(id) with scene.addImage and lineTexture
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { icon } from '../../shared/images.ts';
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

  await scene.addImage('02', icon('arrow'));
  const layer = new LineLayer()
    .source(paths([10, 48], { n: 7, step: 1.1 }))
    .shape('line')
    .size(5)
    .texture('02')
    .color('#25d8b7')
    .animate({ interval: 1, duration: 1, trailLength: 2 })
    .style({ lineTexture: true, iconStep: 20 });
  scene.addLayer(layer);

  return () => stage.dispose();
};

export default mount;
