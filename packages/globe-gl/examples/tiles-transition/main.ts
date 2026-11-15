// Tiles: tilesTransitionDuration animates tiles growing, rising and resizing
import Globe from 'globe.gl';
import { MeshLambertMaterial } from 'three';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { rng } from '../../shared/places.ts';
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
  const stage = createStage(el, ctx, { hint: 'Every three seconds each tile picks a new altitude and size; the layer morphs between them.' });
  const dark = await texture('dark');
  const mat = new MeshLambertMaterial({ color: '#8ecae6', transparent: true, opacity: 0.85 });
  stage.onDispose(() => mat.dispose());

  const tiles = grid(12);
  let alts: number[] = [];
  let sizes: number[] = [];
  let round = 0;
  const reroll = (): void => {
    const rand = rng(500 + round++);
    alts = tiles.map(() => 0.005 + rand() ** 2 * 0.12);
    sizes = tiles.map(() => 4 + rand() * 7.5);
    globe
      .tileAltitude((d) => alts[tiles.indexOf(d as Tile)]!)
      .tileWidth((d) => sizes[tiles.indexOf(d as Tile)]!)
      .tileHeight((d) => sizes[tiles.indexOf(d as Tile)]!);
  };

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .tilesData(tiles)
    .tileMaterial(mat)
    .tilesTransitionDuration(1500);
  reroll();

  globe.pointOfView({ lat: 20, lng: 20, altitude: 2.3 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  stage.every(3200, reroll);
  if (stage.bar) {
    slider(stage.bar, 'Transition', 0, 4000, 100, 1500, (v) => globe.tilesTransitionDuration(v), (v) => `${v} ms`);
    button(stage.bar, 'Change now', reroll);
  }
  return stage.dispose;
};

export default mount;
