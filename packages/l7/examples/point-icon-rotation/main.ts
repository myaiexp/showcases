// Icons with layerType 'fillImage': rotation turns each arrow
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { arrowImage } from '../../shared/point-demo.ts';
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

  await scene.addImage('arrBlue', arrowImage('#5B8FF9'));
  await scene.addImage('arrRed', arrowImage('#ff6b6b'));
  const layer = new PointLayer({ layerType: 'fillImage' })
    .source(lattice(ctx.preview ? 4 : 6, 3), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('wind', (wind) => (wind === 'up' ? 'arrBlue' : 'arrRed'))
    .size(ctx.preview ? 22 : 30)
    .style({ rotation: { field: 'rotate', value: [0, 360] } });
  scene.addLayer(layer);

  if (stage.preview) orbit(stage, scene);

  return () => stage.dispose();
};

export default mount;
