// TileLayer: getTileData makes each tile, renderSubLayers shows it, picking index
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { TileLayer } from '@deck.gl/geo-layers';
import type { TileLayerPickingInfo } from '@deck.gl/geo-layers';
import { BitmapLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { tileCanvas } from '../../shared/geo-layers-art.ts';
import { animate, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 30, zoom: ctx.preview ? 1.4 : 2.4 };

  const tiles = new TileLayer<ImageBitmap>({
    id: 'tiles',
    // No url template: getTileData makes the content, so nothing touches the network.
    getTileData: (tile) => createImageBitmap(tileCanvas(tile.index.x, tile.index.y, tile.index.z)),
    tileSize: ctx.preview ? 64 : 256,
    minZoom: 0,
    maxZoom: 8,
    renderSubLayers: (props) => {
      const [[west = 0, south = 0], [east = 0, north = 0]] = props.tile.boundingBox;
      return new BitmapLayer({ ...props, data: undefined, image: props.data, bounds: [west, south, east, north] });
    },
    pickable: !ctx.preview,
    autoHighlight: true,
    highlightColor: [255, 255, 255, 60],
  });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [tiles],
    // The picking info of a TileLayer carries the tile that was hit.
    getTooltip: (info: PickingInfo) => {
      const { tile } = info as TileLayerPickingInfo;
      return tile ? `x ${tile.index.x}, y ${tile.index.y}, z ${tile.index.z}` : null;
    },
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...view, longitude: ((10 + t * 8 + 180) % 360) - 180, zoom: 1.2 + (1 + Math.sin(t * 0.5)) * 0.6 } }))
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
