// Tiles: onTileHover lifts the hovered tile, tileLabel names it, onTileClick
import Globe from 'globe.gl';
import { MeshLambertMaterial } from 'three';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Tile {
  name: string;
  lat: number;
  lng: number;
  row: number;
  col: number;
}

/** Tile centres for a grid of `step`-degree cells, leaving out the polar caps. */
function grid(step: number, maxLat = 80): Tile[] {
  const tiles: Tile[] = [];
  let row = 0;
  for (let lat = -90 + step / 2; lat < maxLat; lat += step, row++) {
    let col = 0;
    for (let lng = -180 + step / 2; lng < 180; lng += step, col++) {
      tiles.push({ name: `row ${row}, col ${col}`, lat, lng, row, col });
    }
  }
  return tiles;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a tile to lift and light it; click to fly there.' });
  const dark = await texture('dark');
  const log = stage.bar && readout(stage.bar, 'Hover or click a tile');
  const plain = new MeshLambertMaterial({ color: '#3a7ca5' });
  const lit = new MeshLambertMaterial({ color: '#ffd166' });
  stage.onDispose(() => {
    plain.dispose();
    lit.dispose();
  });

  let hovered: Tile | null = null;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .tilesData(grid(15))
    .tileWidth(13.5)
    .tileHeight(13.5)
    .tileAltitude((d) => ((d as Tile) === hovered ? 0.12 : 0.01))
    .tileMaterial((d) => ((d as Tile) === hovered ? lit : plain))
    .tilesTransitionDuration(250)
    .tileLabel((d) => `${(d as Tile).name}<br>${(d as Tile).lat.toFixed(1)}, ${(d as Tile).lng.toFixed(1)}`)
    .onTileHover((tile) => {
      hovered = tile as Tile | null;
      globe.tileAltitude(globe.tileAltitude()).tileMaterial(globe.tileMaterial());
      if (log) log.textContent = hovered ? `Hovering ${hovered.name}` : 'Hover or click a tile';
    })
    .onTileClick((tile, _event, { altitude }) => {
      const t = tile as Tile;
      globe.pointOfView({ lat: t.lat, lng: t.lng, altitude: 1.3 }, 1000);
      if (log) log.textContent = `Clicked ${t.name} (altitude ${altitude.toFixed(2)})`;
    });
  globe.pointOfView({ lat: 20, lng: 20, altitude: 2.3 });

  if (stage.preview) {
    const ghost = stage.ghost(globe);
    const picks: [number, number][] = [[7.5, 22.5], [37.5, 52.5], [-22.5, -67.5], [22.5, 112.5]];
    let i = 0;
    stage.every(2600, () => {
      const [lat, lng] = picks[i++ % picks.length]!;
      globe.pointOfView({ lat: lat - 8, lng, altitude: 2.3 }, 600);
      stage.after(800, () => ghost.at(lat, lng, 0.01));
      stage.after(1300, () => ghost.click());
      stage.after(2300, () => ghost.leave());
    });
  }
  return stage.dispose;
};

export default mount;
