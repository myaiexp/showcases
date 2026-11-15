// style({ raisingHeight }): lift flat shapes off the ground
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/point-data.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4, pitch: 55 }),
  });
  await stage.ready(scene);

  const data = lattice(ctx.preview ? 4 : 6, 3);
  const ground = new PointLayer().source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('simple').size(5).color('#ffffff');
  const layer = new PointLayer()
    .source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(ctx.preview ? 16 : 22)
    .color('#ff6b6b')
    .style({ raisingHeight: 40 });
  scene.addLayer(ground);
  scene.addLayer(layer);

  const set = (raisingHeight: number): void => {
    layer.style({ raisingHeight });
    scene.render();
  };
  if (stage.bar) slider(stage.bar, 'raisingHeight', [0, 200, 5], 40, set);
  else stage.frame((t) => set(60 + Math.sin(t * 2) * 50));

  return () => stage.dispose();
};

export default mount;
