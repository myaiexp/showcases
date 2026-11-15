// RasterLayer ndi source: choosing the band pair
import { type ILayer, RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cycle } from '../../shared/polygon-data.ts';
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
  const pairs = { 'red/nir [2,3]': [2, 3], 'green/nir [1,3]': [1, 3], 'nir/swir1 [3,4]': [3, 4], 'blue/red [0,2]': [0, 2] } as const;
  type Pair = keyof typeof pairs;
  const make = (p: Pair): ILayer =>
    new RasterLayer({})
      .source(data, { parser: { type: 'ndi', width: n, height: n, bands: [...pairs[p]], extent: EXTENT } })
      .style({ domain: [-0.6, 0.6], rampColors: { type: 'linear', colors: ['#7a3b2e', '#d9c27a', '#9bd05a', '#1f7a3a'], positions: [-0.6, -0.1, 0.2, 0.6] } });
  let layer = make('red/nir [2,3]');
  scene.addLayer(layer);

  const set = (p: Pair): void => {
    scene.removeLayer(layer);
    layer = make(p);
    scene.addLayer(layer);
  };
  const names = Object.keys(pairs) as Pair[];
  if (stage.bar) select(stage.bar, 'bands', names, names[0] as Pair, set);
  else cycle(stage, scene, names, 1300, set);

  return () => stage.dispose();
};

export default mount;
