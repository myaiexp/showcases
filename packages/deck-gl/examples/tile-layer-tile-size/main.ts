// TileLayer tileSize: smaller tiles, higher zoom level, more tiles to fill the screen
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { tileCanvas } from '../../shared/geo-layers-art.ts';
import { animate, createStage } from '../../shared/stage.ts';

const SIZES = ['128', '256', '512', '1024'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 30, zoom: ctx.preview ? 1.6 : 2.4 };
  const info = ctx.preview ? null : readout(el, '');

  const tiles = (tileSize: number): TileLayer<ImageBitmap> =>
    new TileLayer<ImageBitmap>({
      // A new id per size: the tile cache of the old size is dropped.
      id: `tiles-${tileSize}`,
      getTileData: (tile) => createImageBitmap(tileCanvas(tile.index.x, tile.index.y, tile.index.z)),
      tileSize,
      minZoom: 0,
      maxZoom: 10,
      renderSubLayers: (props) => {
        const [[west = 0, south = 0], [east = 0, north = 0]] = props.tile.boundingBox;
        return new BitmapLayer({ ...props, data: undefined, image: props.data, bounds: [west, south, east, north] });
      },
      onViewportLoad: (loaded) => {
        if (info) info.textContent = `tileSize ${tileSize}: ${loaded.length} tiles cover the view, zoom level ${loaded[0]?.index.z ?? '-'}`;
      },
    });
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [tiles(ctx.preview ? 48 : 512)] });

  let timer = 0;
  let stop: () => void = () => {};
  if (ctx.preview) {
    let i = 0;
    const sizes = [48, 96, 192];
    timer = window.setInterval(() => deck.setProps({ layers: [tiles(sizes[++i % 3]!)] }), 2200);
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: ((10 + t * 5 + 180) % 360) - 180 } }));
  } else {
    select(controlBar(el), 'tileSize', SIZES, (v) => deck.setProps({ layers: [tiles(Number(v))] }), '512');
  }
  return () => {
    clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
