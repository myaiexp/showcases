// RasterLayer rasterTile extent: only tiles inside the box are requested
import { type ILayer, RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
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

  serve(stage, 'l7demo-extent', (url) => pngTile(tileOf(url)));

  const make = (limited: boolean): ILayer =>
    new RasterLayer().source('l7demo-extent://tiles', {
      parser: { type: 'rasterTile', ...(limited ? { extent: [6, 50, 18, 43] } : {}) },
    });
  const show = swapTiles(stage, scene);
  show(make(true));

  const set = (limited: boolean): void => {
    show(make(limited));
  };
  if (stage.bar) toggle(stage.bar, 'extent [6, 50, 18, 43]', true, set);
  else cycle(stage, scene, [true, false], 1600, set);

  return () => stage.dispose();
};

export default mount;
