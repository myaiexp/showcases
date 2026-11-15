// LineLayer option autoFit: Layer option autoFit
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
      center: [-40,60],
      zoom: ctx.preview ? 0 : 0.5,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const make = () =>
    new LineLayer({ autoFit: true }).source(rows('Sydney', 10), PARSER).shape('arc').size(2).color('#ffd166');
  let layer = make();
  scene.addLayer(layer);

  const again = async (): Promise<void> => {
    await scene.removeLayer(layer);
    scene.setZoomAndCenter(0, [-40, 60]);
    layer = make();
    scene.addLayer(layer);
  };
  if (stage.bar) button(stage.bar, 'jump away, then autoFit', () => void again());
  else stage.every(4000, () => void again());

  return () => stage.dispose();
};

export default mount;
