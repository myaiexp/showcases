// One mvt Source reused by a polygon, a line and a text layer
import { LineLayer, PointLayer, PolygonLayer, Scene, Source } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { drift } from '../../shared/polygon-data.ts';
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

  let requests = 0;
  serve(stage, 'l7demo-reuse', (url) => encodeTile(tileOf(url), tileLayers), { onRequest: () => requests++ });

  // One Source: every tile is requested once, however many layers draw from it.
  const tileSource = new Source('l7demo-reuse://tiles', { parser: { type: 'mvt', maxZoom: 9, extent: [-180, -85.051129, 179, 85.051129] } });
  const fill = new PolygonLayer({ featureId: 'id', sourceLayer: 'countries' }).source(tileSource).color('id', byId).style({ opacity: 0.55 });
  const line = new LineLayer({ featureId: 'id', sourceLayer: 'borders' }).source(tileSource).color('#ffffff').size(1.2).style({ opacity: 0.8 });
  const text = new PointLayer({ featureId: 'id', sourceLayer: 'towns' })
    .source(tileSource)
    .shape('name', 'text')
    .color('#ffffff')
    .size(11)
    .style({ stroke: '#0b131c', strokeWidth: 2, textAllowOverlap: false });
  for (const l of [fill, line, text]) scene.addLayer(l);

  const out = stage.readout();
  stage.every(1000, () => {
    if (out) out.textContent = `tile requests so far: ${requests} (three layers share one source)`;
  });
  if (ctx.preview) drift(stage, scene, [12, 47], 3);

  return () => stage.dispose();
};

export default mount;
