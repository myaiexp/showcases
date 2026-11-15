// Layer feature animate with duration, interval and trailLength
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { PARSER, rows, EUROPE } from '../../shared/line-data.ts';
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

  const layer = new LineLayer({ blend: 'normal' })
    .source(rows('Paris', 10, EUROPE), PARSER)
    .shape('arc')
    .size(3)
    .color('#ffd166')
    .animate({ duration: 4, interval: 0.2, trailLength: 0.1 });
  scene.addLayer(layer);

  const set = (interval: string): void => { layer.animate({ duration: 4, interval: Number(interval), trailLength: 0.1 }); };
  if (stage.bar) select(stage.bar, 'interval', ['0.2', '0.5', '1'], '0.2', set);
  else stage.every(3000, (i) => set(i % 2 ? '0.5' : '0.2'));

  return () => stage.dispose();
};

export default mount;
