// TileLayer maxCacheSize: cached tiles survive panning; a small cache reloads them
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { tileCanvas } from '../../shared/geo-layers-art.ts';
import { animate, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 0, latitude: 30, zoom: ctx.preview ? 1.4 : 2.4 };
  const info = ctx.preview ? null : readout(el, '');

  let maxCacheSize = 6;
  const stats = { requested: 0, loaded: 0, unloaded: 0 };
  const show = (): void => {
    if (info) info.textContent = `getTileData calls ${stats.requested}   loaded ${stats.loaded}   dropped from cache ${stats.unloaded}\nPan away and back: with a small cache the same tiles are requested again.`;
  };
  const tiles = (): TileLayer<ImageBitmap> =>
    new TileLayer<ImageBitmap>({
      id: 'tiles',
      getTileData: (tile) => {
        stats.requested++;
        return createImageBitmap(tileCanvas(tile.index.x, tile.index.y, tile.index.z));
      },
      tileSize: ctx.preview ? 64 : 256,
      minZoom: 0,
      maxZoom: 8,
      // Tiles kept in memory, visible or not. Left unset it is 5 times the tiles in view.
      maxCacheSize,
      onTileLoad: () => (stats.loaded++, show()),
      onTileUnload: () => (stats.unloaded++, show()),
      renderSubLayers: (props) => {
        const [[west = 0, south = 0], [east = 0, north = 0]] = props.tile.boundingBox;
        return new BitmapLayer({ ...props, data: undefined, image: props.data, bounds: [west, south, east, north] });
      },
    });
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [tiles()] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: Math.sin(t * 0.5) * 70 } }));
  } else {
    slider(controlBar(el), 'maxCacheSize', 1, 60, 1, maxCacheSize, (v) => ((maxCacheSize = v), deck.setProps({ layers: [tiles()] })));
    show();
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
