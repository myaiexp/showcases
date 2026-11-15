// Tutorial path: texture arrows flowing along bordered roads
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

  await scene.addImage('arrow', icon('arrow'));
  const layer = new LineLayer()
    .source(paths([10, 48], { n: 8, step: 1.1 }))
    .size(3)
    .shape('line')
    .texture('arrow')
    .color('rgb(22,119,255)')
    .animate({ interval: 1, duration: 1, trailLength: 2 })
    .style({ opacity: 0.6, lineTexture: true, iconStep: 10, borderWidth: 0.4, borderColor: '#fff' });
  scene.addLayer(layer);

  return () => stage.dispose();
};

export default mount;
