// RasterLayer parser.operation as an array expression over bands
import { type ILayer, RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cycle } from '../../shared/polygon-data.ts';
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

  const ops = {
    "['*', ['band', 1], 0.5]": ['*', ['band', 1], 0.5],
    "['+', ['*', ['band', 0], 0.2], ['band', 1]]": ['+', ['*', ['band', 0], 0.2], ['band', 1]],
    "['/', ['-', ['band', 1], ['band', 0]], ['+', ['band', 1], ['band', 0]]]": ['/', ['-', ['band', 1], ['band', 0]], ['+', ['band', 1], ['band', 0]]],
    "['abs', ['-', ['band', 0], ['band', 1]]]": ['abs', ['-', ['band', 0], ['band', 1]]],
  } as const;
  type Op = keyof typeof ops;
  // Each file entry names the bands it contributes: here bands 2 and 3 (red, near-infrared) become band 0 and 1.
  const make = (op: Op): ILayer => {
    const normalized = op.startsWith("['/'");
    return new RasterLayer({})
      .source([{ data: file, bands: [2, 3] }], {
        parser: { type: 'raster', format, operation: ops[op] as unknown as string[], extent: EXTENT },
      })
      .style(
        normalized
          ? { domain: [-0.4, 0.6], rampColors: { type: 'linear', colors: ['#7a3b2e', '#d9c27a', '#9bd05a', '#1f7a3a'], positions: [-0.4, 0, 0.2, 0.6] } }
          : { domain: [0, 5000], rampColors: { type: 'linear', colors: ['#10243a', '#2e7d6b', '#c9d46a', '#ffffff'], positions: [0, 1000, 2500, 5000] } },
      );
  };
  const names = Object.keys(ops) as Op[];
  let layer = make(names[0] as Op);
  scene.addLayer(layer);

  const set = (op: Op): void => {
    scene.removeLayer(layer);
    layer = make(op);
    scene.addLayer(layer);
  };
  if (stage.bar) select(stage.bar, 'operation', names, names[0] as Op, set);
  else cycle(stage, scene, names, 1500, set);

  return () => stage.dispose();
};

export default mount;
