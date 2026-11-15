// Tiles: tileMaterial gives each tile any three.js material, matte to wireframe
import Globe from 'globe.gl';
import { Color, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial } from 'three';
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
  const stage = createStage(el, ctx, { hint: 'Tiles cycle through four materials: matte, glossy, unlit and wireframe.' });
  const dark = await texture('dark');

  const color = (t: Tile): Color => new Color().setHSL((t.col * 0.045) % 1, 0.7, 0.55);
  const kinds = {
    'mixed': (t: Tile) => [
      new MeshLambertMaterial({ color: color(t) }),
      new MeshPhongMaterial({ color: color(t), shininess: 120, specular: new Color('#ffffff') }),
      new MeshBasicMaterial({ color: color(t) }),
      new MeshBasicMaterial({ color: color(t), wireframe: true }),
    ][(t.row + t.col) % 4]!,
    'all wireframe': (t: Tile) => new MeshBasicMaterial({ color: color(t), wireframe: true }),
    'all translucent': (t: Tile) => new MeshLambertMaterial({ color: color(t), transparent: true, opacity: 0.4 }),
  };
  type Kind = keyof typeof kinds;

  // Materials are built once per tile and kept, then disposed on cleanup.
  const tiles = grid(15);
  const cache = new Map<Kind, Map<Tile, ReturnType<(typeof kinds)[Kind]>>>();
  const material = (kind: Kind) => (d: object) => {
    let m = cache.get(kind);
    if (!m) cache.set(kind, (m = new Map()));
    let mat = m.get(d as Tile);
    if (!mat) m.set(d as Tile, (mat = kinds[kind](d as Tile)));
    return mat;
  };
  stage.onDispose(() => cache.forEach((m) => m.forEach((mat) => mat.dispose())));

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .tilesData(tiles)
    .tileWidth(13.5)
    .tileHeight(13.5)
    .tileAltitude(0.02)
    .tileMaterial(material('mixed'));

  globe.pointOfView({ lat: 25, lng: 20, altitude: 2.3 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.7;

  const names = Object.keys(kinds) as Kind[];
  if (stage.bar) {
    select(stage.bar, 'Materials', names, (v) => globe.tileMaterial(material(v)));
  } else {
    let i = 0;
    stage.every(3500, () => globe.tileMaterial(material(names[++i % names.length]!)));
  }
  return stage.dispose;
};

export default mount;
