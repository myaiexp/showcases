// RasterLayer parser.operation { type: 'nd' }: normalized index shortcut
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
    .source([{ data: file, bands: [2, 3] }], {
      parser: { type: 'raster', format, operation: { type: 'nd' }, extent: EXTENT },
    })
    .style({ domain: [-0.4, 0.6], rampColors: { type: 'linear', colors: ['#7a3b2e', '#d9c27a', '#9bd05a', '#1f7a3a'], positions: [-0.4, 0, 0.2, 0.6] } });
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, CENTER, 1.5);

  return () => stage.dispose();
};

export default mount;
