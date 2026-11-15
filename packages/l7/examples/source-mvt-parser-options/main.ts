// MVT parser options tileSize, zoomOffset, minZoom, maxZoom and extent
import { type ILayer, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { encodeTile } from '../../shared/tile-mvt.ts';
import { serve, tileOf } from '../../shared/tile-serve.ts';
import { countryTiles } from '../../shared/source-demo.ts';
import { worldLayers } from '../../shared/world.ts';

const WORLD: [number, number, number, number] = [-180, -85.051129, 179, 85.051129];
const ALPS: [number, number, number, number] = [4, 43, 18, 49];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [11, 47], zoom: ctx.preview ? 3.4 : 4.2 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // The docs' URL is a tile server; this protocol answers with MVT tiles encoded in code.
  const asked = new Map2();
  serve(stage, 'l7demo-mvt-opts', (url) => {
    const t = tileOf(url);
    asked.add(t.z, `${t.z}/${t.x}/${t.y}`);
    return encodeTile(t, { countries: countryTiles });
  });

  const state = { tileSize: 256, zoomOffset: 0, maxZoom: 9, extent: 'world' as 'world' | 'Alps only' };
  let layer: ILayer | undefined;
  const build = (): void => {
    if (layer) scene.removeLayer(layer);
    asked.clear();
    layer = new PolygonLayer({ featureId: 'id', sourceLayer: 'countries' })
      .source('l7demo-mvt-opts://tiles', {
        parser: { type: 'mvt', tileSize: state.tileSize, zoomOffset: state.zoomOffset, minZoom: 0, maxZoom: state.maxZoom, extent: state.extent === 'world' ? WORLD : ALPS },
      })
      .color('id', ['#4ecdc4', '#ffd166', '#ff6b6b', '#7fb7ff', '#c792ea'])
      .style({ opacity: 0.8 });
    scene.addLayer(layer);
  };
  build();
  const report = (): void => {
    const out = stage.readout();
    if (out)
      out.textContent = `parser: { type: 'mvt', tileSize: ${state.tileSize}, zoomOffset: ${state.zoomOffset}, minZoom: 0, maxZoom: ${state.maxZoom}, extent: ${state.extent === 'world' ? 'world' : '[4, 43, 18, 49]'} }\ntiles asked for, by z: ${asked.summary() || 'none yet'}`;
  };
  stage.every(500, report);
  if (stage.bar) {
    select(stage.bar, 'tileSize', ['256', '512'] as const, '256', (v) => ((state.tileSize = Number(v)), build()));
    select(stage.bar, 'zoomOffset', ['-1', '0', '1'] as const, '0', (v) => ((state.zoomOffset = Number(v)), build()));
    slider(stage.bar, 'maxZoom', [1, 9, 1], 9, (v) => ((state.maxZoom = v), build()));
    select(stage.bar, 'extent', ['world', 'Alps only'] as const, 'world', (v) => ((state.extent = v), build()));
  } else {
    // Cards: step through the options; the map drifts a little.
    stage.every(3500, (i) => {
      state.zoomOffset = [0, 1, -1][i % 3] ?? 0;
      state.extent = i % 4 === 3 ? 'Alps only' : 'world';
      build();
    });
    stage.every(70, (i) => scene.setCenter([11 + Math.sin(i / 40) * 3, 47]));
  }

  return () => stage.dispose();
};

export default mount;

/** Tiles by zoom level, counted once each. */
class Map2 {
  private byZoom = new globalThis.Map<number, Set<string>>();
  add(z: number, id: string): void {
    const set = this.byZoom.get(z) ?? new Set<string>();
    set.add(id);
    this.byZoom.set(z, set);
  }
  clear(): void {
    this.byZoom.clear();
  }
  summary(): string {
    return [...this.byZoom.entries()].sort(([a], [b]) => a - b).map(([z, s]) => `z${z}: ${s.size}`).join(', ');
  }
}
