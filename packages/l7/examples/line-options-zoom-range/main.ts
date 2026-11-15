// LineLayer option minZoom: Layer options minZoom and maxZoom
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { PARSER, rows } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [15,40],
      zoom: ctx.preview ? 1 : 1.2,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new LineLayer({ minZoom: 1, maxZoom: 2.5 }).source(rows('Paris', 14), PARSER).shape('arc').size(2).color('#aed581');
  scene.addLayer(layer);
  const out = stage.readout();
  const report = (): void => { if (out) out.textContent = `zoom ${scene.getZoom().toFixed(2)}: lines show between 1 and 2.5`; };
  scene.on('zoomend', report);
  report();
  if (stage.preview) stage.frame((t) => scene.setZoom(1.75 + Math.sin(t / 1.6) * 1.5));

  return () => stage.dispose();
};

export default mount;
