// TileLayer extent: [minX, minY, maxX, maxY] of the data; tiles outside are never loaded
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer, PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { tileCanvas } from '../../shared/geo-layers-art.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Extent = [number, number, number, number];
const EXTENTS: Record<string, Extent | null> = {
  'none (whole world)': null,
  'western Europe': [-10, 36, 15, 56],
  'Iberia': [-10, 35.5, 4, 44],
  'Scandinavia': [4, 55, 32, 71],
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 5, latitude: 48, zoom: ctx.preview ? 1.8 : 2.6 };

  const layers = (extent: Extent | null): (PolygonLayer<Extent> | TileLayer<ImageBitmap> | ReturnType<typeof landLayer>)[] => [
    landLayer(),
    new TileLayer<ImageBitmap>({
      id: 'tiles',
      getTileData: (tile) => createImageBitmap(tileCanvas(tile.index.x, tile.index.y, tile.index.z)),
      // minZoom 3 alone would hide everything at lower zooms; an extent keeps tiles of the box.
      tileSize: ctx.preview ? 64 : 256,
      minZoom: 3,
      maxZoom: 8,
      extent: extent ?? undefined,
      renderSubLayers: (props) => {
        const [[west = 0, south = 0], [east = 0, north = 0]] = props.tile.boundingBox;
        return new BitmapLayer({ ...props, data: undefined, image: props.data, bounds: [west, south, east, north] });
      },
    }),
    new PolygonLayer<Extent>({
      id: 'extent',
      data: extent ? [extent] : [],
      getPolygon: (d) => [[d[0], d[1]], [d[2], d[1]], [d[2], d[3]], [d[0], d[3]]],
      filled: false,
      stroked: true,
      getLineColor: [255, 190, 70],
      lineWidthMinPixels: 2,
    }),
  ];
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers(EXTENTS['western Europe']!) });

  let timer = 0;
  if (ctx.preview) {
    const keys = Object.keys(EXTENTS);
    let i = 1;
    timer = window.setInterval(() => deck.setProps({ layers: layers(EXTENTS[keys[++i % keys.length]!]!) }), 2200);
  } else {
    select(controlBar(el), 'extent', Object.keys(EXTENTS), (v) => deck.setProps({ layers: layers(EXTENTS[v]!) }), 'western Europe');
  }
  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: { ...view, longitude: 5 + Math.sin(t * 0.4) * 8 } })) : () => {};
  return () => {
    clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
