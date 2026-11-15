// Click events on data raster tiles carry value
import { RasterLayer, Scene, Source } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { tour } from '../../shared/layer-demo.ts';
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

  serve(stage, 'l7demo-click', (url) => elevationTile(tileOf(url)));

  const tileSource = new Source('l7demo-click://tiles', {
    parser: { type: 'rasterTile', dataType: 'arraybuffer', tileSize: 256, format: async (data: ArrayBuffer) => readElevation(data) },
  });
  const layer = new RasterLayer();
  layer.source(tileSource).style({
    domain: [0, 8000],
    clampLow: true,
    rampColors: { colors: ['#1b4d7a', '#3d8f6b', '#c9c36b', '#9a6a3d', '#ffffff'], positions: [0, 0.25, 0.5, 0.75, 1] },
  });
  scene.addLayer(layer);

  const out = stage.readout();
  layer.on('click', (e: { value?: number; lngLat?: { lng: number; lat: number } }) => {
    if (out) out.textContent = `value: ${e.value}\nlngLat: ${e.lngLat?.lng.toFixed(2)}, ${e.lngLat?.lat.toFixed(2)}`;
  });
  if (ctx.preview) tour(stage, scene, [[8, 48], [14, 46], [18, 50], [4, 44]], { clickEvery: 1 });

  return () => stage.dispose();
};

export default mount;
