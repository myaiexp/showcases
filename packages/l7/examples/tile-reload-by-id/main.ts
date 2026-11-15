// source.reloadTilebyId(z, x, y): reload one tile
import { RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { pngTile } from '../../shared/tile-raster.ts';
import { serve, tileOf, whenTiles } from '../../shared/tile-serve.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 47], zoom: ctx.preview ? 2.6 : 3.2 }),
  });
  await stage.ready(scene);

  // Every answer counts how often that tile was fetched: a reload shows as a new colour and count.
  const loads: Record<string, number> = {};
  serve(stage, 'l7demo-reloadid', (url) => {
    const t = tileOf(url);
    const key = `${t.z}/${t.x}/${t.y}`;
    const n = (loads[key] ?? 0) + 1;
    loads[key] = n;
    return pngTile(t, { note: `loaded x${n}`, hue: n * 70 });
  });

  const layer = new RasterLayer().source('l7demo-reloadid://tiles', { parser: { type: 'rasterTile' } });
  scene.addLayer(layer);

  whenTiles(stage, layer, (source) => {
    let k = 0;
    const next = (): void => {
      const tiles = source.tileset.currentTiles;
      const t = tiles[k++ % Math.max(1, tiles.length)];
      if (t) source.reloadTilebyId(t.z, t.x, t.y);
    };
    if (stage.bar) button(stage.bar, 'reload next tile', next);
    else stage.every(900, next);
  });

  return () => stage.dispose();
};

export default mount;
