// tileset events and properties of a tile source
import { RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
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

  serve(stage, 'l7demo-tileset', (url) => pngTile(tileOf(url)), { delay: 400 });

  const layer = new RasterLayer().source('l7demo-tileset://tiles', { parser: { type: 'rasterTile' } });
  scene.addLayer(layer);

  const out = stage.readout();
  let starts = 0;
  let finishes = 0;
  whenTiles(stage, layer, (source) => {
    const tileSet = source.tileset;
    const show = (state: string): void => {
      if (out) out.textContent = `${state}\nstarts ${starts}, finishes ${finishes}\nisLoaded ${tileSet.isLoaded}, currentZoom ${tileSet.currentZoom}, currentTiles ${tileSet.currentTiles.length}`;
    };
    const onStart = (): void => { starts++; show('tiles-load-start'); };
    const onFinish = (): void => { finishes++; show('tiles-load-finished'); };
    tileSet.on('tiles-load-start', onStart);
    tileSet.on('tiles-load-finished', onFinish);
    stage.own(() => { tileSet.off('tiles-load-start', onStart); tileSet.off('tiles-load-finished', onFinish); });
  });
  // Moving the map is what asks for new tiles.
  drift(stage, scene, [12, 47], 8);

  return () => stage.dispose();
};

export default mount;
