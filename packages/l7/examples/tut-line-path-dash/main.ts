// Tutorial path: lineType dash with a dashArray
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { paths, sweep } from '../../shared/line-data.ts';
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
    .source(paths([10, 48], { n: 9, step: 1.1 }))
    .shape('line')
    .size(2)
    .color('type', ['#5B8FF9', '#5CCEA1', '#F6BD16'])
    .style({ lineType: 'dash', dashArray: [5, 5] });
  scene.addLayer(layer);
  sweep(stage, 250, (i) => { layer.style({ dashArray: [3 + (i % 8), 5] }); scene.render(); });

  return () => stage.dispose();
};

export default mount;
