// Tiles: tileWidth and tileHeight in degrees, constant or stretched by latitude
import Globe from 'globe.gl';
import { MeshLambertMaterial } from 'three';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
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
  const stage = createStage(el, ctx, { hint: 'Width is a span of longitude, height a span of latitude. Stretching the width by 1 / cos(lat) makes tiles equal-sided on the ground.' });
  const dark = await texture('dark');
  const a = new MeshLambertMaterial({ color: '#f08a5d', transparent: true, opacity: 0.85 });
  const b = new MeshLambertMaterial({ color: '#b83b5e', transparent: true, opacity: 0.85 });
  stage.onDispose(() => {
    a.dispose();
    b.dispose();
  });

  const step = 10;
  let size = 8;
  let stretch = false;
  const height = (): number => size;
  const width = (d: object): number => (stretch ? Math.min(40, size / Math.cos(((d as Tile).lat * Math.PI) / 180)) : size);

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .tilesData(grid(step, 75))
    .tileMaterial((d) => (((d as Tile).row + (d as Tile).col) % 2 ? a : b))
    .tileWidth(width)
    .tileHeight(height)
    .tilesTransitionDuration(500);

  globe.pointOfView({ lat: 40, lng: 20, altitude: 2.2 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  const apply = (): void => {
    globe.tileWidth(width).tileHeight(height);
  };
  if (stage.bar) {
    slider(stage.bar, 'Size', 2, 14, 1, size, (v) => {
      size = v;
      apply();
    }, (v) => `${v}°`);
    checkbox(stage.bar, 'Stretch width by 1/cos(lat)', false, (on) => {
      stretch = on;
      apply();
    });
  } else {
    stage.every(2800, () => {
      stretch = !stretch;
      size = stretch ? 8 : 6;
      apply();
    });
  }
  return stage.dispose;
};

export default mount;
