// source.reloadTileByLnglat(lng, lat, zoom): reload the tile under a point
import { RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { drift } from '../../shared/polygon-data.ts';
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
  serve(stage, 'l7demo-reloadlnglat', (url) => {
    const t = tileOf(url);
    const key = `${t.z}/${t.x}/${t.y}`;
    const n = (loads[key] ?? 0) + 1;
    loads[key] = n;
    return pngTile(t, { note: `loaded x${n}`, hue: n * 70 });
  });

  const layer = new RasterLayer().source('l7demo-reloadlnglat://tiles', { parser: { type: 'rasterTile' } });
  scene.addLayer(layer);

  whenTiles(stage, layer, (source) => {
    const reload = (): void => {
      const c = scene.getCenter();
      source.reloadTileByLnglat(c.lng, c.lat, source.tileset.currentZoom);
    };
    if (stage.bar) button(stage.bar, 'reload the tile at the centre', reload);
    else {
      stage.every(2200, reload);
      drift(stage, scene, [12, 47], 2.5);
    }
  });

  return () => stage.dispose();
};

export default mount;
