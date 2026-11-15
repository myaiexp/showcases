// color('#f00'): any CSS color string, set directly
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice, cycle } from '../../shared/point-data.ts';
import { select } from '../../shared/controls.ts';
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
    .size(ctx.preview ? 18 : 24)
    .color('#f00');
  scene.addLayer(layer);

  const colors = ['#f00', 'rgb(200, 100, 100)', 'rgba(0, 128, 255, 0.6)', '#0fa', 'goldenrod'];
  if (stage.bar) {
    select(stage.bar, 'color', colors, '#f00', (v) => {
      layer.color(v);
      scene.render();
    });
  } else cycle(stage, scene, colors, 700, (v) => layer.color(v));

  return () => stage.dispose();
};

export default mount;
