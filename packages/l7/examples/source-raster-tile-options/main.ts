// Raster tile parser options: tileSize, zoomOffset, zooms and extent
import { type ILayer, RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { pngTile } from '../../shared/tile-raster.ts';
import { serve, tileOf } from '../../shared/tile-serve.ts';
import { worldLayers } from '../../shared/world.ts';

const EXTENTS = { world: [-180, -85.051129, 179, 85.051129], 'Europe only': [-12, 35, 32, 62] } as const;
type Extent = keyof typeof EXTENTS;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 47], zoom: ctx.preview ? 3.4 : 4.2 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // A TMS url in the docs; here a protocol answers with picture tiles labelled z/x/y.
  const asked = new Set<string>();
  serve(stage, 'l7demo-rt-opts', (url) => {
    const t = tileOf(url);
    asked.add(`${t.z}/${t.x}/${t.y}`);
    return pngTile(t);
  });

  const state = { tileSize: 256, zoomOffset: 0, minZoom: 0, maxZoom: 8, extent: 'world' as Extent };
  let layer: ILayer | undefined;
  const build = (): void => {
    if (layer) scene.removeLayer(layer);
    asked.clear();
    layer = new RasterLayer().source('l7demo-rt-opts://tiles', {
      parser: { type: 'rasterTile', tileSize: state.tileSize, zoomOffset: state.zoomOffset, minZoom: state.minZoom, maxZoom: state.maxZoom, extent: [...EXTENTS[state.extent]] },
    });
    scene.addLayer(layer);
    const out = stage.readout();
    if (out) out.textContent = `parser: { type: 'rasterTile', tileSize: ${state.tileSize}, zoomOffset: ${state.zoomOffset}, minZoom: ${state.minZoom}, maxZoom: ${state.maxZoom}, extent: ${state.extent === 'world' ? 'world' : '[-12, 35, 32, 62]'} }`;
  };
  build();
  if (stage.bar) {
    select(stage.bar, 'tileSize', ['256', '512'] as const, '256', (v) => ((state.tileSize = Number(v)), build()));
    select(stage.bar, 'zoomOffset', ['-1', '0', '1'] as const, '0', (v) => ((state.zoomOffset = Number(v)), build()));
    slider(stage.bar, 'minZoom', [0, 6, 1], 0, (v) => ((state.minZoom = v), build()));
    slider(stage.bar, 'maxZoom', [2, 8, 1], 8, (v) => ((state.maxZoom = v), build()));
    select(stage.bar, 'extent', Object.keys(EXTENTS) as Extent[], 'world', (v) => ((state.extent = v), build()));
  } else {
    stage.every(3500, (i) => {
      state.zoomOffset = [0, 1, -1][i % 3] ?? 0;
      state.extent = i % 4 === 3 ? 'Europe only' : 'world';
      build();
    });
    stage.every(70, (i) => scene.setCenter([12 + Math.sin(i / 40) * 3, 47]));
  }

  return () => stage.dispose();
};

export default mount;
