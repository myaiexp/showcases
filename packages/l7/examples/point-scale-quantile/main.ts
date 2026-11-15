// scale('mag', { type: 'quantile' }): quantile classes over skewed data
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
    map: new Map({ center: [30, 38], zoom: ctx.preview ? 1.8 : 2.4 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers()) scene.addLayer(l);
  const layer = new PointLayer()
    .source(quakes(ctx.preview ? 90 : 220, { spread: 4 }), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(ctx.preview ? 8 : 11)
    .scale('mag', { type: 'quantile' })
    .color('mag', ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'])
    .style({ opacity: 0.9 });
  scene.addLayer(layer);

  if (stage.preview) drift(stage, scene, [30, 38], 20);

  return () => stage.dispose();
};

export default mount;
