// source.getFeatureById(id): the feature behind a clicked element
import { type ILayer, PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { select } from '../../shared/controls.ts';
import { hoverTour } from '../../shared/comp-demo.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { placeFeatures } from '../../shared/source-demo.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const build = (format: 'geojson' | 'json'): ILayer =>
    new PointLayer()
      .source(format === 'geojson' ? placeFeatures() : PLACES, format === 'geojson' ? undefined : { parser: { type: 'json', x: 'lng', y: 'lat' } })
      .shape('circle')
      .size('pop', [7, 16])
      .color('#ffd166')
      .style({ stroke: '#0b131c', strokeWidth: 1 })
      .active(true);
  let layer = build('geojson');
  scene.addLayer(layer);

  const out = stage.readout();
  const panel = valuePanel(stage.container, 'bl');
  const wire = (l: ILayer): void => {
    l.on('click', (e: { featureId: number }) => {
      // featureId is L7's own id for the feature, the argument getFeatureById wants.
      const feature = l.getSource().getFeatureById(e.featureId);
      const text = JSON.stringify(feature);
      panel({ featureId: String(e.featureId), 'getFeatureById()': text.length > 70 ? `${text.slice(0, 70)}…` : text });
      if (out) out.textContent = `getFeatureById(${e.featureId}) -> ${text}`;
    });
  };
  wire(layer);
  panel({ click: 'a dot' });
  if (stage.bar)
    select(stage.bar, 'data', ['geojson', 'json'] as const, 'geojson', (v) => {
      scene.removeLayer(layer);
      layer = build(v);
      scene.addLayer(layer);
      wire(layer);
    });
  else hoverTour(stage, scene, PLACES.slice(2, 8).map((p): [number, number] => [p.lng, p.lat]), { ms: 450, click: true });

  return () => stage.dispose();
};

export default mount;
