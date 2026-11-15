// scene.addImage plus shape(field, [ids]): a symbol per category
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { icon } from '../../shared/images.ts';
import { lattice, orbit } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4 }),
  });
  await stage.ready(scene);

  await scene.addImage('00', icon('house'));
  await scene.addImage('01', icon('tree'));
  await scene.addImage('02', icon('pin'));
  const layer = new PointLayer()
    .source(lattice(ctx.preview ? 4 : 6, 3), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('type', ['00', '01', '02'])
    .size(ctx.preview ? 24 : 32);
  scene.addLayer(layer);

  if (stage.preview) orbit(stage, scene);

  return () => stage.dispose();
};

export default mount;
