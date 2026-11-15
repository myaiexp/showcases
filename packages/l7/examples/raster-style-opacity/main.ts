// Raster layer opacity
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
    .style({ opacity: 1, domain: [0, 8000], rampColors: { colors: ['#1b4d7a', '#3d8f6b', '#c9c36b', '#9a6a3d', '#ffffff'], positions: [0, 0.25, 0.5, 0.75, 1] } });
  scene.addLayer(layer);

  const set = (style: Record<string, unknown>): void => {
    layer.style(style);
    scene.render();
  };
  if (stage.bar) {
    slider(stage.bar, 'opacity', [0, 1, 0.05], 1, (opacity) => set({ opacity }));
  } else {
    cycle(stage, scene, [{ opacity: 1 }, { opacity: 0.5 }, { opacity: 0.15 }, { opacity: 0.8 }], 1000, (v) => set(v));
  }

  return () => stage.dispose();
};

export default mount;
