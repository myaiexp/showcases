// Raster tile parser wmtsOptions: the GetTile request L7 builds
import { RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { pngTile } from '../../shared/tile-raster.ts';
import { serve, tileOf } from '../../shared/tile-serve.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 47], zoom: ctx.preview ? 3.4 : 4.2 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  let lastUrl = '';
  serve(stage, 'l7demo-wmts', (url) => {
    lastUrl = url;
    return pngTile(tileOf(url), { hue: 40 });
  });

  // The docs' url ends with '&' (a query is already open); wmtsOptions adds the service parameters.
  const layer = new RasterLayer({ zIndex: 1 }).source('l7demo-wmts://wmts?key=demo&', {
    parser: { type: 'rasterTile', tileSize: 256, wmtsOptions: { layer: 'img', tileMatrixset: 'w', format: 'tiles' } },
  });
  scene.addLayer(layer);

  const out = stage.readout();
  stage.every(500, () => {
    if (out) out.textContent = `wmtsOptions: { layer: 'img', tileMatrixset: 'w', format: 'tiles' }\nlast request L7 made: ${lastUrl || 'none yet'}`;
  });
  if (stage.bar) select(stage.bar, 'view', ['Europe'] as const, 'Europe', () => undefined);
  if (stage.preview) stage.every(70, (i) => scene.setCenter([12 + Math.sin(i / 40) * 3, 47]));

  return () => stage.dispose();
};

export default mount;
