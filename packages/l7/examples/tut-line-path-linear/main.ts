// Tutorial path: sourceColor and targetColor along each path
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

  const layer = new LineLayer()
    .source(paths([10, 48], { n: 8, step: 1.1 }))
    .shape('line')
    .size(4)
    .color('#8C1EB2')
    .style({ sourceColor: '#ff1744', targetColor: '#2979ff' })
    .animate({ duration: 3, interval: 0.5, trailLength: 0.8 });
  scene.addLayer(layer);

  return () => stage.dispose();
};

export default mount;
