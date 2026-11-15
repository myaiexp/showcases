// Layer feature segmentNumber: how many pieces an arc is cut into
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { PARSER, rows, EUROPE, sweep, wave } from '../../shared/line-data.ts';
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
    .size(2)
    .shape('arc')
    .color('#8C1EB2')
    .style({ segmentNumber: 15 });
  scene.addLayer(layer);
  const set = (n: number): void => { layer.style({ segmentNumber: n }); scene.render(); };
  if (stage.bar) slider(stage.bar, 'segmentNumber', [2, 40, 1], 15, set);
  else sweep(stage, 150, (i) => set(2 + Math.round(wave(i, 40) * 28)));

  return () => stage.dispose();
};

export default mount;
