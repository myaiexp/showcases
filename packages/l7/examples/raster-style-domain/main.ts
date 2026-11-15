// Raster layer domain
import { RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cycle } from '../../shared/polygon-data.ts';
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

  const n = ctx.preview ? 64 : 160;
  const layer = new RasterLayer({})
    .source(elevation(n, n), { parser: { type: 'raster', width: n, height: n, extent: EXTENT } })
    .style({ domain: [0, 8000], rampColors: { colors: ['#1b4d7a', '#3d8f6b', '#c9c36b', '#9a6a3d', '#ffffff'], positions: [0, 0.25, 0.5, 0.75, 1] } });
  scene.addLayer(layer);

  const set = (style: Record<string, unknown>): void => {
    layer.style(style);
    scene.render();
  };
  if (stage.bar) {
    let lo = 0;
    let hi = 8000;
    slider(stage.bar, 'domain min', [0, 4000, 100], 0, (v) => set({ domain: [(lo = v), hi] }));
    slider(stage.bar, 'domain max', [4000, 12000, 100], 8000, (v) => set({ domain: [lo, (hi = v)] }));
  } else {
    cycle(stage, scene, [{ domain: [0, 8000] }, { domain: [0, 3000] }, { domain: [2000, 8000] }, { domain: [0, 12000] }] as const, 1000, (v) => set(v));
  }

  return () => stage.dispose();
};

export default mount;
