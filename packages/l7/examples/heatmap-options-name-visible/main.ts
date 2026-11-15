// HeatmapLayer options name and visible: swap two heat maps found by name
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

  const style = { intensity: 2, radius: 20, rampColors: RAMP };
  scene.addLayer(new HeatmapLayer({ name: 'west' }).source(quakes(200, { seed: 4 }).filter((q) => q.lng < 12), XY).shape('heatmap').size('mag', [0, 1]).style(style));
  scene.addLayer(new HeatmapLayer({ name: 'east', visible: false }).source(quakes(200, { seed: 4 }).filter((q) => q.lng >= 12), XY).shape('heatmap').size('mag', [0, 1]).style(style));
  const swap = (): void => {
    const a = scene.getLayerByName('west');
    const b = scene.getLayerByName('east');
    if (!a || !b) return;
    if (a.isVisible()) { a.hide(); b.show(); } else { b.hide(); a.show(); }
  };
  if (stage.bar) button(stage.bar, 'swap layers by name', swap);
  else stage.every(1500, swap);

  return () => stage.dispose();
};

export default mount;
