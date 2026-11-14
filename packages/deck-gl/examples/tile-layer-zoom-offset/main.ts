// TileLayer zoomOffset: fetch at a higher or lower zoom level than the view needs
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { tileCanvas } from '../../shared/geo-layers-art.ts';
import { animate, createStage } from '../../shared/stage.ts';

const OFFSETS = ['-1', '0', '1', '2'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 30, zoom: ctx.preview ? 1.4 : 2.4 };
  const info = ctx.preview ? null : readout(el, '');

  const tiles = (zoomOffset: number): TileLayer<ImageBitmap> =>
    new TileLayer<ImageBitmap>({
      id: `tiles-${zoomOffset}`,
      getTileData: (tile) => createImageBitmap(tileCanvas(tile.index.x, tile.index.y, tile.index.z)),
      tileSize: ctx.preview ? 64 : 256,
      minZoom: 0,
      maxZoom: 10,
      // An integer added to the zoom level used to pick tiles.
      zoomOffset,
      onViewportLoad: (loaded) => {
        if (info) info.textContent = `zoomOffset ${zoomOffset}: ${loaded.length} tiles at zoom level ${loaded[0]?.index.z ?? '-'}`;
      },
      renderSubLayers: (props) => {
        const [[west = 0, south = 0], [east = 0, north = 0]] = props.tile.boundingBox;
        return new BitmapLayer({ ...props, data: undefined, image: props.data, bounds: [west, south, east, north] });
      },
    });
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [tiles(0)] });

  let timer = 0;
  let stop: () => void = () => {};
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => deck.setProps({ layers: [tiles([-1, 0, 1][++i % 3]!)] }), 2200);
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: 10 + t * 4 } }));
  } else {
    select(controlBar(el), 'zoomOffset', OFFSETS, (v) => deck.setProps({ layers: [tiles(Number(v))] }), '0');
  }
  return () => {
    clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
