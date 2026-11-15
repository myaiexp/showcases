// HeatmapLayer options minZoom and maxZoom: the heat map shows only inside a zoom range
import { HeatmapLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { RAMP, XY, quakes } from '../../shared/heatmap-data.ts';
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

  const layer = new HeatmapLayer({ minZoom: 3, maxZoom: 5 }).source(quakes(300), XY).shape('heatmap').size('mag', [0, 1]).style({ intensity: 2, radius: 20, rampColors: RAMP });
  scene.addLayer(layer);
  const out = stage.readout();
  const report = (): void => { if (out) out.textContent = `zoom ${scene.getZoom().toFixed(2)}: the heat shows between 3 and 5`; };
  scene.on('zoomend', report);
  report();
  if (stage.preview) stage.frame((t) => scene.setZoom(3.2 + Math.sin(t / 1.6) * 1.6));

  return () => stage.dispose();
};

export default mount;
