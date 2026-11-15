// RasterLayer: several single-band files merged by one operation
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
  const all = bands(n, n);
  // Two separate "files", one band each: the docs' multiple single-band files forming multi-band.
  const red = packFile(n, n, [all[2] as Float32Array]);
  const nir = packFile(n, n, [all[3] as Float32Array]);
  const format = async (data: ArrayBuffer, bandList: number[]) => bandList.map((band) => unpackBand(data, n, n, band));

  const layer = new RasterLayer({})
    .source(
      [
        { data: red, bands: [0] },
        { data: nir, bands: [0] },
      ],
      {
        parser: {
          type: 'raster',
          format,
          // band 0 is red (first file), band 1 is near-infrared (second file).
          operation: ['/', ['-', ['band', 1], ['band', 0]], ['+', ['band', 1], ['band', 0]]] as unknown as string[],
          extent: EXTENT,
        },
      },
    )
    .style({ domain: [-0.4, 0.6], rampColors: { type: 'linear', colors: ['#7a3b2e', '#d9c27a', '#9bd05a', '#1f7a3a'], positions: [-0.4, 0, 0.2, 0.6] } });
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, CENTER, 1.5);

  return () => stage.dispose();
};

export default mount;
