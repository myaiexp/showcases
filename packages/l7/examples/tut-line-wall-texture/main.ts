// Tutorial wall: texture with iconStep and iconStepCount
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { icon } from '../../shared/images.ts';
import { ring, sweep } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [10,48],
      zoom: ctx.preview ? 3 : 4.2,
      pitch: 55,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  await scene.addImage('arrow', icon('arrow'));
  const layer = new LineLayer()
    .source(ring([10, 48], 5))
    .size(40)
    .shape('wall')
    .texture('arrow')
    .color('#4fc3f7')
    .style({ lineTexture: true, iconStep: 40, iconStepCount: 4 });
  scene.addLayer(layer);
  const set = (n: number): void => { layer.style({ iconStepCount: n }); scene.render(); };
  if (stage.bar) slider(stage.bar, 'iconStepCount', [1, 8, 1], 4, set);
  else {
    stage.frame((t) => scene.setRotation(Math.sin(t / 2.5) * 40));
    sweep(stage, 900, (i) => set(1 + (i % 6)));
  }

  return () => stage.dispose();
};

export default mount;
