// RasterLayer WMS-style tiles: the handler reads BBOX from the request URL
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

  // The docs' URL is a WMS export service; this one is answered in code and only its
  // BBOX parameter (west,south,east,north in degrees, filled in by L7) is read.
  const url = 'l7demo-wms://export?F=image&FORMAT=PNG32&SIZE=256,256&BBOX={bbox}&BBOXSR=4326&IMAGESR=3857';
  serve(stage, 'l7demo-wms', (req) => {
    const bbox = /BBOX=([^&]*)/.exec(req)?.[1]?.split(',').map((v) => Number(v).toFixed(1)) ?? [];
    return pngTile(tileOf(req), { note: `bbox ${bbox[0]}, ${bbox[1]}` });
  });

  const layer = new RasterLayer().source(url, {
    parser: { type: 'rasterTile', tileSize: 256, zoomOffset: 1 },
  });
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, [12, 47], 3);

  return () => stage.dispose();
};

export default mount;
