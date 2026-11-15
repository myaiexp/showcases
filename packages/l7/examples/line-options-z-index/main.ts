// LineLayer option zIndex: Layer option zIndex: draw order
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { PARSER, rows } from '../../shared/line-data.ts';
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

  const red = new LineLayer({ zIndex: 1 }).source(rows('Paris', 12), PARSER).shape('arc').size(10).color('#ef5350');
  const blue = new LineLayer({ zIndex: 0 }).source(rows('Paris', 12), PARSER).shape('arc').size(5).color('#42a5f5').style({ opacity: 0.9 });
  scene.addLayer(red);
  scene.addLayer(blue);

  const set = (redOnTop: boolean): void => { red.setIndex(redOnTop ? 1 : 0); blue.setIndex(redOnTop ? 0 : 1); scene.render(); };
  if (stage.bar) toggle(stage.bar, 'red layer on top', true, set);
  else stage.every(1000, (i) => set(i % 2 === 0));

  return () => stage.dispose();
};

export default mount;
