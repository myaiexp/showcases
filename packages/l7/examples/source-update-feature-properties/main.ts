// source.updateFeaturePropertiesById(id, props): the layer redraws
import { PointLayer, Scene, Source } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { EUROPE_CENTER, europeZoom, hoverTour, PLACES } from '../../shared/comp-demo.ts';
import { valuePanel } from '../../shared/scene-board.ts';
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

  const rows = PLACES.map((p) => ({ ...p, level: 1 }));
  const source = new Source(rows, { parser: { type: 'json', x: 'lng', y: 'lat' } });
  const layer = new PointLayer()
    .source(source)
    .shape('circle')
    .size(15)
    .color('level', ['#0b3d5c', '#3aa6a8', '#7fd1b9', '#ffd166', '#ff6b6b'])
    .style({ stroke: '#0b131c', strokeWidth: 1 })
    .active(true);
  scene.addLayer(layer);

  const panel = valuePanel(stage.container, 'bl');
  panel({ click: 'a dot to raise its level' });
  layer.on('click', (e: { featureId: number }) => {
    const current = (source.getFeatureById(e.featureId) as { level?: number } | undefined)?.level ?? 1;
    // The properties are merged into the feature and the layer re-renders.
    source.updateFeaturePropertiesById(e.featureId, { level: (current % 5) + 1 });
    const now = source.getFeatureById(e.featureId) as { name?: string; level?: number } | undefined;
    panel({ featureId: String(e.featureId), name: String(now?.name), level: String(now?.level) });
    const out = stage.readout();
    if (out) out.textContent = `updateFeaturePropertiesById(${e.featureId}, { level: ${(current % 5) + 1} })`;
  });
  if (stage.preview) hoverTour(stage, scene, PLACES.slice(2, 8).map((p): [number, number] => [p.lng, p.lat]), { ms: 450, click: true });

  return () => stage.dispose();
};

export default mount;
