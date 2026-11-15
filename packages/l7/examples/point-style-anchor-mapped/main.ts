// style({ anchor: { field, value } }): a different anchor per category
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3.4 : 4.2 }),
  });
  await stage.ready(scene);

  const data = lattice(3, 2, 4, [10, 46]);
  const layer = new PointLayer()
    .source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(ctx.preview ? 22 : 30)
    .color('type', ['#ff6b6b', '#ffd166', '#4ecdc4'])
    .style({ opacity: 0.8, anchor: { field: 'type', value: ['center', 'bottom', 'top'] } });
  const marks = new PointLayer().source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('simple').size(5).color('#ffffff');
  scene.addLayer(layer);
  scene.addLayer(marks);

  return () => stage.dispose();
};

export default mount;
