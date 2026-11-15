// size(field, callback): code decides the radius from the value
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
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

  const layer = new PointLayer()
    .source(lattice(ctx.preview ? 4 : 6, 3), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size('mag', (mag) => {
      if (mag > 6) return 36;
      if (mag > 3) return 22;
      return 10;
    })
    .color('mag', ['#4ecdc4', '#ffd166', '#ff6b6b'])
    .style({ opacity: 0.85 });
  scene.addLayer(layer);

  if (stage.preview) orbit(stage, scene);

  return () => stage.dispose();
};

export default mount;
