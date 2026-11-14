// TileLayer callbacks: onTileLoad, onTileError, onTileUnload, onViewportLoad
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, button, readout } from '../../shared/controls.ts';
import { delay, tileCanvas } from '../../shared/geo-layers-art.ts';
import { animate, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 30, zoom: ctx.preview ? 1.4 : 2.4 };
  const info = ctx.preview ? null : readout(el, '');
  info?.style.setProperty('text-align', 'left');

  const counts = { loaded: 0, failed: 0, unloaded: 0, viewport: 0 };
  const log: string[] = [];
  const note = (line: string): void => {
    log.unshift(line);
    log.length = Math.min(log.length, 6);
    if (info) info.textContent = `loaded ${counts.loaded}  failed ${counts.failed}  unloaded ${counts.unloaded}  viewport complete ${counts.viewport}x\n${log.join('\n')}`;
  };

  const tiles = new TileLayer<ImageBitmap>({
    id: 'tiles',
    getTileData: async (tile) => {
      await delay(300 + ((tile.index.x * 7 + tile.index.y * 3) % 5) * 250, tile.signal);
      // Every seventh tile fails, to show onTileError.
      if ((tile.index.x + tile.index.y) % 7 === 3) throw new Error(`tile ${tile.id} is not available`);
      return createImageBitmap(tileCanvas(tile.index.x, tile.index.y, tile.index.z));
    },
    tileSize: ctx.preview ? 64 : 256,
    minZoom: 0,
    maxZoom: 8,
    maxCacheSize: 12,
    onTileLoad: (tile) => (counts.loaded++, note(`onTileLoad    ${tile.id}`)),
    onTileError: (error) => (counts.failed++, note(`onTileError   ${error.message}`)),
    onTileUnload: (tile) => (counts.unloaded++, note(`onTileUnload  ${tile.id}`)),
    onViewportLoad: (loaded) => (counts.viewport++, note(`onViewportLoad ${loaded.length} tiles`)),
    renderSubLayers: (props) => {
      const [[west = 0, south = 0], [east = 0, north = 0]] = props.tile.boundingBox;
      return new BitmapLayer({ ...props, data: undefined, image: props.data, bounds: [west, south, east, north] });
    },
  });
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [tiles] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: 10 + Math.sin(t * 0.4) * 60 } }));
  } else {
    button(controlBar(el), 'Jump to Asia', () => deck.setProps({ initialViewState: { ...view, longitude: 100, transitionDuration: 0 } }));
    note('pan or zoom the map');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
