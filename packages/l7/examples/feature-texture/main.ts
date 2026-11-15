// Layer feature texture: scene.addImage then texture(id) on a line
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { icon } from '../../shared/images.ts';
import { paths, sweep, wave } from '../../shared/line-data.ts';
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
    .size(4)
    .shape('line')
    .texture('02')
    .color('#25d8b7')
    .animate({ interval: 1, duration: 1, trailLength: 2 })
    .style({ lineTexture: true, iconStep: 20 });
  scene.addLayer(layer);
  if (stage.bar) slider(stage.bar, 'iconStep', [5, 100, 1], 20, (v) => { layer.style({ iconStep: v }); scene.render(); });

  return () => stage.dispose();
};

export default mount;
