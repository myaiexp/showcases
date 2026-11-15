// Tutorial path: a constant width with size(2)
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
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

  const layer = new LineLayer().source(paths([10, 48], { n: 8 })).shape('line').size(2).color('#4fc3f7');
  scene.addLayer(layer);
  const set = (w: number): void => { layer.size(w); scene.render(); };
  if (stage.bar) slider(stage.bar, 'size', [1, 10, 0.5], 2, set);
  else sweep(stage, 150, (i) => set(1 + wave(i, 24) * 6));

  return () => stage.dispose();
};

export default mount;
