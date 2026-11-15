// RasterLayer tiles cut to a GeoJSON maskfence
import { RasterLayer, Scene, Source } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { disc } from '../../shared/layer-demo.ts';
import { drift } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { elevationTile, readElevation } from '../../shared/tile-raster.ts';
import { serve, tileOf } from '../../shared/tile-serve.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 47], zoom: ctx.preview ? 2.6 : 3.2 }),
  });
  await stage.ready(scene);

  serve(stage, 'l7demo-maskdem', (url) => elevationTile(tileOf(url)));

  const layer = new RasterLayer({
    mask: true,
    // The docs fetch a GeoJSON fence; a circle made in code stands in.
    maskfence: disc([12, 47], 6) as never,
  });
  const tileSource = new Source('l7demo-maskdem://tiles', {
    parser: {
      type: 'rasterTile',
      dataType: 'arraybuffer',
      tileSize: 256,
      format: async (data: ArrayBuffer) => readElevation(data),
    },
  });
  layer.source(tileSource).style({
      domain: [0, 8000],
      clampLow: true,
      rampColors: { colors: ['#1b4d7a', '#3d8f6b', '#c9c36b', '#9a6a3d', '#ffffff'], positions: [0, 0.25, 0.5, 0.75, 1] },
    });
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, [12, 47], 2);

  return () => stage.dispose();
};

export default mount;
