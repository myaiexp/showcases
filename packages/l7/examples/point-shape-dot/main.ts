// The 'dot' shape: tiny additive points whose overlaps glow
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/data.ts';
import { quakes, cycle } from '../../shared/point-data.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 48], zoom: ctx.preview ? 3.6 : 4.2 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer()
    .source(quakes(ctx.preview ? 500 : 1500, { spread: 1.5, around: cities.filter((c) => c.continent === 'Europe') }), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('dot')
    .size(2)
    .color('#4d8bff');
  scene.addLayer(layer);

  if (stage.bar) {
    slider(stage.bar, 'size', [0.5, 8, 0.5], 2, (v) => {
      layer.size(v);
      scene.render();
    });
  } else cycle(stage, scene, [1, 3, 5, 3], 700, (v) => layer.size(v));

  return () => stage.dispose();
};

export default mount;
