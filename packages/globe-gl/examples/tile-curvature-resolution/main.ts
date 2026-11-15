// Tiles: tileCurvatureResolution, big wireframe tiles cut coarsely and finely
import Globe from 'globe.gl';
import { MeshBasicMaterial } from 'three';
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
  const stage = createStage(el, ctx, {
    panes: ['curvature 30°', 'curvature 3°'],
    hint: 'Wireframe tiles of 40° show how many faces approximate the curved surface. Coarse ones turn into flat plates.',
  });
  const dark = await texture('dark');
  const wire = new MeshBasicMaterial({ color: '#ffd166', wireframe: true });
  stage.onDispose(() => wire.dispose());
  const tiles = grid(45, 60).filter((t) => t.col < 8);

  const globes = [30, 3].map((res, i) => {
    const globe = stage.own(new Globe(stage.panes[i]!.container), stage.panes[i])
      .globeImageUrl(dark)
      .tilesData(tiles)
      .tileWidth(40)
      .tileHeight(40)
      .tileAltitude(0.04)
      .tileMaterial(wire)
      .tileCurvatureResolution(res);
    globe.pointOfView({ lat: 10, lng: 20, altitude: 2.2 });
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.6;
    return globe;
  });

  if (stage.bar) {
    slider(stage.bar, 'Left pane', 1, 45, 1, 30, (v) => {
      globes[0]!.tileCurvatureResolution(v);
      stage.panes[0]!.caption!.textContent = `curvature ${v}°`;
    }, (v) => `${v}°`);
  }
  return stage.dispose;
};

export default mount;
