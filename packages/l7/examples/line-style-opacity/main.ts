// LineLayer style opacity: the common transparency option
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { PARSER, rows, sweep, wave } from '../../shared/line-data.ts';
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

  const layer = new LineLayer({ blend: 'normal' }).source(rows('Paris', 16), PARSER).shape('arc').size(4).color('#ffb74d').style({ opacity: 0.6 });
  scene.addLayer(layer);

  const set = (v: number): void => { layer.style({ opacity: v }); scene.render(); };
  if (stage.bar) slider(stage.bar, 'opacity', [0, 1, 0.05], 0.6, set);
  else sweep(stage, 120, (i) => set(0.1 + wave(i, 30) * 0.9));

  return () => stage.dispose();
};

export default mount;
