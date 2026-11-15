// Tutorial simple: a sourceColor to targetColor gradient
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
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

  const layer = new LineLayer().source(paths([10, 48], { n: 40, steps: 18, step: 0.6, seed: 4 })).shape('simple').color('#fff').style({ sourceColor: '#ff1744', targetColor: '#2979ff' });
  scene.addLayer(layer);
  if (stage.preview) drift(stage, scene, [12, 50], [4, 2]);

  return () => stage.dispose();
};

export default mount;
