// Tiles: tilesData lays a grid of spherical tiles from lat, lng, width and height
import Globe from 'globe.gl';
import { MeshLambertMaterial } from 'three';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
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
  const stage = createStage(el, ctx, { hint: 'Each tile is one data object with a centre, a size in degrees and a material. Tiles side by side form a tiled surface.' });
  const dark = await texture('dark');

  const mats = new Map<string, MeshLambertMaterial>();
  const material = (color: string): MeshLambertMaterial => {
    let m = mats.get(color);
    if (!m) mats.set(color, (m = new MeshLambertMaterial({ color, transparent: true, opacity: 0.8 })));
    return m;
  };
  stage.onDispose(() => mats.forEach((m) => m.dispose()));

  let step = 12;
  const draw = (): void => {
    globe
      .tilesData(grid(step))
      .tileWidth(step * 0.92)
      .tileHeight(step * 0.92)
      .tileMaterial((d) => {
        const t = d as Tile;
        return material((t.row + t.col) % 2 ? '#3fa7d6' : '#f6c85f');
      });
  };

  // tileLat and tileLng default to the `lat` and `lng` fields.
  const globe = stage.own(new Globe(stage.container)).globeImageUrl(dark);
  draw();

  globe.pointOfView({ lat: 25, lng: 20, altitude: 2.4 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  if (stage.bar) {
    select(stage.bar, 'Tile size', ['6°', '12°', '20°', '30°'] as const, (v) => {
      step = parseInt(v, 10);
      draw();
    }, '12°');
  }
  return stage.dispose;
};

export default mount;
