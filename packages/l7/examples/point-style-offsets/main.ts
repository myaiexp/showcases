// style({ offsets: [x, y] }): shift the drawing in pixels
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
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4 }),
  });
  await stage.ready(scene);

  const data = lattice(ctx.preview ? 4 : 6, 3);
  const marks = new PointLayer().source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('simple').size(4).color('#ffffff');
  const layer = new PointLayer()
    .source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('square')
    .size(ctx.preview ? 20 : 28)
    .color('#4ecdc4')
    .style({ opacity: 0.8, offsets: [0, 0] });
  scene.addLayer(layer);
  scene.addLayer(marks);

  const set = (x: number, y: number): void => {
    layer.style({ offsets: [x, y] });
    scene.render();
  };
  if (stage.bar) {
    let x = 0;
    let y = 0;
    slider(stage.bar, 'x', [-60, 60, 2], 0, (v) => set((x = v), y));
    slider(stage.bar, 'y', [-60, 60, 2], 0, (v) => set(x, (y = v)));
  } else {
    stage.frame((t) => set(Math.cos(t * 2) * 22, Math.sin(t * 2) * 22));
  }

  return () => stage.dispose();
};

export default mount;
