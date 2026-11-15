// size(number): every point gets the same radius
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice, cycle } from '../../shared/point-data.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer()
    .source(lattice(ctx.preview ? 4 : 6, 3), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(12)
    .color('#4ecdc4')
    .style({ opacity: 0.85 });
  scene.addLayer(layer);

  if (stage.bar) {
    slider(stage.bar, 'size', [2, 40, 1], 12, (v) => {
      layer.size(v);
      scene.render();
    });
  } else cycle(stage, scene, [6, 14, 24, 14], 600, (v) => layer.size(v));

  return () => stage.dispose();
};

export default mount;
