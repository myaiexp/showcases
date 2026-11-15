// rampColors type 'custom': colours between user-set breaks
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
      rampColors: {
        type: 'custom',
        colors: ['#f0f9e8', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac'],
        positions: [0, 200, 1000, 4000, 8000, 10000],
      },
    });
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, CENTER, 1.5);

  return () => stage.dispose();
};

export default mount;
