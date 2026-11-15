// shape(field, callback): return the image id from the value
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
    .shape('type', (v) => {
      switch (v) {
        case 'A':
          return '00';
        case 'B':
          return '01';
        default:
          return '02';
      }
    })
    .size(ctx.preview ? 24 : 32)
    .style({ opacity: 1 });
  scene.addLayer(layer);

  if (stage.preview) orbit(stage, scene);

  return () => stage.dispose();
};

export default mount;
