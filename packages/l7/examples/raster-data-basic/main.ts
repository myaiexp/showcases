// RasterLayer: a Float32Array band coloured by a 0-1 ramp over the domain
import { RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { drift } from '../../shared/polygon-data.ts';
import { CENTER, elevation, EXTENT } from '../../shared/raster-data.ts';
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

  // A generated elevation grid (0..8000) stands in for the docs' GeoTIFF: no fetch.
  const n = ctx.preview ? 64 : 160;
  const layer = new RasterLayer({})
    .source(elevation(n, n), { parser: { type: 'raster', width: n, height: n, extent: EXTENT } })
    .style({
      domain: [0, 8000],
      rampColors: { colors: ['#1b4d7a', '#3d8f6b', '#c9c36b', '#9a6a3d', '#ffffff'], positions: [0, 0.25, 0.5, 0.75, 1] },
    });
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, CENTER, 1.5);

  return () => stage.dispose();
};

export default mount;
