// RasterLayer rasterRgb: format() reads three bands, operation { type: 'rgb' } stretches them
import { RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { drift } from '../../shared/polygon-data.ts';
import { bands, CENTER, EXTENT, packFile, unpackBand } from '../../shared/raster-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: CENTER, zoom: ctx.preview ? 3.6 : 4.4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const n = ctx.preview ? 64 : 128;
  // One binary "file" of six 16-bit bands, standing in for the GeoTIFF the docs download.
  const file = packFile(n, n, bands(n, n));
  // The docs' format() reads the asked-for bands out of the file's bytes (there with geotiff.js): one { rasterData, width, height } per band.
  // operation { type: 'rgb' } packs the stretched bands into a Uint8Array, so values must already
  // sit in 0-255 (an 8-bit file): the 16-bit sample bands are scaled down here.
  const format = async (data: ArrayBuffer, bandList: number[]) =>
    bandList.map((band) => {
      const b = unpackBand(data, n, n, band);
      return { ...b, rasterData: b.rasterData.map((v) => Math.min(255, v / 40)) };
    });

  // Like the docs' [6, 5, 2].map((v) => v - 1): zero-based band numbers.
  const layer = new RasterLayer({ zIndex: 10 }).source([{ data: file, bands: [3, 2, 1] }], {
    parser: {
      type: 'rasterRgb',
      format,
      operation: { type: 'rgb', options: { countCut: [2, 98] } } as never,
      extent: EXTENT,
    },
  });
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, CENTER, 1.5);

  return () => stage.dispose();
};

export default mount;
