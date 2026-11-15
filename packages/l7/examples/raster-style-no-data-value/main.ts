// RasterLayer noDataValue: a sentinel patch of -9999 hidden or drawn
import { RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
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
  const grid = elevation(n, n);
  // A hole of the no-data marker, as satellite files carry over sea or outside the swath.
  for (let y = n * 0.3; y < n * 0.65; y++) for (let x = n * 0.35; x < n * 0.7; x++) grid[Math.floor(y) * n + Math.floor(x)] = -9999;
  const layer = new RasterLayer({})
    .source(grid, { parser: { type: 'raster', width: n, height: n, extent: EXTENT } })
    .style({ domain: [0, 8000], noDataValue: -9999, rampColors: { colors: ['#1b4d7a', '#3d8f6b', '#c9c36b', '#9a6a3d', '#ffffff'], positions: [0, 0.25, 0.5, 0.75, 1] } });
  scene.addLayer(layer);

  const set = (noDataValue: number): void => {
    layer.style({ noDataValue });
    scene.render();
  };
  if (stage.bar) toggle(stage.bar, 'noDataValue: -9999', true, (on) => set(on ? -9999 : -1));
  else cycle(stage, scene, [-9999, -1] as const, 1200, set);

  return () => stage.dispose();
};

export default mount;
