// LineLayer shape simple: a cheap 1px line whatever size says
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { paths, drift } from '../../shared/line-data.ts';
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
    .source(paths([10, 48], { n: 40, steps: 18, step: 0.7 }))
    .shape('simple')
    .size(10)
    .color('#ffd166');
  scene.addLayer(layer);

  if (stage.bar) slider(stage.bar, 'size', [1, 30, 1], 10, (v) => { layer.size(v); scene.render(); });
  else drift(stage, scene, [12, 50], [4, 2]);

  return () => stage.dispose();
};

export default mount;
