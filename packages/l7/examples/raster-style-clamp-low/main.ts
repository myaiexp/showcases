// Raster layer clampLow
import { RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
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
    .style({ clampLow: false, domain: [0, 8000], rampColors: { colors: ['#1b4d7a', '#3d8f6b', '#c9c36b', '#9a6a3d', '#ffffff'], positions: [0, 0.25, 0.5, 0.75, 1] } });
  scene.addLayer(layer);

  const set = (style: Record<string, unknown>): void => {
    layer.style(style);
    scene.render();
  };
  if (stage.bar) {
    let low = 2000;
    let clamp = false;
    const apply = (): void => set({ clampLow: clamp, domain: [low, 8000] });
    toggle(stage.bar, 'clampLow', false, (v) => { clamp = v; apply(); });
    slider(stage.bar, 'domain min', [0, 6000, 100], 2000, (v) => { low = v; apply(); });
    apply();
  } else {
    cycle(stage, scene, [{ clampLow: false, domain: [2000, 8000] }, { clampLow: true, domain: [2000, 8000] }, { clampLow: true, domain: [4000, 8000] }, { clampLow: false, domain: [4000, 8000] }], 1000, (v) => set(v));
  }

  return () => stage.dispose();
};

export default mount;
