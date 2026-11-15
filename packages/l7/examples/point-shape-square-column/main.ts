// The 'squareColumn' 3D column shape, heights from the mag field
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
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4, pitch: 55 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer()
    .source(lattice(ctx.preview ? 4 : 6, 3), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('squareColumn')
    .size('mag', (mag) => [12, 12, mag * 9])
    .color('mag', ['#2894E0', '#CFF6FF', '#FFF5B8', '#F27049'])
    .style({ opacity: 0.95 });
  scene.addLayer(layer);

  if (stage.preview) orbit(stage, scene, { pitch: 55, turn: 40 });

  return () => stage.dispose();
};

export default mount;
