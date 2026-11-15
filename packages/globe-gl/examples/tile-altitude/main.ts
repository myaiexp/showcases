// Tiles: tileAltitude as a function of position makes a rippled tile surface
import Globe from 'globe.gl';
import { MeshLambertMaterial } from 'three';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
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
  const stage = createStage(el, ctx, { hint: 'Height is a function of each tile’s latitude and longitude; the slider scales the ripple.' });
  const dark = await texture('dark');
  const mat = new MeshLambertMaterial({ color: '#7bdff2' });
  stage.onDispose(() => mat.dispose());

  let amplitude = 0.08;
  const altitude = (d: object): number => {
    const { lat, lng } = d as Tile;
    return 0.005 + amplitude * (0.5 + 0.5 * Math.sin((lng * Math.PI) / 30) * Math.cos((lat * Math.PI) / 90));
  };

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .tilesData(grid(10))
    .tileWidth(9)
    .tileHeight(9)
    .tileMaterial(mat)
    .tileAltitude(altitude)
    .tilesTransitionDuration(600);

  globe.pointOfView({ lat: 15, lng: 20, altitude: 2.2 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  const steps = [0.02, 0.15, 0.08];
  let i = 0;
  const set = (v: number): void => {
    amplitude = v;
    globe.tileAltitude(altitude);
  };
  if (stage.bar) {
    slider(stage.bar, 'Ripple height', 0, 0.2, 0.01, amplitude, set, (v) => v.toFixed(2));
  } else {
    stage.every(3000, () => set(steps[i++ % steps.length]!));
  }
  return stage.dispose;
};

export default mount;
