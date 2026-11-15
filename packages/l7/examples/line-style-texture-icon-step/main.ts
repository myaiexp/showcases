// LineLayer style iconStep: distance between repeated line textures
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

  await scene.addImage('dot', icon('dot'));
  const layer = new LineLayer()
    .source(paths([10, 48], { n: 7, step: 1.1 }))
    .shape('line')
    .size(6)
    .texture('dot')
    .color('#ffb74d')
    .style({ lineTexture: true, iconStep: 30 });
  scene.addLayer(layer);

  const set = (v: number): void => { layer.style({ iconStep: v }); scene.render(); };
  if (stage.bar) slider(stage.bar, 'iconStep', [5, 100, 5], 30, set);
  else sweep(stage, 120, (i) => set(10 + wave(i, 40) * 70));

  return () => stage.dispose();
};

export default mount;
