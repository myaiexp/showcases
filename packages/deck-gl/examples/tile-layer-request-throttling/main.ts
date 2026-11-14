// TileLayer maxRequests and debounceTime: how many getTileData calls run, and when they start
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout, slider } from '../../shared/controls.ts';
import { delay, tileCanvas } from '../../shared/geo-layers-art.ts';
import { animate, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 30, zoom: ctx.preview ? 1.6 : 3 };
  const info = ctx.preview ? null : readout(el, '');

  let maxRequests = 3;
  let debounceTime = 0;
  const stats = { started: 0, running: 0, peak: 0, aborted: 0 };
  const show = (): void => {
    if (info) info.textContent = `getTileData started ${stats.started}   running now ${stats.running}   peak at once ${stats.peak}   aborted ${stats.aborted}`;
  };
  const tiles = (): TileLayer<ImageBitmap> =>
    new TileLayer<ImageBitmap>({
      id: 'tiles',
      getTileData: async (tile) => {
        stats.started++;
        stats.running++;
        stats.peak = Math.max(stats.peak, stats.running);
        show();
        try {
          await delay(900, tile.signal);
          return await createImageBitmap(tileCanvas(tile.index.x, tile.index.y, tile.index.z));
        } catch (error) {
          // The layer aborts the signal of queued tiles that left the view.
          if (tile.signal?.aborted) stats.aborted++;
          throw error;
        } finally {
          stats.running--;
          show();
        }
      },
      tileSize: ctx.preview ? 64 : 256,
      minZoom: 0,
      maxZoom: 8,
      // At most this many getTileData calls at once; the rest wait in a queue ...
      maxRequests,
      // ... and nothing starts until the view has been still this many milliseconds.
      debounceTime,
      onTileError: () => {},
      updateTriggers: { getTileData: [maxRequests, debounceTime] },
      renderSubLayers: (props) => {
        const [[west = 0, south = 0], [east = 0, north = 0]] = props.tile.boundingBox;
        return new BitmapLayer({ ...props, data: undefined, image: props.data, bounds: [west, south, east, north] });
      },
    });
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [tiles()] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: 10 + Math.sin(t * 0.5) * 50 } }));
  } else {
    const bar = controlBar(el);
    const refresh = (): void => deck.setProps({ layers: [tiles()] });
    slider(bar, 'maxRequests', 1, 12, 1, maxRequests, (v) => ((maxRequests = v), refresh()));
    slider(bar, 'debounceTime (ms)', 0, 1500, 100, debounceTime, (v) => ((debounceTime = v), refresh()));
    button(bar, 'Reset counts', () => {
      Object.assign(stats, { started: 0, peak: stats.running, aborted: 0 });
      show();
    });
    show();
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
