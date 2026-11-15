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
  serve(stage, 'l7demo-strategy', (url) => pngTile(tileOf(url)), { delay: 600 });

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
    stage.every(1500, (i) => scene.setZoom(i % 2 ? 3.6 : 2.4));
  }

  return () => stage.dispose();
};

export default mount;
