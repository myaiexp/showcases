// geojsonvtOptions.promoteId: the featureId comes from a property
import { PolygonLayer, Scene, Source } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { tour } from '../../shared/layer-demo.ts';
import { createStage } from '../../shared/stage.ts';
import { countries } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 47], zoom: ctx.preview ? 3.2 : 3.8 }),
  });
  await stage.ready(scene);

  const source = new Source(countries, {
    parser: { type: 'geojsonvt', maxZoom: 9, geojsonvtOptions: { promoteId: 'id', generateId: false } },
  });
  const polygon = new PolygonLayer({ featureId: 'id' })
    .source(source)
    .color('#4a6a8a')
    .style({ opacity: 0.9 })
    .active({ color: '#ffd166' });
  scene.addLayer(polygon);

  const out = stage.readout();
  polygon.on('mousemove', (e: { featureId?: number }) => {
    if (out) out.textContent = `featureId under the pointer: ${e.featureId}`;
  });
  if (ctx.preview) tour(stage, scene, [[10, 51], [2, 46.5], [19, 52], [12.5, 42.5]], { clickEvery: 99 });

  return () => stage.dispose();
};

export default mount;
