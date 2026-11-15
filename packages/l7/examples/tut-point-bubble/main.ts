// A bubble chart: circle area follows the mag field, color splits at 4.5
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { quakes, drift } from '../../shared/point-data.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 25], zoom: ctx.preview ? 0.5 : 1.4 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  // quakes() stands in for the docs' earthquake JSON: rows with lng, lat and mag.
  const layer = new PointLayer()
    .source(quakes(ctx.preview ? 70 : 350), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size('mag', [1, 25])
    .color('mag', (mag) => (mag > 4.5 ? '#5B8FF9' : '#5CCEA1'))
    .style({ opacity: 0.5, strokeWidth: 1 });
  scene.addLayer(layer);

  if (stage.preview) drift(stage, scene, [20, 25], 30);

  return () => stage.dispose();
};

export default mount;
