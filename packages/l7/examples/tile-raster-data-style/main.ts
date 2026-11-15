// Data raster tiles restyled live: domain, clamps and ramp colours
import { RasterLayer, Scene, Source } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { cycle } from '../../shared/polygon-data.ts';
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

  let requests = 0;
  serve(stage, 'l7demo-datastyle', (url) => elevationTile(tileOf(url)), { onRequest: () => requests++ });

  const tileSource = new Source('l7demo-datastyle://tiles', {
    parser: { type: 'rasterTile', dataType: 'arraybuffer', tileSize: 256, format: async (data: ArrayBuffer) => readElevation(data) },
  });
  const ramps = {
    terrain: ['#1b4d7a', '#3d8f6b', '#c9c36b', '#9a6a3d', '#ffffff'],
    heat: ['#2b0a3d', '#7b1f6a', '#d9455f', '#f7a23b', '#fff3b0'],
    mono: ['#0b1220', '#2a3f66', '#4f77b8', '#9cc0f0', '#ffffff'],
  } as const;
  type Ramp = keyof typeof ramps;
  const layer = new RasterLayer();
  const apply = (v: { domain: [number, number]; clampLow: boolean; ramp: Ramp }): void => {
    layer.style({ domain: v.domain, clampLow: v.clampLow, clampHigh: v.clampLow, rampColors: { colors: [...ramps[v.ramp]], positions: [0, 0.25, 0.5, 0.75, 1] } });
    scene.render();
  };
  layer.source(tileSource).style({ domain: [0, 8000], clampLow: true, rampColors: { colors: [...ramps.terrain], positions: [0, 0.25, 0.5, 0.75, 1] } });
  scene.addLayer(layer);

  const state = { domain: [0, 8000] as [number, number], clampLow: true, ramp: 'terrain' as Ramp };
  if (stage.bar) {
    slider(stage.bar, 'domain min', [0, 5000, 100], 0, (v) => { state.domain[0] = v; apply(state); });
    slider(stage.bar, 'domain max', [3000, 9000, 100], 8000, (v) => { state.domain[1] = v; apply(state); });
    toggle(stage.bar, 'clamp (draw outside domain)', true, (v) => { state.clampLow = v; apply(state); });
    select(stage.bar, 'ramp', Object.keys(ramps) as Ramp[], 'terrain', (v) => { state.ramp = v; apply(state); });
    const out = stage.readout();
    stage.every(1000, () => { if (out) out.textContent = `tile requests so far: ${requests}`; });
  } else {
    cycle(stage, scene, [
      { domain: [0, 8000], clampLow: true, ramp: 'terrain' },
      { domain: [3000, 6000], clampLow: false, ramp: 'terrain' },
      { domain: [0, 5000], clampLow: true, ramp: 'heat' },
      { domain: [2000, 8000], clampLow: true, ramp: 'mono' },
    ] as const, 1400, (v) => apply({ ...v, domain: [...v.domain] }));
  }

  return () => stage.dispose();
};

export default mount;
