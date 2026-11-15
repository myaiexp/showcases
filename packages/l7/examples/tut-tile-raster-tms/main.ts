// RasterLayer image tiles over a TMS-style URL, served in code through Scene.addProtocol
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

  // The docs point at a tile server. A data protocol answers instead: L7 asks
  // 'l7demo-tms://tiles/{z}/{x}/{y}' and the handler paints that tile on a canvas.
  serve(stage, 'l7demo-tms', (url) => pngTile(tileOf(url)));

  const layer = new RasterLayer().source('l7demo-tms://tiles', {
    parser: { type: 'rasterTile', updateStrategy: 'overlap' },
  });
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, [12, 47], 3);

  return () => stage.dispose();
};

export default mount;
