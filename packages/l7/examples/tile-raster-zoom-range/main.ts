// RasterLayer rasterTile minZoom/maxZoom: tile levels stop at the bounds
import { RasterLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cycle } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { pngTile } from '../../shared/tile-raster.ts';
import { serve, tileOf, whenTiles } from '../../shared/tile-serve.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 47], zoom: ctx.preview ? 2.4 : 2.4 }),
  });
  await stage.ready(scene);

  serve(stage, 'l7demo-zoomrange', (url) => pngTile(tileOf(url)));

  const layer = new RasterLayer().source('l7demo-zoomrange://tiles', {
    parser: { type: 'rasterTile', minZoom: 2, maxZoom: 4 },
  });
  scene.addLayer(layer);

  // The tileset reports the level of the tiles on screen once they have loaded.
  const out = stage.readout();
  whenTiles(stage, layer, (source) => {
    source.tileset.on('tiles-load-finished', () => {
      if (out) out.textContent = `map zoom ${scene.getZoom().toFixed(1)} -> tile level ${source.tileset.currentZoom} (minZoom 2, maxZoom 4)`;
    });
  });
  if (stage.bar) slider(stage.bar, 'map zoom', [0, 6, 0.2], 2.4, (z) => scene.setZoom(z));
  else cycle(stage, scene, [2.4, 3.6, 5, 1.6], 1700, (z) => scene.setZoom(z));

  return () => stage.dispose();
};

export default mount;
