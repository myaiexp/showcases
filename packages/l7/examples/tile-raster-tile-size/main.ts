// RasterLayer rasterTile tileSize matched to the tiles served
import { type ILayer, RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cycle } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { pngTile } from '../../shared/tile-raster.ts';
import { serve, swapTiles, tileOf } from '../../shared/tile-serve.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 47], zoom: ctx.preview ? 2.6 : 3.2 }),
  });
  await stage.ready(scene);

  let size = 256;
  // The handler paints tiles at whatever size the parser promises.
  serve(stage, 'l7demo-tilesize', (url) => pngTile(tileOf(url), { size, note: `${size}px` }));

  const make = (tileSize: number): ILayer => {
    size = tileSize;
    return new RasterLayer().source('l7demo-tilesize://tiles', { parser: { type: 'rasterTile', tileSize } });
  };
  const show = swapTiles(stage, scene);
  show(make(256));

  const set = (tileSize: number): void => {
    show(make(tileSize));
  };
  if (stage.bar) select(stage.bar, 'tileSize', ['128', '256', '512'], '256', (v) => set(Number(v)));
  else cycle(stage, scene, [256, 128, 512], 1700, set);

  return () => stage.dispose();
};

export default mount;
