// LineLayer color(string): one colour, with a picker in the full view
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
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

  const forms = ['#ff6b6b', 'rgb(100, 200, 255)', 'rgba(255, 209, 102, 0.7)', 'orchid', '#0f0'];
  const layer = new LineLayer().source(rows('Paris', 12), PARSER).shape('arc').size(2).color('#ff6b6b');
  scene.addLayer(layer);

  const set = (c: string): void => { layer.color(c); scene.render(); };
  if (stage.bar) select(stage.bar, 'color', forms, '#ff6b6b', set);
  else sweep(stage, 900, (i) => set(forms[i % forms.length] ?? '#fff'));

  return () => stage.dispose();
};

export default mount;
