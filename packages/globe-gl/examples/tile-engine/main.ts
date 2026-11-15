// globeTileEngineUrl: cover the globe with slippy-map tiles from a URL function
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { paintedTiles } from '../../shared/tiles.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll to zoom: each tile shows its level/x/y, and deeper levels load as you get closer.' });

  // The function gets slippy-map coordinates and returns an image URL. These URLs are
  // data: images painted on demand; a real map would point at a tile server here.
  const tileUrl = paintedTiles('grid');
  const asked: string[] = [];
  const globe = stage.own(new Globe(stage.container))
    .globeTileEngineUrl((x, y, l) => {
      asked.push(`${l}/${x}/${y}`);
      return tileUrl(x, y, l);
    })
    .showAtmosphere(false);
  globe.pointOfView({ lat: 50, lng: 10, altitude: 2 });

  const log = stage.bar && readout(stage.box);
  if (log) stage.every(500, () => (log.textContent = `${asked.length} tiles requested, latest: ${asked.slice(-4).join(', ')}`));

  if (stage.preview) {
    // Dive towards Europe and back out, so the card shows level 2 giving way to level 3.
    let near = false;
    stage.every(3000, () => {
      near = !near;
      globe.pointOfView({ lat: 50, lng: 10, altitude: near ? 1.1 : 2.2 }, 2500);
    });
  }

  return stage.dispose;
};

export default mount;
