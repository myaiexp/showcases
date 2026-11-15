// style({ unit: 'meter' }): sizes in meters, so shapes scale with the map
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

  const data = lattice(3, 1, 6, [10, 46]);
  const fixed = new PointLayer()
    .source(data.map((p) => ({ ...p, lat: p.lat + 2.4 })), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(30)
    .color('#5B8FF9')
    .style({ opacity: 0.7 });
  const real = new PointLayer()
    .source(data.map((p) => ({ ...p, lat: p.lat - 2.4 })), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(130000)
    .color('#ffa842')
    .style({ opacity: 0.7, unit: 'meter' });
  scene.addLayer(fixed);
  scene.addLayer(real);

  const zoomTo = (z: number): void => scene.setZoomAndCenter(z, [10, 46]);
  if (stage.bar) slider(stage.bar, 'zoom', [2, 6, 0.1], 3.4, zoomTo);
  else stage.frame((t) => zoomTo(3.4 + Math.sin(t * 0.8) * 0.7));

  return () => stage.dispose();
};

export default mount;
