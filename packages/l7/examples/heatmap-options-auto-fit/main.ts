// HeatmapLayer option autoFit: the map zooms to the points once the layer is added
import { HeatmapLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { RAMP, XY, quakes } from '../../shared/heatmap-data.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [10, 48],
      zoom: ctx.preview ? 2.5 : 3.5,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const make = () => new HeatmapLayer({ autoFit: true }).source(quakes(300), XY).shape('heatmap').size('mag', [0, 1]).style({ intensity: 2, radius: 20, rampColors: RAMP });
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
