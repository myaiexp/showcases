// Tile source tileset events and the reload methods
import { type ILayer, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { eventBoard, valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { encodeTile } from '../../shared/tile-mvt.ts';
import { serve, tileOf } from '../../shared/tile-serve.ts';
import { countryTiles } from '../../shared/source-demo.ts';
import { worldLayers } from '../../shared/world.ts';

type TileSet = { isLoaded: boolean; currentTiles: unknown[]; currentZoom: number; on(e: string, fn: () => void): void; off(e: string, fn: () => void): void };
type TileSource = {
  tileset?: TileSet;
  reloadAllTile(): void;
  reloadTilebyId(z: number, x: number, y: number): void;
  reloadTileByExtent(extent: [number, number, number, number], zoom: number): void;
  reloadTileByLnglat(lng: number, lat: number, zoom: number): void;
};

const CENTER: [number, number] = [11, 47];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: CENTER, zoom: ctx.preview ? 3.4 : 4.2 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // Dynamic tiles: every answer carries the current version, which shifts each country's 'level'.
  let version = 0;
  serve(stage, 'l7demo-reload', (url) => {
    const level = (id: number): number => (id + version) % 5;
    const fc = { ...countryTiles, features: countryTiles.features.map((f) => ({ ...f, properties: { ...f.properties, level: level(Number(f.properties?.id)) } })) };
    return encodeTile(tileOf(url), { countries: fc });
  }, { delay: 120 });
  const layer: ILayer = new PolygonLayer({ featureId: 'id', sourceLayer: 'countries' })
    .source('l7demo-reload://tiles', { parser: { type: 'mvt', maxZoom: 9 } })
    .color('level', ['#0b3d5c', '#3aa6a8', '#7fd1b9', '#ffd166', '#ff6b6b'])
    .style({ opacity: 0.85 });
  scene.addLayer(layer);

  const flash = eventBoard(stage.container, ['tiles-load-start', 'tiles-load-finished']);
  const show = valuePanel(stage.container, 'bl');
  const source = (): TileSource => layer.getSource() as unknown as TileSource;
  let wired = false;
  const wire = (): void => {
    const ts = source().tileset;
    if (!ts || wired) return;
    wired = true;
    const start = (): void => flash('tiles-load-start');
    const done = (): void => flash('tiles-load-finished');
    ts.on('tiles-load-start', start);
    ts.on('tiles-load-finished', done);
    stage.own(() => {
      ts.off('tiles-load-start', start);
      ts.off('tiles-load-finished', done);
    });
  };
  // The tileset exists once the layer has initialised.
  layer.once('inited', wire);
  stage.every(300, () => {
    wire();
    const ts = source().tileset;
    if (ts) show({ 'tileset.isLoaded': String(ts.isLoaded), 'currentTiles': String(ts.currentTiles.length), 'currentZoom': String(ts.currentZoom), version: String(version) });
  });

  const zoom = (): number => Math.round(scene.getZoom());
  const actions: [string, () => void][] = [
    ['reloadAllTile()', () => source().reloadAllTile()],
    ['reloadTilebyId(z, x, y)', () => {
      const z = zoom();
      const n = 2 ** z;
      const x = Math.floor(((CENTER[0] + 180) / 360) * n);
      const lat = (CENTER[1] * Math.PI) / 180;
      const y = Math.floor(((1 - Math.log(Math.tan(lat) + 1 / Math.cos(lat)) / Math.PI) / 2) * n);
      source().reloadTilebyId(z, x, y);
    }],
    ['reloadTileByExtent(extent, zoom)', () => source().reloadTileByExtent([4, 43, 18, 52], zoom())],
    ['reloadTileByLnglat(lng, lat, zoom)', () => source().reloadTileByLnglat(CENTER[0], CENTER[1], zoom())],
  ];
  const out = stage.readout();
  const run = ([label, fn]: [string, () => void]): void => {
    version += 1;
    fn();
    if (out) out.textContent = `${label}: the server's data changed (version ${version}); only the reloaded tiles show it`;
  };
  if (out) out.textContent = 'Each button changes what the tile server answers, then reloads some tiles.';
  if (stage.bar) for (const a of actions) button(stage.bar, a[0], () => run(a));
  else stage.every(3500, (i) => run(actions[i % actions.length] ?? actions[0] ?? ['', () => undefined]));

  return () => stage.dispose();
};

export default mount;
