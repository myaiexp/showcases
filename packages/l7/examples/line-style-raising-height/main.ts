// LineLayer style raisingHeight: lift a line shape above the map
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
      center: [10,48],
      zoom: ctx.preview ? 3 : 4,
      pitch: 55,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new LineLayer().source(paths([10, 48], { n: 8, step: 1.1 })).shape('line').size(3).color('#ffd166').style({ raisingHeight: 0 });
  scene.addLayer(layer);

  const set = (v: number): void => { layer.style({ raisingHeight: v }); scene.render(); };
  if (stage.bar) slider(stage.bar, 'raisingHeight', [0, 400, 10], 0, set);
  else {
    stage.frame((t) => scene.setRotation(Math.sin(t / 2.5) * 30));
    sweep(stage, 120, (i) => set(wave(i, 40) * 300));
  }

  return () => stage.dispose();
};

export default mount;
