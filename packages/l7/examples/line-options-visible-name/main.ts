// LineLayer option name: Layer options visible and name
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
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

  scene.addLayer(new LineLayer({ name: 'out' }).source(rows('Paris', 10), PARSER).shape('arc').size(2).color('#ff8a65'));
  scene.addLayer(new LineLayer({ name: 'in', visible: false }).source(rows('Tokyo', 10), PARSER).shape('arc').size(2).color('#4fc3f7'));

  const swap = (): void => {
    const a = scene.getLayerByName('out');
    const b = scene.getLayerByName('in');
    if (!a || !b) return;
    if (a.isVisible()) { a.hide(); b.show(); } else { b.hide(); a.show(); }
  };
  if (stage.bar) button(stage.bar, 'swap layers by name', swap);
  else stage.every(1500, swap);

  return () => stage.dispose();
};

export default mount;
