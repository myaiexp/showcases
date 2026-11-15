// The 'pentagon' fill shape on a lattice of points
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

  const layer = new PointLayer()
    .source(lattice(ctx.preview ? 4 : 6, 3), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('pentagon')
    .size(ctx.preview ? 24 : 32)
    .color('type', ['#ff6b6b', '#ffd166', '#4ecdc4'])
    .style({ opacity: 0.9, stroke: '#fff', strokeWidth: 1 });
  scene.addLayer(layer);

  const turn = (deg: number): void => {
    layer.style({ rotation: deg });
    scene.render();
  };
  if (stage.bar) slider(stage.bar, 'rotation', [0, 360, 1], 0, turn);
  else stage.every(60, (i) => turn((i * 4) % 360));

  return () => stage.dispose();
};

export default mount;
