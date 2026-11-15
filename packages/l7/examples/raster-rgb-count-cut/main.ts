// RasterLayer rgb source: countCut percentile stretch
import { type ILayer, RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
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
  const make = (low: number, high: number): ILayer =>
    new RasterLayer({}).source(data, {
      parser: { type: 'rgb', width: n, height: n, bands: [3, 2, 1], countCut: [low, high], extent: EXTENT },
    });
  let low = 2;
  let high = 98;
  let layer = make(low, high);
  scene.addLayer(layer);

  // countCut is read when the source parses, so each change builds a new layer.
  const redo = (): void => {
    scene.removeLayer(layer);
    layer = make(low, high);
    scene.addLayer(layer);
  };
  if (stage.bar) {
    slider(stage.bar, 'low %', [0, 40, 1], 2, (v) => { low = v; redo(); });
    slider(stage.bar, 'high %', [60, 100, 1], 98, (v) => { high = v; redo(); });
  } else {
    cycle(stage, scene, [[2, 98], [20, 80], [0, 100], [35, 65]] as const, 1300, ([l, h]) => { low = l; high = h; redo(); });
  }

  return () => stage.dispose();
};

export default mount;
