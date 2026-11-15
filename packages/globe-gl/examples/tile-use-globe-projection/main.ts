// Tiles: tileUseGlobeProjection true follows the sphere, false is equator-like
import Globe from 'globe.gl';
import { MeshLambertMaterial } from 'three';
import type { Mount } from '@/types.ts';
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
  const stage = createStage(el, ctx, {
    panes: ['tileUseGlobeProjection(true)', 'tileUseGlobeProjection(false)'],
    hint: 'Same 20° tiles. Projected tiles narrow towards the poles; the others keep their equatorial shape and overlap there.',
  });
  const dark = await texture('dark');
  const a = new MeshLambertMaterial({ color: '#3fa7d6', transparent: true, opacity: 0.75 });
  const b = new MeshLambertMaterial({ color: '#f6c85f', transparent: true, opacity: 0.75 });
  stage.onDispose(() => {
    a.dispose();
    b.dispose();
  });
  const tiles = grid(20, 90);

  [true, false].forEach((projected, i) => {
    const globe = stage.own(new Globe(stage.panes[i]!.container), stage.panes[i])
      .globeImageUrl(dark)
      .tilesData(tiles)
      .tileWidth(18)
      .tileHeight(18)
      .tileUseGlobeProjection(projected)
      .tileMaterial((d) => ((d as Tile).row + (d as Tile).col) % 2 ? a : b);
    // Look at a pole, where the two behaviours differ most.
    globe.pointOfView({ lat: 60, lng: 0, altitude: 2.4 });
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 1.2;
  });
  return stage.dispose;
};

export default mount;
