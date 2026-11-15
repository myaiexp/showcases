// RasterLayer: source bytes plus a parser format() that decodes one band
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
  const format = async (data: ArrayBuffer, bandList: number[]) => bandList.map((band) => unpackBand(data, n, n, band));

  const layer = new RasterLayer({})
    .source([{ data: file, bands: [3] }], {
      parser: { type: 'raster', format, extent: EXTENT },
    })
    .style({ domain: [800, 9000], rampColors: { type: 'linear', colors: ['#10243a', '#2e7d6b', '#c9d46a', '#ffffff'], positions: [800, 3000, 6000, 9000] } });
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, CENTER, 1.5);

  return () => stage.dispose();
};

export default mount;
