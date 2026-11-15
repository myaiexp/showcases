// LineLayer source from CSV text, columns named by parser
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { rows, csvText } from '../../shared/line-data.ts';
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

  // Stands in for the CSV file the docs download.
  const text = csvText(rows('London', 14));
  const layer = new LineLayer()
    .source(text, { parser: { type: 'csv', x: 'lng1', y: 'lat1', x1: 'lng2', y1: 'lat2' } })
    .shape('arc')
    .size(1.5)
    .color('#aed581')
    .animate({ duration: 3, interval: 0.3, trailLength: 0.4 });
  scene.addLayer(layer);
  const out = stage.readout();
  if (out) out.textContent = text.split('\n').slice(0, 4).join('\n') + '\n...';

  return () => stage.dispose();
};

export default mount;
