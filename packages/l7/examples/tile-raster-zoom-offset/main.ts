// RasterLayer rasterTile parser zoomOffset: which tile level is requested
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

  serve(stage, 'l7demo-zoomoffset', (url) => pngTile(tileOf(url)));

  const make = (zoomOffset: number): ILayer =>
    new RasterLayer().source('l7demo-zoomoffset://tiles', { parser: { type: 'rasterTile', zoomOffset } });
  const show = swapTiles(stage, scene);
  show(make(0));

  const set = (zoomOffset: number): void => {
    show(make(zoomOffset));
  };
  if (stage.bar) select(stage.bar, 'zoomOffset', ['-1', '0', '1', '2'], '0', (v) => set(Number(v)));
  else cycle(stage, scene, [0, 1, -1, 2], 1600, set);

  return () => stage.dispose();
};

export default mount;
