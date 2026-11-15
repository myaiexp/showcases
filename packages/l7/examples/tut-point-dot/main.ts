// Dot points as a density map: more points per area, brighter
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/data.ts';
import { quakes, drift } from '../../shared/point-data.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 49], zoom: ctx.preview ? 3.6 : 4.2 }),
  });
  await stage.ready(scene);

  // The tutorial fetches a .txt CSV of lng and lat; this makes dense text of the same shape.
  const rows = quakes(ctx.preview ? 800 : 3000, { spread: 1.8, around: cities.filter((c) => c.continent === 'Europe') });
  const csv = ['lng,lat', ...rows.map((p) => `${p.lng.toFixed(3)},${p.lat.toFixed(3)}`)].join('\n');
  // No shape(): the default point layer is the dot.
  const layer = new PointLayer()
    .source(csv, { parser: { type: 'csv', y: 'lat', x: 'lng' } })
    .size(1)
    .color('#4d8bff');
  scene.addLayer(layer);

  if (stage.bar) {
    slider(stage.bar, 'size', [0.2, 4, 0.1], 1, (v) => {
      layer.size(v);
      scene.render();
    });
  } else drift(stage, scene, [12, 49], 6);

  return () => stage.dispose();
};

export default mount;
