// RasterLayer WMTS tiles: wmtsOptions builds the GetTile query, a data protocol answers it
import { RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { drift } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { pngTile } from '../../shared/tile-raster.ts';
import { serve, tileOf } from '../../shared/tile-serve.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 47], zoom: ctx.preview ? 2.6 : 3.2 }),
  });
  await stage.ready(scene);

  serve(stage, 'l7demo-wmts', (req) => pngTile(tileOf(req), { note: 'WMTS img/w', hue: 40 }));

  const layer = new RasterLayer({ zIndex: 1 }).source('l7demo-wmts://service?tk=demo&', {
    parser: {
      type: 'rasterTile',
      tileSize: 256,
      wmtsOptions: { layer: 'img', tileMatrixset: 'w', format: 'tiles' },
    },
  });
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, [12, 47], 3);

  return () => stage.dispose();
};

export default mount;
