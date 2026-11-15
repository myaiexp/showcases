// PointLayer on an 'mvt' source: the towns source layer as circles
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { drift } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { tileLayers } from '../../shared/tile-data.ts';
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

  // Each tile is a real Mapbox Vector Tile (protobuf), encoded on request from in-memory data.
  serve(stage, 'l7demo-tut-tile-vector-point', (url) => encodeTile(tileOf(url), tileLayers));

  const layer = new PointLayer({ featureId: 'id', sourceLayer: 'towns' })
    .source('l7demo-tut-tile-vector-point://tiles', { parser: { type: 'mvt', maxZoom: 9, extent: [-180, -85.051129, 179, 85.051129] } })
    .shape('circle')
    .color('#ff6b6b')
    .size(5);
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, [12, 47], 3);

  return () => stage.dispose();
};

export default mount;
