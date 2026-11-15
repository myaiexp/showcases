// Click events on a vector tile layer: the merged feature in the payload
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { tour } from '../../shared/layer-demo.ts';
import { createStage } from '../../shared/stage.ts';
import { byId, tileLayers } from '../../shared/tile-data.ts';
import { encodeTile } from '../../shared/tile-mvt.ts';
import { serve, tileOf } from '../../shared/tile-serve.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 47], zoom: ctx.preview ? 3.2 : 3.8 }),
  });
  await stage.ready(scene);

  serve(stage, 'l7demo-event', (url) => encodeTile(tileOf(url), tileLayers));

  const layer = new PolygonLayer({ featureId: 'id', sourceLayer: 'countries' })
    .source('l7demo-event://tiles', { parser: { type: 'mvt', maxZoom: 9, extent: [-180, -85.051129, 179, 85.051129] } })
    .color('id', byId)
    .style({ opacity: 0.8 })
    .active(true)
    .select(true);
  scene.addLayer(layer);

  const out = stage.readout();
  layer.on('click', (e: { featureId?: number; lngLat?: { lng: number; lat: number }; feature?: { properties?: Record<string, unknown> } }) => {
    if (out) out.textContent = `featureId: ${e.featureId}\nproperties: ${JSON.stringify(e.feature?.properties)}\nlngLat: ${e.lngLat?.lng.toFixed(2)}, ${e.lngLat?.lat.toFixed(2)}`;
  });
  // Cards have no pointer: a ghost visits a few countries and clicks.
  if (ctx.preview) tour(stage, scene, [[10, 51], [2, 46.5], [19, 52], [12.5, 42.5]]);

  return () => stage.dispose();
};

export default mount;
