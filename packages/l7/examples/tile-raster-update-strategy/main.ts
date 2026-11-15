// RasterLayer rasterTile updateStrategy with slow tiles
import { type ILayer, RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
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

  // A pretend latency makes the difference between the strategies visible.
  serve(stage, 'l7demo-strategy', (url) => pngTile(tileOf(url)), { delay: ctx.preview ? 300 : 600 });

  const make = (updateStrategy: 'realtime' | 'overlap' | 'replace'): ILayer =>
    new RasterLayer().source('l7demo-strategy://tiles', { parser: { type: 'rasterTile', updateStrategy } });
  const show = swapTiles(stage, scene);
  show(make('replace'));

  const set = (s: 'realtime' | 'overlap' | 'replace'): void => {
    show(make(s));
  };
  if (stage.bar) {
    select(stage.bar, 'updateStrategy', ['replace', 'overlap', 'realtime'] as const, 'replace', set);
    slider(stage.bar, 'map zoom', [1.5, 5, 0.2], 2.6, (z) => scene.setZoom(z));
  } else {
    set('overlap');
    // Long enough between zooms for the slow tiles to arrive before the next change.
    stage.every(3500, (i) => scene.setZoom(i % 2 ? 3.4 : 2.6));
  }

  return () => stage.dispose();
};

export default mount;
