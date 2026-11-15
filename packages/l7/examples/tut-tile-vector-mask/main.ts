// MaskLayer from vector tiles masking raster tiles
import { MaskLayer, RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { drift } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { tileLayers } from '../../shared/tile-data.ts';
import { encodeTile } from '../../shared/tile-mvt.ts';
import { pngTile } from '../../shared/tile-raster.ts';
import { serve, tileOf } from '../../shared/tile-serve.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 47], zoom: ctx.preview ? 3.2 : 3.8 }),
  });
  await stage.ready(scene);

  serve(stage, 'l7demo-mask-mvt', (url) => encodeTile(tileOf(url), tileLayers));
  serve(stage, 'l7demo-mask-png', (url) => pngTile(tileOf(url), { label: false }));

  const mask = new MaskLayer({ sourceLayer: 'countries' }).source('l7demo-mask-mvt://tiles', {
    parser: { type: 'mvt', maxZoom: 9, extent: [-180, -85.051129, 179, 85.051129] },
  });
  scene.addLayer(mask);
  const raster = new RasterLayer({ maskLayers: [mask] }).source('l7demo-mask-png://tiles', { parser: { type: 'rasterTile' } });
  scene.addLayer(raster);

  if (ctx.preview) drift(stage, scene, [12, 47], 3);

  return () => stage.dispose();
};

export default mount;
