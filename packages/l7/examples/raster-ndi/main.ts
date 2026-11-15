// RasterLayer source type 'ndi': a vegetation index from red and near-infrared
import { RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { drift } from '../../shared/polygon-data.ts';
import { bands, CENTER, EXTENT } from '../../shared/raster-data.ts';
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
  const data = bands(n, n);
  // bands [2, 3] = red and near-infrared of the generated bands (counted from zero).
  const layer = new RasterLayer({})
    .source(data, { parser: { type: 'ndi', width: n, height: n, bands: [2, 3], extent: EXTENT } })
    .style({ domain: [-0.4, 0.6], rampColors: { type: 'linear', colors: ['#7a3b2e', '#d9c27a', '#9bd05a', '#1f7a3a'], positions: [-0.4, 0, 0.2, 0.6] } });
  scene.addLayer(layer);

  if (ctx.preview) drift(stage, scene, CENTER, 1.5);

  return () => stage.dispose();
};

export default mount;
