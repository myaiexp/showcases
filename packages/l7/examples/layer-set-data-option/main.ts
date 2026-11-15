// layer.setData(data, { parser }): swap JSON rows for GeoJSON features on the same layer
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cityFeatures, cities } from '../../shared/data.ts';
import { cycle } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 35], zoom: ctx.preview ? 0.9 : 1.5 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const asia = cities.filter((c) => c.continent === 'Asia' || c.continent === 'Europe');
  const layer = new PointLayer()
    .source(asia, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size('pop', [4, 14])
    .color('#ffb347');
  scene.addLayer(layer);

  const apply = (format: 'json' | 'geojson'): void => {
    // Same cities, two encodings: the second argument tells the source how to read the first.
    if (format === 'json') layer.setData(cities, { parser: { type: 'json', x: 'lng', y: 'lat' } });
    else layer.setData(cityFeatures(), { parser: { type: 'geojson' } });
    layer.color(format === 'json' ? '#ffb347' : '#4ecdc4');
    scene.render();
    const out = stage.readout();
    if (out) out.textContent = `setData(${format === 'json' ? 'cities[]' : 'FeatureCollection'}, { parser: { type: '${format}' } })`;
  };
  if (stage.bar) select(stage.bar, 'data format', ['json', 'geojson'] as const, 'json', apply);
  else cycle(stage, scene, ['json', 'geojson'] as const, 1400, apply);

  return () => stage.dispose();
};

export default mount;
