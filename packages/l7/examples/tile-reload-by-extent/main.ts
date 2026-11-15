// source.reloadTileByExtent(extent, zoom): reload the tiles over a box
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
  serve(stage, 'l7demo-reloadext', (url) => {
    const t = tileOf(url);
    const key = `${t.z}/${t.x}/${t.y}`;
    const n = (loads[key] ?? 0) + 1;
    loads[key] = n;
    return pngTile(t, { note: `loaded x${n}`, hue: n * 70 });
  });

  const layer = new RasterLayer().source('l7demo-reloadext://tiles', { parser: { type: 'rasterTile' } });
  scene.addLayer(layer);

  whenTiles(stage, layer, (source) => {
    const reload = (): void => {
      // The level of the tiles on screen, and a box over the north of the map.
      const zoom = source.tileset.currentZoom;
      const b = scene.getBounds();
      const north = b[1][1] - (b[1][1] - b[0][1]) / 3;
      source.reloadTileByExtent([b[0][0], north, b[1][0], b[1][1]], zoom);
    };
    if (stage.bar) button(stage.bar, 'reload the north third', reload);
    else stage.every(1800, reload);
  });

  return () => stage.dispose();
};

export default mount;
