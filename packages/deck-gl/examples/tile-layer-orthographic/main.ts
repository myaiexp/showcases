// TileLayer in an OrthographicView: tile x, y count from origin in tileSize steps
import { Deck, OrthographicView } from '@deck.gl/core';
import type { OrthographicViewState, PickingInfo } from '@deck.gl/core';
import { TileLayer } from '@deck.gl/geo-layers';
import type { TileLayerPickingInfo } from '@deck.gl/geo-layers';
import { BitmapLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { tileCanvas } from '../../shared/geo-layers-art.ts';
import { animate, createStage } from '../../shared/stage.ts';

const SIZE = 1024; // a 1024 x 1024 plane

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#10151d' });
  const view: OrthographicViewState = { target: [SIZE / 2, SIZE / 2, 0], zoom: ctx.preview ? -0.9 : -0.2 };

  const tiles = new TileLayer<ImageBitmap>({
    id: 'tiles',
    getTileData: (tile) => createImageBitmap(tileCanvas(tile.index.x, tile.index.y, tile.index.z)),
    // In a non-geospatial view tileSize is the true pixel size of a tile.
    tileSize: 256,
    // The data covers [minX, minY, maxX, maxY] of the plane; deeper levels split it further.
    extent: [0, 0, SIZE, SIZE],
    minZoom: 0,
    maxZoom: 4,
    renderSubLayers: (props) => {
      const [[left = 0, top = 0], [right = 0, bottom = 0]] = props.tile.boundingBox;
      return new BitmapLayer({ ...props, data: undefined, image: props.data, bounds: [left, bottom, right, top] });
    },
    pickable: !ctx.preview,
    autoHighlight: true,
  });

  const deck = new Deck({
    device: stage.device,
    views: new OrthographicView({ id: 'plane', controller: !ctx.preview }),
    initialViewState: view,
    layers: [tiles],
    getTooltip: (info: PickingInfo) => {
      const { tile } = info as TileLayerPickingInfo;
      return tile ? `x ${tile.index.x}, y ${tile.index.y}, z ${tile.index.z}` : null;
    },
  });

  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: { ...view, zoom: -0.9 + (1 + Math.sin(t * 0.6)) * 0.8 } })) : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
