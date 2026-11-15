// style({ offsets }) on the simple shape: shift sprites in pixels
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
    map: new Map({ center: [12, 48], zoom: ctx.preview ? 3.6 : 4.4 }),
  });
  await stage.ready(scene);

  const data = lattice(ctx.preview ? 4 : 6, 3, 3, [12, 48]);
  const layer = new PointLayer()
    .source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('simple')
    .size(20)
    .color('#5B8FF9')
    .style({ offsets: [0, 0] });
  scene.addLayer(layer);

  const ghosts = new PointLayer().source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('simple').size(20).color('#ffffff').style({ opacity: 0.25 });
  scene.addLayer(ghosts);

  const set = (x: number, y: number): void => {
    layer.style({ offsets: [x, y] });
    scene.render();
  };
  if (stage.bar) {
    let x = 0;
    let y = 0;
    slider(stage.bar, 'x', [-60, 60, 2], 0, (v) => set((x = v), y));
    slider(stage.bar, 'y', [-60, 60, 2], 0, (v) => set(x, (y = v)));
  } else stage.frame((t) => set(Math.cos(t * 2) * 24, Math.sin(t * 2) * 24));

  return () => stage.dispose();
};

export default mount;
