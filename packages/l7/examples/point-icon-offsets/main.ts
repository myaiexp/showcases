// style({ offsets }) on icons: shift the image by pixels
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { icon } from '../../shared/images.ts';
import { lattice } from '../../shared/point-data.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 47], zoom: ctx.preview ? 4 : 4.8 }),
  });
  await stage.ready(scene);

  await scene.addImage('icon-pin', icon('pin'));
  const data = lattice(3, 2, 5, [10, 47]);
  const marks = new PointLayer().source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('simple').size(5).color('#ffffff');
  const layer = new PointLayer()
    .source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('icon-pin')
    .size(ctx.preview ? 30 : 40)
    .style({ offsets: [0, 0] });
  scene.addLayer(layer);
  scene.addLayer(marks);

  const set = (x: number, y: number): void => {
    layer.style({ offsets: [x, y] });
    scene.render();
  };
  if (stage.bar) {
    let x = 0;
    let y = 0;
    slider(stage.bar, 'x', [-40, 40, 1], 0, (v) => set((x = v), y));
    slider(stage.bar, 'y', [-40, 40, 1], 0, (v) => set(x, (y = v)));
  } else stage.frame((t) => set(0, 14 + Math.sin(t * 2) * 14));

  return () => stage.dispose();
};

export default mount;
