// RasterLayer source type 'rgb': pick which three bands feed R, G and B
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
  // Six generated bands (a made-up scene of water, forest and rock) stand in for the docs' Landsat GeoTIFF.
  const data = bands(n, n);
  const combos = { '3,2,1': [3, 2, 1], '4,3,2': [4, 3, 2], '5,4,2': [5, 4, 2], '2,1,0': [2, 1, 0] } as const;
  type Combo = keyof typeof combos;
  const make = (c: Combo): ILayer =>
    new RasterLayer({}).source(data, {
      parser: { type: 'rgb', width: n, height: n, bands: [...combos[c]], extent: EXTENT },
    });
  let layer = make('3,2,1');
  scene.addLayer(layer);

  const set = (c: Combo): void => {
    scene.removeLayer(layer);
    layer = make(c);
    scene.addLayer(layer);
  };
  if (stage.bar) select(stage.bar, 'bands [R,G,B]', Object.keys(combos) as Combo[], '3,2,1', set);
  else cycle(stage, scene, Object.keys(combos) as Combo[], 1300, set);

  return () => stage.dispose();
};

export default mount;
