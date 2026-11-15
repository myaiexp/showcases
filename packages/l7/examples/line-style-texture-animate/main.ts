// LineLayer texture advance: animate interval sets how many textures
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { icon } from '../../shared/images.ts';
import { PARSER, rows, sweep } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [15,25],
      zoom: ctx.preview ? 0.2 : 1.2,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  await scene.addImage('plane', icon('plane'));
  const layer = new LineLayer()
    .source(rows('Paris', 10), PARSER)
    .shape('arc')
    .size(10)
    .texture('plane')
    .color('#7fdbff')
    .animate({ duration: 1, interval: 0.2, trailLength: 0.1 })
    .style({ lineTexture: true, iconStep: 30 });
  scene.addLayer(layer);

  const set = (interval: number): void => { layer.animate({ duration: 1, interval, trailLength: 0.1 }); scene.render(); };
  if (stage.bar) slider(stage.bar, 'interval', [0.1, 0.5, 0.05], 0.2, set);
  else sweep(stage, 2500, (i) => set(i % 2 ? 0.5 : 0.1));

  return () => stage.dispose();
};

export default mount;
