// PolygonLayer option autoFit: the map zooms to the layer once it is added
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { regions } from '../../shared/polygon-data.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [14, 50],
      zoom: ctx.preview ? 1.9 : 3,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const make = () => new PolygonLayer({ autoFit: true }).source(regions(['Germany', 'France', 'Poland', 'Spain', 'Italy'])).shape('fill').color('#ffd166').style({ opacity: 0.85 });
  let layer = make();
  scene.addLayer(layer);
  const again = async (): Promise<void> => {
    await scene.removeLayer(layer);
    scene.setZoomAndCenter(1, [-100, 20]);
    layer = make();
    scene.addLayer(layer);
  };
  if (stage.bar) button(stage.bar, 'jump away, then autoFit', () => void again());
  else stage.every(4000, () => void again());

  return () => stage.dispose();
};

export default mount;
