// RasterLayer data raster tiles: arraybuffer tiles decoded by format() and coloured by a ramp
import { RasterLayer, Scene, Source } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
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

  // Tiles of 16-bit elevations made in code replace the docs' GeoTIFF tiles; format() plays
  // the part of the docs' GeoTIFF decoder.
  serve(stage, 'l7demo-dem', (url) => elevationTile(tileOf(url)));

  const tileSource = new Source('l7demo-dem://tiles', {
    parser: {
      type: 'rasterTile',
      dataType: 'arraybuffer',
      tileSize: 256,
      format: async (data: ArrayBuffer) => readElevation(data),
    },
  });
  const layer = new RasterLayer();
  layer.source(tileSource).style({
      domain: [0, 8000],
      clampLow: true,
      rampColors: { colors: ['#1b4d7a', '#3d8f6b', '#c9c36b', '#9a6a3d', '#ffffff'], positions: [0, 0.25, 0.5, 0.75, 1] },
    });
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, [12, 47], 3);

  return () => stage.dispose();
};

export default mount;
